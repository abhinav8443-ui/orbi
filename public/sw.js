// Orbi Music Player - 100% Offline-First PWA Service Worker
// Supports App Shell caching, persistent offline media vault, and offline HTTP 206 audio byte-range requests.

const APP_SHELL_CACHE = 'orbi-app-shell-v4';
const MEDIA_CACHE = 'orbi-offline-media-v1';

// --- INSTALL: Pre-cache App Shell adapting to any subpath or domain ---
self.addEventListener('install', (event) => {
  self.skipWaiting();
  const scopeUrl = self.registration.scope;
  const staticFiles = [
    scopeUrl,
    scopeUrl + 'index.html',
    scopeUrl + 'manifest.json',
  ];
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => {
      return cache.addAll(staticFiles).catch((err) => {
        console.warn('App Shell pre-cache warning:', err);
      });
    })
  );
});

// --- ACTIVATE: Clean up stale caches ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== APP_SHELL_CACHE && key !== MEDIA_CACHE) {
            console.log('Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Helper: Handle HTTP 206 Range requests from Cache Storage when offline
async function handleAudioRequest(request) {
  const mediaCache = await caches.open(MEDIA_CACHE);
  const cleanUrl = request.url.split('?')[0];

  // Try matching by exact clean URL in MEDIA_CACHE, then APP_SHELL_CACHE
  let cachedResponse = await mediaCache.match(cleanUrl) || await mediaCache.match(request);
  if (!cachedResponse) {
    cachedResponse = await caches.match(cleanUrl) || await caches.match(request);
  }

  // Suffix matching fallback (e.g. filename matching across origins/subpaths)
  if (!cachedResponse) {
    const filename = cleanUrl.split('/').pop();
    const keys = await mediaCache.keys();
    const matchedKey = keys.find((k) => k.url.endsWith('/' + filename));
    if (matchedKey) {
      cachedResponse = await mediaCache.match(matchedKey);
    }
  }

  const rangeHeader = request.headers.get('range');

  // If found in offline cache
  if (cachedResponse) {
    if (!rangeHeader) {
      return cachedResponse;
    }

    try {
      const arrayBuffer = await cachedResponse.arrayBuffer();
      const total = arrayBuffer.byteLength;
      const parts = rangeHeader.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10) || 0;
      const end = parts[1] ? parseInt(parts[1], 10) : total - 1;

      if (start >= total || end >= total) {
        return new Response('', {
          status: 416,
          statusText: 'Range Not Satisfiable',
          headers: {
            'Content-Range': `bytes */${total}`,
          },
        });
      }

      const slicedBuffer = arrayBuffer.slice(start, end + 1);

      return new Response(slicedBuffer, {
        status: 206,
        statusText: 'Partial Content',
        headers: {
          'Content-Type': cachedResponse.headers.get('Content-Type') || 'audio/mp4',
          'Content-Range': `bytes ${start}-${end}/${total}`,
          'Content-Length': slicedBuffer.byteLength.toString(),
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } catch (err) {
      console.warn('Error slicing cached audio buffer:', err);
      return cachedResponse;
    }
  }

  // Not in offline cache: Try network
  try {
    const networkResponse = await fetch(request);

    // If a full (non-range) response was returned and is valid, cache it for next time
    if (networkResponse.status === 200) {
      mediaCache.put(cleanUrl, networkResponse.clone()).catch(() => {});
    }

    return networkResponse;
  } catch (netErr) {
    // Completely offline and track was not cached: Try fallback audio if available
    const fallbackResponse = await mediaCache.match('/audio/sm-luka-chuppi.m4a') || 
                             await mediaCache.match('/audio/yeat-money-so-big.m4a');
    if (fallbackResponse) {
      return fallbackResponse;
    }
    return new Response('Audio not cached for offline playback', {
      status: 503,
      statusText: 'Offline Audio Unavailable',
    });
  }
}

// Helper: Handle Cover Art requests (Cache-First)
async function handleCoverRequest(request) {
  const mediaCache = await caches.open(MEDIA_CACHE);
  const cleanUrl = request.url.split('?')[0];

  let cached = await mediaCache.match(cleanUrl) || await mediaCache.match(request);
  if (!cached) {
    const filename = cleanUrl.split('/').pop();
    const keys = await mediaCache.keys();
    const matchedKey = keys.find((k) => k.url.endsWith('/' + filename));
    if (matchedKey) {
      cached = await mediaCache.match(matchedKey);
    }
  }
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      mediaCache.put(cleanUrl, response.clone()).catch(() => {});
    }
    return response;
  } catch (err) {
    // Offline fallback cover
    const fallback = await mediaCache.match('/covers/sm-nayaab.jpg') || 
                     await mediaCache.match('/covers/yeat-money-so-big.jpg');
    return fallback || new Response('', { status: 404 });
  }
}

// --- FETCH LISTENER ---
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Audio Streaming requests (matches /audio/* anywhere in pathname)
  if (url.pathname.includes('/audio/')) {
    event.respondWith(handleAudioRequest(event.request));
    return;
  }

  // 2. Cover art images (matches /covers/* anywhere in pathname)
  if (url.pathname.includes('/covers/')) {
    event.respondWith(handleCoverRequest(event.request));
    return;
  }

  // 3. Skip APK download from service worker cache
  if (url.pathname.endsWith('.apk')) {
    return;
  }

  // 4. API endpoints (/api/*) -> Network only
  if (url.pathname.includes('/api/')) {
    return;
  }

  // 5. App Shell & Static Assets (HTML, JS bundles, CSS, Icons)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached and update in background if online
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(APP_SHELL_CACHE).then((cache) => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {});

        return cachedResponse;
      }

      // Not in cache: fetch from network and cache
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const toCache = networkResponse.clone();
        caches.open(APP_SHELL_CACHE).then((cache) => {
          cache.put(event.request, toCache);
        });

        return networkResponse;
      }).catch(() => {
        // Offline navigation fallback: serve index.html for SPA
        if (event.request.mode === 'navigate') {
          return caches.match(self.registration.scope + 'index.html') || 
                 caches.match(self.registration.scope) ||
                 caches.match('/index.html') || 
                 caches.match('/');
        }
      });
    })
  );
});

// --- MESSAGE LISTENER: Bulk Caching & Storage Management ---
self.addEventListener('message', async (event) => {
  if (!event.data) return;

  // Bulk cache audio files & covers requested by the app
  if (event.data.type === 'CACHE_TRACKS') {
    const urls = event.data.urls || [];
    const mediaCache = await caches.open(MEDIA_CACHE);

    let cachedCount = 0;
    for (const item of urls) {
      try {
        const cleanAudio = item.audioUrl.split('?')[0];
        const hasAudio = await mediaCache.match(cleanAudio);
        if (!hasAudio) {
          const res = await fetch(cleanAudio);
          if (res.status === 200) {
            await mediaCache.put(cleanAudio, res);
            cachedCount++;
          }
        }

        if (item.coverUrl) {
          const cleanCover = item.coverUrl.split('?')[0];
          const hasCover = await mediaCache.match(cleanCover);
          if (!hasCover) {
            const cRes = await fetch(cleanCover);
            if (cRes.status === 200) {
              await mediaCache.put(cleanCover, cRes);
            }
          }
        }

        // Notify client of individual progress
        if (event.source) {
          event.source.postMessage({
            type: 'CACHE_PROGRESS',
            trackId: item.id,
            cachedCount,
            total: urls.length,
          });
        }
      } catch (e) {
        console.warn('Failed to cache track offline:', item.id, e);
      }
    }

    if (event.source) {
      event.source.postMessage({
        type: 'CACHE_COMPLETE',
        cachedCount,
        total: urls.length,
      });
    }
  }

  // Clear offline cache
  if (event.data.type === 'CLEAR_OFFLINE_CACHE') {
    await caches.delete(MEDIA_CACHE);
    if (event.source) {
      event.source.postMessage({ type: 'OFFLINE_CACHE_CLEARED' });
    }
  }
});
