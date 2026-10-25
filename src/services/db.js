// IndexedDB Service for persistent audio files and metadata

const DB_NAME = 'OrbiMusicPlayerDB';
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Tracks store (can hold metadata + audio Blobs)
      if (!db.objectStoreNames.contains('tracks')) {
        const trackStore = db.createObjectStore('tracks', { keyPath: 'id' });
        trackStore.createIndex('title', 'title', { unique: false });
        trackStore.createIndex('artist', 'artist', { unique: false });
        trackStore.createIndex('album', 'album', { unique: false });
        trackStore.createIndex('dateAdded', 'dateAdded', { unique: false });
      }

      // Playlists store
      if (!db.objectStoreNames.contains('playlists')) {
        db.createObjectStore('playlists', { keyPath: 'id' });
      }

      // Key-value settings store
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const dbService = {
  // --- TRACKS ---
  async getAllTracks() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('tracks', 'readonly');
      const store = tx.objectStore('tracks');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  },

  async getTrack(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('tracks', 'readonly');
      const store = tx.objectStore('tracks');
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  async saveTrack(track) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('tracks', 'readwrite');
      const store = tx.objectStore('tracks');
      const req = store.put(track);
      req.onsuccess = () => resolve(track);
      req.onerror = () => reject(req.error);
    });
  },

  async deleteTrack(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(['tracks', 'playlists'], 'readwrite');
      const trackStore = tx.objectStore('tracks');
      const playlistStore = tx.objectStore('playlists');
      
      trackStore.delete(id);

      // Also remove track from all playlists
      const playlistReq = playlistStore.getAll();
      playlistReq.onsuccess = () => {
        const playlists = playlistReq.result || [];
        playlists.forEach((pl) => {
          if (pl.trackIds && pl.trackIds.includes(id)) {
            pl.trackIds = pl.trackIds.filter((tId) => tId !== id);
            playlistStore.put(pl);
          }
        });
      };

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  },

  // --- PLAYLISTS ---
  async getAllPlaylists() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('playlists', 'readonly');
      const store = tx.objectStore('playlists');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  },

  async savePlaylist(playlist) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('playlists', 'readwrite');
      const store = tx.objectStore('playlists');
      const req = store.put(playlist);
      req.onsuccess = () => resolve(playlist);
      req.onerror = () => reject(req.error);
    });
  },

  async deletePlaylist(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('playlists', 'readwrite');
      const store = tx.objectStore('playlists');
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },

  // --- SETTINGS & PREFERENCES ---
  async getSetting(key, defaultValue = null) {
    try {
      const db = await openDB();
      return new Promise((resolve) => {
        const tx = db.transaction('settings', 'readonly');
        const store = tx.objectStore('settings');
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result ? req.result.value : defaultValue);
        req.onerror = () => resolve(defaultValue);
      });
    } catch {
      return defaultValue;
    }
  },

  async setSetting(key, value) {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('settings', 'readwrite');
        const store = tx.objectStore('settings');
        const req = store.put({ key, value });
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      console.error('Failed to set setting:', e);
    }
  },

  // Export full library as JSON (metadata & playlists)
  async exportLibraryData() {
    const tracks = await this.getAllTracks();
    const playlists = await this.getAllPlaylists();
    
    // Omit heavy audio Blobs from JSON export, keep metadata and links
    const serializableTracks = tracks.map(t => {
      const { audioBlob, ...meta } = t;
      return meta;
    });

    return JSON.stringify({
      version: 1,
      exportedAt: new Date().toISOString(),
      tracks: serializableTracks,
      playlists: playlists,
    }, null, 2);
  },

  // Clear all data
  async resetAll() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(['tracks', 'playlists', 'settings'], 'readwrite');
      tx.objectStore('tracks').clear();
      tx.objectStore('playlists').clear();
      tx.objectStore('settings').clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }
};
