// IndexedDB wrapper for Orbi Music Player
// Persists uploaded audio files, custom metadata edits, and playlists

const DB_NAME = 'orbi-music-db';
const DB_VERSION = 1;

let dbInstance = null;

export function initDB() {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // 1. Custom / Edited Tracks Store
      if (!db.objectStoreNames.contains('tracks')) {
        db.createObjectStore('tracks', { keyPath: 'id' });
      }

      // 2. Audio Binary Blob Store
      if (!db.objectStoreNames.contains('audioFiles')) {
        db.createObjectStore('audioFiles', { keyPath: 'id' });
      }

      // 3. User Playlists Store
      if (!db.objectStoreNames.contains('playlists')) {
        db.createObjectStore('playlists', { keyPath: 'id' });
      }

      // 4. App Preferences (Accent Color, Volume, EQ settings)
      if (!db.objectStoreNames.contains('preferences')) {
        db.createObjectStore('preferences', { keyPath: 'key' });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      console.error('IndexedDB open error:', event.target.error);
      reject(event.target.error);
    };
  });
}

// --- TRACKS ---

export async function getAllCustomTracks() {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['tracks'], 'readonly');
    const store = tx.objectStore('tracks');
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function saveCustomTrack(track, audioBlob = null) {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const stores = audioBlob ? ['tracks', 'audioFiles'] : ['tracks'];
    const tx = db.transaction(stores, 'readwrite');

    const trackStore = tx.objectStore('tracks');
    trackStore.put(track);

    if (audioBlob) {
      const audioStore = tx.objectStore('audioFiles');
      audioStore.put({
        id: track.id,
        blob: audioBlob,
        name: track.title,
        updatedAt: Date.now(),
      });
    }

    tx.oncomplete = () => resolve(track);
    tx.onerror = () => reject(tx.error);
  });
}

export async function deleteCustomTrack(trackId) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['tracks', 'audioFiles'], 'readwrite');
    tx.objectStore('tracks').delete(trackId);
    tx.objectStore('audioFiles').delete(trackId);

    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

// --- AUDIO BLOB RETRIEVAL ---

export async function getTrackAudioBlob(trackId) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['audioFiles'], 'readonly');
    const store = tx.objectStore('audioFiles');
    const request = store.get(trackId);

    request.onsuccess = () => {
      if (request.result && request.result.blob) {
        resolve(request.result.blob);
      } else {
        resolve(null);
      }
    };
    request.onerror = () => reject(request.error);
  });
}

// --- PLAYLISTS ---

export async function getAllCustomPlaylists() {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['playlists'], 'readonly');
    const store = tx.objectStore('playlists');
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function saveCustomPlaylist(playlist) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['playlists'], 'readwrite');
    const store = tx.objectStore('playlists');
    store.put(playlist);

    tx.oncomplete = () => resolve(playlist);
    tx.onerror = () => reject(tx.error);
  });
}

export async function deleteCustomPlaylist(playlistId) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['playlists'], 'readwrite');
    const store = tx.objectStore('playlists');
    store.delete(playlistId);

    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

// --- PREFERENCES ---

export async function getPreference(key, defaultValue = null) {
  try {
    const db = await initDB();
    return new Promise((resolve) => {
      const tx = db.transaction(['preferences'], 'readonly');
      const store = tx.objectStore('preferences');
      const request = store.get(key);

      request.onsuccess = () => {
        if (request.result && request.result.value !== undefined) {
          resolve(request.result.value);
        } else {
          resolve(defaultValue);
        }
      };
      request.onerror = () => resolve(defaultValue);
    });
  } catch {
    return defaultValue;
  }
}

export async function setPreference(key, value) {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(['preferences'], 'readwrite');
      const store = tx.objectStore('preferences');
      store.put({ key, value });

      tx.oncomplete = () => resolve(value);
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error('Failed to set preference:', err);
  }
}

// --- RESET & EXPORT ---

export async function resetAllData() {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['tracks', 'audioFiles', 'playlists', 'preferences'], 'readwrite');
    tx.objectStore('tracks').clear();
    tx.objectStore('audioFiles').clear();
    tx.objectStore('playlists').clear();
    tx.objectStore('preferences').clear();

    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

// --- OFFLINE MEDIA VAULT & CACHING HELPERS ---

export async function saveTrackAudioBlob(trackId, blob) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['audioFiles'], 'readwrite');
    const store = tx.objectStore('audioFiles');
    store.put({
      id: trackId,
      blob,
      updatedAt: Date.now()
    });
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

export async function isTrackCachedOffline(trackId, audioUrl) {
  // Check IndexedDB
  try {
    const blob = await getTrackAudioBlob(trackId);
    if (blob) return true;
  } catch (e) {}

  // Check Cache Storage
  try {
    if ('caches' in window) {
      const cache = await caches.open('orbi-offline-media-v1');
      const cleanUrl = (audioUrl || `/audio/${trackId}.m4a`).split('?')[0];
      const match = await cache.match(cleanUrl);
      if (match) return true;
    }
  } catch (e) {}

  return false;
}

export async function getOfflineCachedCount() {
  let count = 0;
  try {
    if ('caches' in window) {
      const cache = await caches.open('orbi-offline-media-v1');
      const keys = await cache.keys();
      const audioKeys = keys.filter((req) => req.url.includes('/audio/'));
      count = audioKeys.length;
    }
  } catch (e) {}
  return count;
}

export async function cacheAllTracksOffline(tracks, onProgress) {
  const total = tracks.length;
  let cached = 0;

  let mediaCache = null;
  if ('caches' in window) {
    mediaCache = await caches.open('orbi-offline-media-v1');
  }

  for (let i = 0; i < total; i++) {
    const track = tracks[i];
    try {
      if (mediaCache) {
        // Cache audio
        const cleanAudio = track.audioUrl.split('?')[0];
        const hasAudio = await mediaCache.match(cleanAudio);
        if (!hasAudio) {
          const res = await fetch(cleanAudio);
          if (res.status === 200) {
            await mediaCache.put(cleanAudio, res);
          }
        }

        // Cache cover art
        if (track.coverUrl) {
          const cleanCover = track.coverUrl.split('?')[0];
          const hasCover = await mediaCache.match(cleanCover);
          if (!hasCover) {
            const cRes = await fetch(cleanCover);
            if (cRes.status === 200) {
              await mediaCache.put(cleanCover, cRes);
            }
          }
        }
      }
      cached++;
    } catch (err) {
      console.warn('Could not cache track offline:', track.title, err);
    }

    if (onProgress) {
      onProgress({
        current: i + 1,
        total,
        trackTitle: track.title,
        percent: Math.round(((i + 1) / total) * 100),
      });
    }
  }

  return cached;
}
