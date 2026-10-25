import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { dbService } from '../services/db';
import { audioEngine, EQ_PRESETS } from '../services/audioEngine';
import { parseAudioFile } from '../services/id3Parser';
import { DEFAULT_TRACKS, DEFAULT_PLAYLISTS } from '../data/defaultTracks';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  // Library State
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Playback State
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off' | 'all' | 'one'

  // Queue State
  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(-1);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  // Navigation & View State
  const [historyStack, setHistoryStack] = useState([{ type: 'home' }]);
  const [historyPointer, setHistoryPointer] = useState(0);
  const currentView = historyStack[historyPointer] || { type: 'home' };

  // Modals & Drawers
  const [showLyrics, setShowLyrics] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [showEqualizer, setShowEqualizer] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingTrack, setEditingTrack] = useState(null);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [accentColor, setAccentColor] = useState('#14b8a6');
  const [searchQuery, setSearchQuery] = useState('');

  // Initial Load from IndexedDB
  useEffect(() => {
    async function initData() {
      try {
        let storedTracks = await dbService.getAllTracks();
        let storedPlaylists = await dbService.getAllPlaylists();

        // Clean out any old unwanted dummy tracks and playlists
        if (storedTracks && storedTracks.length > 0) {
          for (const t of storedTracks) {
            if (t.id && t.id.startsWith('track-')) {
              await dbService.deleteTrack(t.id);
            }
          }
          storedTracks = storedTracks.filter(t => t.id && !t.id.startsWith('track-'));
        }

        if (storedPlaylists && storedPlaylists.length > 0) {
          const dummyPls = ['pl-lofi', 'pl-synth', 'pl-deep-focus', 'pl-acoustic'];
          for (const p of storedPlaylists) {
            if (dummyPls.includes(p.id)) {
              await dbService.deletePlaylist(p.id);
            }
          }
          storedPlaylists = storedPlaylists.filter(p => !dummyPls.includes(p.id));
        }

        // Save & ensure all DEFAULT_TRACKS are up to date with new coverArt
        const trackMap = new Map((storedTracks || []).map(t => [t.id, t]));
        for (const track of DEFAULT_TRACKS) {
          const existing = trackMap.get(track.id);
          if (!existing || existing.coverArt !== track.coverArt) {
            await dbService.saveTrack(track);
            trackMap.set(track.id, track);
          }
        }
        storedTracks = Array.from(trackMap.values());

        // Ensure DEFAULT_PLAYLISTS are up to date
        const plMap = new Map((storedPlaylists || []).map(p => [p.id, p]));
        for (const pl of DEFAULT_PLAYLISTS) {
          const existing = plMap.get(pl.id);
          if (!existing || existing.coverArt !== pl.coverArt) {
            await dbService.savePlaylist(pl);
            plMap.set(pl.id, pl);
          }
        }
        storedPlaylists = Array.from(plMap.values());

        setTracks(storedTracks);
        setPlaylists(storedPlaylists);

        // Load saved settings
        const savedVolume = await dbService.getSetting('volume', 0.8);
        const savedShuffle = await dbService.getSetting('shuffle', false);
        const savedRepeat = await dbService.getSetting('repeatMode', 'off');
        const savedAccent = await dbService.getSetting('accentColor', '#14b8a6');
        const savedEqPreset = await dbService.getSetting('eqPreset', 'Flat');

        setVolumeState(savedVolume);
        audioEngine.setVolume(savedVolume);
        setIsShuffle(savedShuffle);
        setRepeatMode(savedRepeat);
        setAccentColor(savedAccent);
        audioEngine.setEqPreset(savedEqPreset);

        // Set initial track (paused)
        if (storedTracks.length > 0) {
          setCurrentTrack(storedTracks[0]);
          setQueue(storedTracks);
          setQueueIndex(0);
          audioEngine.loadTrack(storedTracks[0], false);
        }

        setIsLoaded(true);
      } catch (err) {
        console.error('Initialization error:', err);
        setTracks(DEFAULT_TRACKS);
        setPlaylists(DEFAULT_PLAYLISTS);
        setIsLoaded(true);
      }
    }

    initData();
  }, []);

  // Sync Audio Element Events
  useEffect(() => {
    const audio = audioEngine.audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    const onEnded = () => {
      handleNextTrackAuto();
    };

    const onError = (e) => {
      console.warn('Audio playback error:', e);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [queue, queueIndex, repeatMode, isShuffle]);

  // MediaSession action handlers
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => togglePlay());
      navigator.mediaSession.setActionHandler('pause', () => togglePlay());
      navigator.mediaSession.setActionHandler('previoustrack', () => prevTrack());
      navigator.mediaSession.setActionHandler('nexttrack', () => nextTrack());
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined) seek(details.seekTime);
      });
    }
  }, [isPlaying, currentTrack, queue, queueIndex]);

  // Playback Control Functions
  const playTrack = useCallback((track, newQueue = null) => {
    if (!track) return;

    if (newQueue && Array.isArray(newQueue)) {
      setQueue(newQueue);
      const idx = newQueue.findIndex(t => t.id === track.id);
      setQueueIndex(idx !== -1 ? idx : 0);
    } else if (!queue.some(t => t.id === track.id)) {
      setQueue(prev => [...prev, track]);
      setQueueIndex(queue.length);
    } else {
      const idx = queue.findIndex(t => t.id === track.id);
      if (idx !== -1) setQueueIndex(idx);
    }

    setCurrentTrack(track);
    audioEngine.loadTrack(track, true);

    // Update recently played
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(t => t.id !== track.id);
      return [track, ...filtered].slice(0, 30);
    });

    // Increment plays count in DB
    const updatedTrack = { ...track, playsCount: (track.playsCount || 0) + 1 };
    dbService.saveTrack(updatedTrack);
    setTracks(prev => prev.map(t => t.id === track.id ? updatedTrack : t));
  }, [queue]);

  const togglePlay = useCallback(() => {
    if (!currentTrack) {
      if (tracks.length > 0) playTrack(tracks[0]);
      return;
    }

    if (isPlaying) {
      audioEngine.pause();
    } else {
      audioEngine.play();
    }
  }, [currentTrack, isPlaying, tracks, playTrack]);

  const handleNextTrackAuto = useCallback(() => {
    if (repeatMode === 'one') {
      audioEngine.seek(0);
      audioEngine.play();
      return;
    }
    nextTrack();
  }, [repeatMode]);

  const nextTrack = useCallback(() => {
    if (queue.length === 0) return;

    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      setQueueIndex(randomIndex);
      playTrack(queue[randomIndex]);
      return;
    }

    const nextIdx = queueIndex + 1;
    if (nextIdx < queue.length) {
      setQueueIndex(nextIdx);
      playTrack(queue[nextIdx]);
    } else if (repeatMode === 'all') {
      setQueueIndex(0);
      playTrack(queue[0]);
    } else {
      audioEngine.pause();
      setIsPlaying(false);
    }
  }, [queue, queueIndex, isShuffle, repeatMode, playTrack]);

  const prevTrack = useCallback(() => {
    if (currentTime > 3) {
      audioEngine.seek(0);
      return;
    }

    if (queue.length === 0) return;

    const prevIdx = queueIndex - 1;
    if (prevIdx >= 0) {
      setQueueIndex(prevIdx);
      playTrack(queue[prevIdx]);
    } else {
      audioEngine.seek(0);
    }
  }, [currentTime, queue, queueIndex, playTrack]);

  const seek = useCallback((seconds) => {
    audioEngine.seek(seconds);
    setCurrentTime(seconds);
  }, []);

  const setVolume = useCallback((val) => {
    setVolumeState(val);
    audioEngine.setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
      audioEngine.setMuted(false);
    }
    dbService.setSetting('volume', val);
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioEngine.setMuted(nextMuted);
  }, [isMuted]);

  const toggleShuffle = useCallback(() => {
    const nextVal = !isShuffle;
    setIsShuffle(nextVal);
    dbService.setSetting('shuffle', nextVal);
  }, [isShuffle]);

  const cycleRepeat = useCallback(() => {
    const modes = ['off', 'all', 'one'];
    const nextIdx = (modes.indexOf(repeatMode) + 1) % modes.length;
    const nextMode = modes[nextIdx];
    setRepeatMode(nextMode);
    dbService.setSetting('repeatMode', nextMode);
  }, [repeatMode]);

  // Favorites
  const toggleFavorite = useCallback(async (trackId) => {
    const track = tracks.find(t => t.id === trackId);
    if (!track) return;

    const updated = { ...track, isFavorite: !track.isFavorite };
    await dbService.saveTrack(updated);

    setTracks(prev => prev.map(t => t.id === trackId ? updated : t));
    if (currentTrack && currentTrack.id === trackId) {
      setCurrentTrack(updated);
    }
  }, [tracks, currentTrack]);

  // Track management (Upload & In-App Edit & Delete)
  const uploadFiles = useCallback(async (fileList) => {
    const newTracks = [];

    for (const file of fileList) {
      if (!file.type.startsWith('audio/') && !/\.(mp3|wav|ogg|flac|m4a|aac)$/i.test(file.name)) {
        continue;
      }

      try {
        const metadata = await parseAudioFile(file);
        const newTrack = {
          id: 'local-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
          title: metadata.title,
          artist: metadata.artist,
          album: metadata.album,
          duration: metadata.duration || 180,
          genre: 'Local Music',
          year: new Date().getFullYear(),
          dateAdded: new Date().toISOString(),
          isFavorite: false,
          playsCount: 0,
          isCustom: true,
          audioBlob: file,
          audioUrl: URL.createObjectURL(file),
          coverArt: metadata.coverArt || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
          lyrics: `[00:00.00] Enjoy your uploaded track: ${metadata.title}\n[00:10.00] You can edit the lyrics anytime in the song menu!`,
        };

        await dbService.saveTrack(newTrack);
        newTracks.push(newTrack);
      } catch (err) {
        console.error('Failed to parse uploaded audio:', file.name, err);
      }
    }

    if (newTracks.length > 0) {
      setTracks(prev => [...newTracks, ...prev]);
      // Play the first uploaded track
      playTrack(newTracks[0]);
    }
  }, [playTrack]);

  const updateTrack = useCallback(async (updatedTrack) => {
    await dbService.saveTrack(updatedTrack);
    setTracks(prev => prev.map(t => t.id === updatedTrack.id ? updatedTrack : t));
    if (currentTrack && currentTrack.id === updatedTrack.id) {
      setCurrentTrack(updatedTrack);
      audioEngine.updateMediaSession(updatedTrack);
    }
  }, [currentTrack]);

  const deleteTrack = useCallback(async (trackId) => {
    await dbService.deleteTrack(trackId);
    setTracks(prev => prev.filter(t => t.id !== trackId));
    setQueue(prev => prev.filter(t => t.id !== trackId));
    if (currentTrack && currentTrack.id === trackId) {
      nextTrack();
    }
  }, [currentTrack, nextTrack]);

  // Playlist management
  const createPlaylist = useCallback(async (name, description = '', coverArt = null) => {
    const newPlaylist = {
      id: 'pl-' + Date.now(),
      name: name || `My Playlist #${playlists.length + 1}`,
      description: description || 'Created by you',
      coverArt: coverArt || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
      trackIds: [],
      createdAt: new Date().toISOString(),
    };

    await dbService.savePlaylist(newPlaylist);
    setPlaylists(prev => [...prev, newPlaylist]);
    navigate({ type: 'playlist', id: newPlaylist.id });
    return newPlaylist;
  }, [playlists]);

  const updatePlaylist = useCallback(async (updatedPlaylist) => {
    await dbService.savePlaylist(updatedPlaylist);
    setPlaylists(prev => prev.map(p => p.id === updatedPlaylist.id ? updatedPlaylist : p));
  }, []);

  const deletePlaylist = useCallback(async (playlistId) => {
    await dbService.deletePlaylist(playlistId);
    setPlaylists(prev => prev.filter(p => p.id !== playlistId));
    if (currentView.type === 'playlist' && currentView.id === playlistId) {
      navigate({ type: 'home' });
    }
  }, [currentView]);

  const addTrackToPlaylist = useCallback(async (playlistId, trackId) => {
    const pl = playlists.find(p => p.id === playlistId);
    if (!pl) return;
    if (pl.trackIds.includes(trackId)) return;

    const updated = { ...pl, trackIds: [...pl.trackIds, trackId] };
    await updatePlaylist(updated);
  }, [playlists, updatePlaylist]);

  const removeTrackFromPlaylist = useCallback(async (playlistId, trackId) => {
    const pl = playlists.find(p => p.id === playlistId);
    if (!pl) return;

    const updated = { ...pl, trackIds: pl.trackIds.filter(id => id !== trackId) };
    await updatePlaylist(updated);
  }, [playlists, updatePlaylist]);

  // Navigation
  const navigate = useCallback((viewObj) => {
    setHistoryStack(prev => {
      const nextStack = prev.slice(0, historyPointer + 1);
      return [...nextStack, viewObj];
    });
    setHistoryPointer(prev => prev + 1);
  }, [historyPointer]);

  const goBack = useCallback(() => {
    if (historyPointer > 0) {
      setHistoryPointer(prev => prev - 1);
    }
  }, [historyPointer]);

  const goForward = useCallback(() => {
    if (historyPointer < historyStack.length - 1) {
      setHistoryPointer(prev => prev + 1);
    }
  }, [historyPointer, historyStack.length]);

  const changeAccentColor = useCallback((color) => {
    setAccentColor(color);
    dbService.setSetting('accentColor', color);
    document.documentElement.style.setProperty('--spotify-green', color);
  }, []);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight' && !e.ctrlKey) {
        e.preventDefault();
        seek(currentTime + 5);
      } else if (e.code === 'ArrowLeft' && !e.ctrlKey) {
        e.preventDefault();
        seek(currentTime - 5);
      } else if (e.code === 'ArrowRight' && e.ctrlKey) {
        e.preventDefault();
        nextTrack();
      } else if (e.code === 'ArrowLeft' && e.ctrlKey) {
        e.preventDefault();
        prevTrack();
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        setVolume(Math.min(1, volume + 0.05));
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        setVolume(Math.max(0, volume - 0.05));
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'l' || e.key === 'L') {
        setShowLyrics(prev => !prev);
      } else if (e.key === 'q' || e.key === 'Q') {
        setShowQueue(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, seek, currentTime, nextTrack, prevTrack, setVolume, volume, toggleMute]);

  const value = {
    tracks,
    playlists,
    isLoaded,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    queue,
    queueIndex,
    recentlyPlayed,
    currentView,
    canGoBack: historyPointer > 0,
    canGoForward: historyPointer < historyStack.length - 1,
    showLyrics,
    showQueue,
    showEqualizer,
    showSettings,
    editingTrack,
    editingPlaylist,
    accentColor,
    searchQuery,
    setSearchQuery,
    setShowLyrics,
    setShowQueue,
    setShowEqualizer,
    setShowSettings,
    setEditingTrack,
    setEditingPlaylist,
    playTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeat,
    toggleFavorite,
    uploadFiles,
    updateTrack,
    deleteTrack,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    navigate,
    goBack,
    goForward,
    changeAccentColor,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
