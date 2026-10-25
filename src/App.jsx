import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Repeat1, 
  Volume2, 
  Volume1, 
  VolumeX, 
  Heart, 
  Mic2, 
  ListMusic, 
  Sliders, 
  Search as SearchIcon, 
  Home, 
  Library, 
  Plus, 
  Upload, 
  Download, 
  Smartphone, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  MoreHorizontal, 
  Edit3, 
  Trash2, 
  X, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Music2, 
  Palette, 
  Clock, 
  Disc3,
  CheckCircle2,
  QrCode,
  Globe,
  Wifi
} from 'lucide-react';

import { INITIAL_TRACKS, INITIAL_PLAYLISTS, THEME_ACCENTS } from './data/initialLibrary';
import { 
  getAllCustomTracks, 
  saveCustomTrack, 
  deleteCustomTrack, 
  getTrackAudioBlob,
  getAllCustomPlaylists, 
  saveCustomPlaylist, 
  deleteCustomPlaylist,
  getPreference, 
  setPreference,
  cacheAllTracksOffline,
  getOfflineCachedCount,
  isTrackCachedOffline
} from './utils/db';

// Helper: Format seconds to M:SS
function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Helper: Parse Synced LRC Lyrics into [{ time: number, text: string }]
function parseLrc(lrcText) {
  if (!lrcText) return [];
  const lines = lrcText.split('\n');
  const result = [];
  const regex = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\](.*)/;

  for (const line of lines) {
    const match = regex.exec(line.trim());
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const milliseconds = match[3] ? parseInt(match[3].padEnd(3, '0').slice(0, 3), 10) : 0;
      const time = minutes * 60 + seconds + milliseconds / 1000;
      const text = match[4].trim();
      if (text) {
        result.push({ time, text });
      }
    }
  }

  return result.sort((a, b) => a.time - b.time);
}

// 5 Equalizer frequency center bands
const EQ_FREQUENCIES = [60, 250, 1000, 4000, 16000];
const EQ_PRESETS = {
  Flat: [0, 0, 0, 0, 0],
  'Bass Boost': [8, 5, 1, 0, 0],
  'Treble Boost': [0, 0, 1, 6, 9],
  Vocal: [-2, 0, 6, 4, 1],
  Electronic: [6, 4, 0, 4, 7],
  Rock: [5, 3, -1, 4, 6],
  Lofi: [3, 2, -3, -2, -5],
  'Hip-Hop': [7, 5, 0, 2, 4],
};

export default function App() {
  // --- LIBRARY & PLAYLIST STATE ---
  const [tracks, setTracks] = useState(INITIAL_TRACKS);
  const [playlists, setPlaylists] = useState(INITIAL_PLAYLISTS);
  const [likedSongIds, setLikedSongIds] = useState(() => new Set(['yeat-money-so-big', 'sm-luka-chuppi', 'nettspend-nothing-like-uuu']));

  // --- PLAYBACK STATE ---
  const [currentTrack, setCurrentTrack] = useState(INITIAL_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(INITIAL_TRACKS[0]?.duration || 160);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off' | 'all' | 'one'
  const [queue, setQueue] = useState(INITIAL_TRACKS);
  const [queueIndex, setQueueIndex] = useState(0);

  // --- NAVIGATION & VIEWS ---
  const [currentView, setCurrentView] = useState({ type: 'home' }); // 'home' | 'search' | 'library' | 'playlist' | 'liked' | 'artist'
  const [searchQuery, setSearchQuery] = useState('');
  const [accentColor, setAccentColor] = useState('#14b8a6');

  // --- MODALS & OVERLAYS ---
  const [showLyrics, setShowLyrics] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [showEqualizer, setShowEqualizer] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMobileNowPlaying, setShowMobileNowPlaying] = useState(false);
  const [trackToEdit, setTrackToEdit] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [isCachingOffline, setIsCachingOffline] = useState(false);
  const [cacheProgress, setCacheProgress] = useState(null);
  const [offlineCount, setOfflineCount] = useState(0);
  const [serverInfo, setServerInfo] = useState({
    localUrl: '',
    localhostUrl: 'http://localhost:5173',
    port: 5173
  });
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrType, setQrType] = useState('local'); // 'local'
  const [copiedType, setCopiedType] = useState(''); // 'local' | 'apk'

  // --- EQUALIZER STATE ---
  const [eqGains, setEqGains] = useState([0, 0, 0, 0, 0]);
  const [selectedEqPreset, setSelectedEqPreset] = useState('Flat');

  // --- REFS ---
  const audioElementRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const eqFiltersRef = useRef([]);
  const analyserRef = useRef(null);
  const gainNodeRef = useRef(null);
  const visualizerCanvasRef = useRef(null);
  const lyricsVisualizerCanvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const activeLyricRef = useRef(null);
  const fileInputRef = useRef(null);
  const synthTimerRef = useRef(null);
  const isProceduralSynthRef = useRef(false);

  // Show transient toast
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  }, []);

  // Copy URL with feedback
  const copyLink = useCallback((url, type = 'local') => {
    if (!url) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedType(type);
        showToast(`Copied Local Wi-Fi link!`);
        setTimeout(() => setCopiedType(''), 2500);
      }).catch(() => {
        showToast(`Link: ${url}`);
      });
    } else {
      showToast(`Link: ${url}`);
    }
  }, [showToast]);

  // Copy current Web URL
  const copyWebLink = useCallback(() => {
    const url = serverInfo.localUrl || window.location.origin;
    copyLink(url, 'local');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  }, [serverInfo.localUrl, copyLink]);

  // Handle native "Install Orbi App" prompt (PWA / WebAPK)
  const handleInstallApp = useCallback(async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      const choiceResult = await deferredInstallPrompt.userChoice;
      if (choiceResult && choiceResult.outcome === 'accepted') {
        setIsAppInstalled(true);
        showToast('Installing Orbi to your device...');
      }
      setDeferredInstallPrompt(null);
    } else {
      showToast('To install: Tap the three dots (⋮) in Chrome -> "Install App" or "Add to Home screen"');
    }
  }, [deferredInstallPrompt, showToast]);

  // Handle "Save All Songs to Phone (Offline Vault)"
  const handleDownloadAllOffline = useCallback(async () => {
    if (isCachingOffline) return;
    setIsCachingOffline(true);
    showToast(`Saving all ${tracks.length} songs to your phone storage for 100% offline use...`);

    try {
      await cacheAllTracksOffline(tracks, (progress) => {
        setCacheProgress(progress);
        setOfflineCount(progress.current);
      });
      showToast(`100% Offline Vault Ready! All ${tracks.length} songs saved locally.`);
    } catch (err) {
      showToast('Offline download paused. Tap again to resume.');
    } finally {
      setIsCachingOffline(false);
      setCacheProgress(null);
      getOfflineCachedCount().then((cnt) => setOfflineCount(cnt));
    }
  }, [isCachingOffline, tracks, showToast]);

  // Listen for PWA install prompt & check offline cache count on startup
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredInstallPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setDeferredInstallPrompt(null);
      showToast('Orbi App installed successfully! Ready for 100% offline playback.');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    getOfflineCachedCount().then((cnt) => {
      if (cnt > 0) setOfflineCount(cnt);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [showToast]);

  // Load custom tracks and preferences from IndexedDB on startup
  useEffect(() => {
    async function loadStoredData() {
      try {
        const storedAccent = await getPreference('accentColor', '#14b8a6');
        if (storedAccent) setAccentColor(storedAccent);

        const storedTracks = await getAllCustomTracks();
        if (storedTracks && storedTracks.length > 0) {
          // Merge custom tracks: replace or add
          setTracks((prev) => {
            const map = new Map(prev.map((t) => [t.id, t]));
            storedTracks.forEach((st) => map.set(st.id, st));
            return Array.from(map.values());
          });
        }

        const storedPlaylists = await getAllCustomPlaylists();
        if (storedPlaylists && storedPlaylists.length > 0) {
          setPlaylists((prev) => {
            const map = new Map(prev.map((p) => [p.id, p]));
            storedPlaylists.forEach((sp) => map.set(sp.id, sp));
            return Array.from(map.values());
          });
        }

        const storedLikes = await getPreference('likedSongIds', null);
        if (storedLikes && Array.isArray(storedLikes)) {
          setLikedSongIds(new Set(storedLikes));
        }
      } catch (err) {
        console.warn('IndexedDB initial load error:', err);
      }
    }
    loadStoredData();
  }, []);

  // Fetch server info (local Wi-Fi URL) and scan local music
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch('/api/server-info');
        if (res.ok) {
          const data = await res.json();
          setServerInfo(data);
        }
      } catch (e) {
        // quiet fallback
      }
    };
    fetchInfo();

    // Also fetch local music dropped into public/music/
    const fetchLocalMusic = async () => {
      try {
        const res = await fetch('/api/local-music');
        if (res.ok) {
          const data = await res.json();
          if (data.tracks && data.tracks.length > 0) {
            setTracks((prev) => {
              const map = new Map(prev.map((t) => [t.id, t]));
              data.tracks.forEach((t) => {
                if (!map.has(t.id)) {
                  map.set(t.id, t);
                }
              });
              return Array.from(map.values());
            });
          }
        }
      } catch (e) {
        // quiet
      }
    };
    fetchLocalMusic();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  // Save liked song IDs when updated
  const toggleLike = useCallback((trackId) => {
    setLikedSongIds((prev) => {
      const next = new Set(prev);
      if (next.has(trackId)) {
        next.delete(trackId);
        showToast('Removed from Liked Songs');
      } else {
        next.add(trackId);
        showToast('Saved to Liked Songs');
      }
      setPreference('likedSongIds', Array.from(next));
      return next;
    });
  }, [showToast]);

  // Update accent color
  const updateAccentColor = useCallback((hex) => {
    setAccentColor(hex);
    setPreference('accentColor', hex);
    showToast(`Accent color updated`);
  }, [showToast]);

  // Initialize Web Audio API graph
  const initWebAudio = useCallback(() => {
    if (audioContextRef.current) {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const audioEl = audioElementRef.current;
      if (!audioEl) return;

      const source = ctx.createMediaElementSource(audioEl);
      sourceNodeRef.current = source;

      // 5-band Equalizer
      const filters = EQ_FREQUENCIES.map((freq, index) => {
        const filter = ctx.createBiquadFilter();
        if (index === 0) {
          filter.type = 'lowshelf';
        } else if (index === EQ_FREQUENCIES.length - 1) {
          filter.type = 'highshelf';
        } else {
          filter.type = 'peaking';
          filter.Q.value = 1.0;
        }
        filter.frequency.value = freq;
        filter.gain.value = eqGains[index] || 0;
        return filter;
      });
      eqFiltersRef.current = filters;

      // Analyser for real-time visualizer canvas
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      // Gain node
      const gainNode = ctx.createGain();
      gainNode.gain.value = isMuted ? 0 : volume;
      gainNodeRef.current = gainNode;

      // Connect source -> filter0 -> filter1 -> ... -> analyser -> gain -> destination
      let currentInput = source;
      for (const filter of filters) {
        currentInput.connect(filter);
        currentInput = filter;
      }
      currentInput.connect(analyser);
      analyser.connect(gainNode);
      gainNode.connect(ctx.destination);
    } catch (err) {
      console.warn('Web Audio initialization error:', err);
    }
  }, [eqGains, isMuted, volume]);

  // Set individual EQ band gain
  const handleEqBandChange = (bandIndex, value) => {
    const val = parseFloat(value);
    setEqGains((prev) => {
      const next = [...prev];
      next[bandIndex] = val;
      return next;
    });
    setSelectedEqPreset('Custom');
    if (eqFiltersRef.current[bandIndex]) {
      eqFiltersRef.current[bandIndex].gain.setTargetAtTime(
        val,
        audioContextRef.current ? audioContextRef.current.currentTime : 0,
        0.05
      );
    }
  };

  // Set EQ preset
  const handleEqPresetSelect = (presetName) => {
    const gains = EQ_PRESETS[presetName];
    if (!gains) return;
    setSelectedEqPreset(presetName);
    setEqGains([...gains]);
    gains.forEach((g, idx) => {
      if (eqFiltersRef.current[idx]) {
        eqFiltersRef.current[idx].gain.setTargetAtTime(
          g,
          audioContextRef.current ? audioContextRef.current.currentTime : 0,
          0.05
        );
      }
    });
  };

  // Stop procedural synth if active
  const stopProceduralSynth = useCallback(() => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    isProceduralSynthRef.current = false;
  }, []);

  // Web Audio Procedural Synth Fallback: Plays rich rhythmic synthwave chords
  const startProceduralSynth = useCallback(() => {
    stopProceduralSynth();
    isProceduralSynthRef.current = true;
    initWebAudio();

    const ctx = audioContextRef.current;
    if (!ctx) return;

    const chords = [
      [220, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [196.00, 246.94, 293.66, 349.23], // G7
    ];
    let step = 0;

    const playChordPulse = () => {
      if (!isProceduralSynthRef.current || !ctx || ctx.state === 'closed') return;
      const now = ctx.currentTime;
      const currentNotes = chords[step % chords.length];
      step++;

      currentNotes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.exponentialRampToValueAtTime(0.08, now + 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        if (analyserRef.current) {
          osc.connect(noteGain);
          noteGain.connect(analyserRef.current);
        } else {
          osc.connect(noteGain);
          noteGain.connect(ctx.destination);
        }

        osc.start(now);
        osc.stop(now + 1.9);
      });
    };

    playChordPulse();
    synthTimerRef.current = setInterval(() => {
      playChordPulse();
      setCurrentTime((prev) => {
        const next = prev + 1.8;
        if (duration > 0 && next >= duration) {
          // Track completed
          if (repeatMode === 'one') return 0;
          return next;
        }
        return next;
      });
    }, 1800);
  }, [duration, initWebAudio, repeatMode, stopProceduralSynth]);

  // Play a specific track
  const playTrack = useCallback(async (track, newQueue = null) => {
    if (!track) return;
    initWebAudio();
    stopProceduralSynth();

    setCurrentTrack(track);
    setCurrentTime(0);
    setDuration(track.duration || 160);

    if (newQueue) {
      setQueue(newQueue);
      const idx = newQueue.findIndex((t) => t.id === track.id);
      setQueueIndex(idx >= 0 ? idx : 0);
    } else {
      const idx = queue.findIndex((t) => t.id === track.id);
      if (idx >= 0) setQueueIndex(idx);
    }

    const audioEl = audioElementRef.current;
    if (!audioEl) return;

    try {
      // 1. Check if there is an audio blob saved in IndexedDB
      const storedBlob = await getTrackAudioBlob(track.id);
      if (storedBlob) {
        audioEl.src = URL.createObjectURL(storedBlob);
      } else if ('caches' in window) {
        // 2. Check if cached in Service Worker Media Cache
        try {
          const mediaCache = await caches.open('orbi-offline-media-v1');
          const cleanUrl = (track.audioUrl || '').split('?')[0];
          const cachedRes = await mediaCache.match(cleanUrl);
          if (cachedRes) {
            const blob = await cachedRes.blob();
            audioEl.src = URL.createObjectURL(blob);
          } else {
            audioEl.src = track.audioUrl || '';
          }
        } catch {
          audioEl.src = track.audioUrl || '';
        }
      } else {
        audioEl.src = track.audioUrl || '';
      }

      audioEl.load();
      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.info('Audio file playback fallback to procedural Web Audio synth:', err.message);
            setIsPlaying(true);
            startProceduralSynth();
          });
      }
    } catch {
      setIsPlaying(true);
      startProceduralSynth();
    }
  }, [initWebAudio, queue, startProceduralSynth, stopProceduralSynth]);

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    initWebAudio();
    const audioEl = audioElementRef.current;

    if (isPlaying) {
      if (audioEl) audioEl.pause();
      stopProceduralSynth();
      setIsPlaying(false);
    } else {
      if (isProceduralSynthRef.current) {
        startProceduralSynth();
        setIsPlaying(true);
      } else if (audioEl && audioEl.src) {
        audioEl.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(true);
            startProceduralSynth();
          });
      } else if (currentTrack) {
        playTrack(currentTrack);
      }
    }
  }, [currentTrack, initWebAudio, isPlaying, playTrack, startProceduralSynth, stopProceduralSynth]);

  // Next Track
  const handleNextTrack = useCallback(() => {
    if (queue.length === 0) return;
    let nextIdx = queueIndex + 1;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * queue.length);
    } else if (nextIdx >= queue.length) {
      nextIdx = 0;
    }
    setQueueIndex(nextIdx);
    playTrack(queue[nextIdx]);
  }, [isShuffle, playTrack, queue, queueIndex]);

  // Previous Track
  const handlePrevTrack = useCallback(() => {
    if (currentTime > 3) {
      if (audioElementRef.current) audioElementRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    if (queue.length === 0) return;
    let prevIdx = queueIndex - 1;
    if (prevIdx < 0) prevIdx = queue.length - 1;
    setQueueIndex(prevIdx);
    playTrack(queue[prevIdx]);
  }, [currentTime, playTrack, queue, queueIndex]);

  // Seek
  const handleSeek = (newTime) => {
    setCurrentTime(newTime);
    if (audioElementRef.current && !isProceduralSynthRef.current) {
      audioElementRef.current.currentTime = newTime;
    }
  };

  // Volume change
  const handleVolumeChange = (newVolume) => {
    const val = Math.max(0, Math.min(1, newVolume));
    setVolume(val);
    if (isMuted && val > 0) setIsMuted(false);
    if (audioElementRef.current) {
      audioElementRef.current.volume = isMuted ? 0 : val;
    }
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(
        isMuted ? 0 : val,
        audioContextRef.current.currentTime,
        0.05
      );
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioElementRef.current) {
        audioElementRef.current.volume = next ? 0 : volume;
      }
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(
          next ? 0 : volume,
          audioContextRef.current.currentTime,
          0.05
        );
      }
      return next;
    });
  };

  // HTML5 audio event handlers
  useEffect(() => {
    const audioEl = audioElementRef.current;
    if (!audioEl) return;

    const onTimeUpdate = () => {
      if (!isProceduralSynthRef.current) {
        setCurrentTime(audioEl.currentTime);
      }
    };

    const onLoadedMetadata = () => {
      if (audioEl.duration && !isNaN(audioEl.duration)) {
        setDuration(audioEl.duration);
      }
    };

    const onEnded = () => {
      if (repeatMode === 'one') {
        audioEl.currentTime = 0;
        audioEl.play().catch(() => {});
      } else {
        handleNextTrack();
      }
    };

    const onError = () => {
      if (isPlaying) {
        console.warn('Audio element error, falling back to procedural Web Audio synth');
        startProceduralSynth();
      }
    };

    audioEl.addEventListener('timeupdate', onTimeUpdate);
    audioEl.addEventListener('loadedmetadata', onLoadedMetadata);
    audioEl.addEventListener('ended', onEnded);
    audioEl.addEventListener('error', onError);

    return () => {
      audioEl.removeEventListener('timeupdate', onTimeUpdate);
      audioEl.removeEventListener('loadedmetadata', onLoadedMetadata);
      audioEl.removeEventListener('ended', onEnded);
      audioEl.removeEventListener('error', onError);
    };
  }, [handleNextTrack, isPlaying, repeatMode, startProceduralSynth]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleSeek(Math.max(0, currentTime - 5));
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleSeek(Math.min(duration, currentTime + 5));
          break;
        case 'ArrowUp':
          e.preventDefault();
          handleVolumeChange(volume + 0.05);
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleVolumeChange(volume - 0.05);
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'KeyL':
          e.preventDefault();
          setShowLyrics((prev) => !prev);
          break;
        case 'KeyQ':
          e.preventDefault();
          setShowQueue((prev) => !prev);
          break;
        case 'Escape':
          setShowLyrics(false);
          setShowQueue(false);
          setShowEqualizer(false);
          setShowEditModal(false);
          setShowMobileNowPlaying(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTime, duration, togglePlay, toggleMute, volume]);

  // Real-time Visualizer Canvas Animation Loop
  useEffect(() => {
    const drawVisualizer = () => {
      const analyser = analyserRef.current;
      const canvases = [visualizerCanvasRef.current, lyricsVisualizerCanvasRef.current].filter(Boolean);

      if (analyser && canvases.length > 0) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        canvases.forEach((canvas) => {
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          const width = canvas.width;
          const height = canvas.height;
          ctx.clearRect(0, 0, width, height);

          const barCount = 18;
          const barWidth = (width / barCount) - 2;
          let x = 0;

          for (let i = 0; i < barCount; i++) {
            const dataIndex = Math.floor((i / barCount) * (bufferLength / 2));
            const value = isPlaying ? dataArray[dataIndex] || 10 : 8;
            const barHeight = Math.max(3, (value / 255) * height);

            ctx.fillStyle = accentColor;
            ctx.beginPath();
            ctx.roundRect(x, height - barHeight, barWidth, barHeight, [2, 2, 0, 0]);
            ctx.fill();

            x += barWidth + 2;
          }
        });
      }

      animationFrameRef.current = requestAnimationFrame(drawVisualizer);
    };

    animationFrameRef.current = requestAnimationFrame(drawVisualizer);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [accentColor, isPlaying]);

  // Parsed Synced Lyrics for current track
  const parsedLyrics = useMemo(() => {
    return parseLrc(currentTrack?.lyrics || '');
  }, [currentTrack]);

  // Active Lyric line index
  const activeLyricIndex = useMemo(() => {
    if (parsedLyrics.length === 0) return -1;
    let idx = -1;
    for (let i = 0; i < parsedLyrics.length; i++) {
      if (currentTime >= parsedLyrics[i].time) {
        idx = i;
      } else {
        break;
      }
    }
    return idx;
  }, [currentTime, parsedLyrics]);

  // Smoothly auto-scroll active lyric line into center
  useEffect(() => {
    if (activeLyricRef.current) {
      activeLyricRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeLyricIndex]);

  // Drag-and-Drop file handling
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDraggingOver(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('audio/') || /\.(mp3|wav|m4a|ogg|flac|aac)$/i.test(file.name)
    );

    if (files.length === 0) {
      showToast('Please drop valid audio files (.mp3, .wav, .m4a)');
      return;
    }

    const file = files[0];
    const rawName = file.name.replace(/\.[^/.]+$/, '');
    const parts = rawName.split(' - ');
    const artist = parts.length > 1 ? parts[0].trim() : 'Local Artist';
    const title = parts.length > 1 ? parts.slice(1).join(' - ').trim() : rawName.trim();

    const newTrack = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title,
      artist,
      album: 'Custom Uploads',
      genre: 'Local Audio',
      year: new Date().getFullYear(),
      duration: 180,
      coverUrl: '/covers/yeat-money-so-big.jpg',
      audioUrl: '',
      lyrics: `[00:00.00] ${title} - ${artist}\n[00:05.00] Playing from your local file storage`,
      isCustom: true,
    };

    try {
      await saveCustomTrack(newTrack, file);
      setTracks((prev) => [newTrack, ...prev]);
      playTrack(newTrack);
      showToast(`Added "${newTrack.title}" to your library!`);
    } catch (err) {
      console.error('Failed to save uploaded track:', err);
      showToast('Failed to save uploaded track to IndexedDB');
    }
  };

  // In-App Track Edit Save
  const handleSaveTrackEdit = async (updatedTrack, optionalAudioFile) => {
    try {
      await saveCustomTrack(updatedTrack, optionalAudioFile || null);

      setTracks((prev) =>
        prev.map((t) => (t.id === updatedTrack.id ? { ...t, ...updatedTrack } : t))
      );

      if (currentTrack && currentTrack.id === updatedTrack.id) {
        setCurrentTrack((prev) => ({ ...prev, ...updatedTrack }));
      }

      setShowEditModal(false);
      setTrackToEdit(null);
      showToast(`Updated "${updatedTrack.title}" successfully!`);
    } catch (err) {
      console.error('Error saving track edit:', err);
      showToast('Failed to save track changes');
    }
  };

  // Create Playlist
  const handleCreatePlaylist = async () => {
    const newPlaylist = {
      id: `pl-${Date.now()}`,
      name: `My Playlist #${playlists.length + 1}`,
      description: 'Custom curated playlist',
      coverUrl: '/covers/yeat-money-so-big.jpg',
      trackIds: [],
    };
    try {
      await saveCustomPlaylist(newPlaylist);
      setPlaylists((prev) => [...prev, newPlaylist]);
      setCurrentView({ type: 'playlist', id: newPlaylist.id });
      showToast(`Created "${newPlaylist.name}"`);
    } catch (err) {
      console.error('Error creating playlist:', err);
    }
  };

  // Filtered tracks for search view
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return tracks.filter((t) =>
      t.title.toLowerCase().includes(q) ||
      t.artist.toLowerCase().includes(q) ||
      (t.album && t.album.toLowerCase().includes(q)) ||
      (t.genre && t.genre.toLowerCase().includes(q))
    );
  }, [searchQuery, tracks]);

  // Current active playlist object
  const activePlaylist = useMemo(() => {
    if (currentView.type !== 'playlist') return null;
    return playlists.find((p) => p.id === currentView.id);
  }, [currentView, playlists]);

  // Tracks in active playlist
  const activePlaylistTracks = useMemo(() => {
    if (!activePlaylist) return [];
    return (activePlaylist.trackIds || [])
      .map((id) => tracks.find((t) => t.id === id))
      .filter(Boolean);
  }, [activePlaylist, tracks]);

  // Liked tracks
  const likedTracks = useMemo(() => {
    return tracks.filter((t) => likedSongIds.has(t.id));
  }, [likedSongIds, tracks]);

  // Artist tracks
  const artistTracks = useMemo(() => {
    if (currentView.type !== 'artist') return [];
    return tracks.filter(
      (t) => t.artist.toLowerCase().includes(currentView.name.toLowerCase())
    );
  }, [currentView, tracks]);

  return (
    <div 
      className="h-screen w-screen flex flex-col bg-[#06191f] text-[#f0fdfa] overflow-hidden relative font-sans select-none"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden HTML5 Audio Element */}
      <audio ref={audioElementRef} preload="metadata" />

      {/* Hidden File Input for Manual Audio Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,.mp3,.wav,.m4a,.ogg,.flac"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleDrop({
              preventDefault: () => {},
              dataTransfer: { files: [e.target.files[0]] },
            });
            e.target.value = '';
          }
        }}
      />

      {/* Transient Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#09262f]/95 border border-teal-500/40 text-teal-200 px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Drag & Drop Visual Overlay */}
      {isDraggingOver && (
        <div className="fixed inset-0 z-50 bg-[#06191f]/90 border-4 border-dashed border-teal-400 flex flex-col items-center justify-center gap-4 backdrop-blur-md">
          <div className="w-20 h-20 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300 animate-bounce">
            <Upload className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-white">Drop your MP3, WAV, or M4A here</h2>
          <p className="text-sm text-teal-200/80">Files will be saved directly into Orbi's offline IndexedDB vault</p>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* --- LEFT SIDEBAR (Desktop) --- */}
        <aside className="hidden md:flex flex-col w-64 bg-[#030e12]/95 border-r border-teal-500/15 p-4 justify-between z-20">
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div 
              onClick={() => setCurrentView({ type: 'home' })}
              className="flex items-center gap-2.5 px-2 cursor-pointer group"
            >
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center text-black shadow-lg transition-transform group-hover:scale-105"
                style={{ backgroundColor: accentColor }}
              >
                <Music2 className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block">Orbi</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-teal-400 -mt-1 block">Music</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1 text-sm font-semibold">
              <button
                onClick={() => setCurrentView({ type: 'home' })}
                className={`flex items-center gap-3.5 px-3 py-2.5 rounded-lg transition-colors ${
                  currentView.type === 'home'
                    ? 'bg-teal-500/15 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                style={{ color: currentView.type === 'home' ? accentColor : undefined }}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>

              <button
                onClick={() => setCurrentView({ type: 'search' })}
                className={`flex items-center gap-3.5 px-3 py-2.5 rounded-lg transition-colors ${
                  currentView.type === 'search'
                    ? 'bg-teal-500/15 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                style={{ color: currentView.type === 'search' ? accentColor : undefined }}
              >
                <SearchIcon className="w-5 h-5" />
                <span>Search</span>
              </button>

              <button
                onClick={() => setCurrentView({ type: 'library' })}
                className={`flex items-center gap-3.5 px-3 py-2.5 rounded-lg transition-colors ${
                  currentView.type === 'library'
                    ? 'bg-teal-500/15 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                style={{ color: currentView.type === 'library' ? accentColor : undefined }}
              >
                <Library className="w-5 h-5" />
                <span>Your Library</span>
              </button>

              <button
                onClick={() => setCurrentView({ type: 'liked' })}
                className={`flex items-center gap-3.5 px-3 py-2.5 rounded-lg transition-colors ${
                  currentView.type === 'liked'
                    ? 'bg-teal-500/15 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                style={{ color: currentView.type === 'liked' ? accentColor : undefined }}
              >
                <Heart className={`w-5 h-5 ${currentView.type === 'liked' ? 'fill-current' : ''}`} />
                <span>Liked Songs</span>
              </button>
            </nav>

            {/* Playlists Header & Create */}
            <div className="pt-2 border-t border-teal-500/15">
              <div className="flex items-center justify-between px-3 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300/70">Playlists</span>
                <button
                  onClick={handleCreatePlaylist}
                  className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white"
                  title="Create Playlist"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Playlists List */}
              <div className="max-h-48 overflow-y-auto space-y-0.5 text-xs text-gray-400 font-medium">
                {playlists.map((pl) => (
                  <button
                    key={pl.id}
                    onClick={() => setCurrentView({ type: 'playlist', id: pl.id })}
                    className={`w-full text-left px-3 py-1.5 rounded truncate transition-colors ${
                      currentView.type === 'playlist' && currentView.id === pl.id
                        ? 'text-teal-300 font-bold bg-teal-500/10'
                        : 'hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {pl.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* --- SIDEBAR FOOTER: 100% OFFLINE VAULT CARD --- */}
          <div className="p-3 bg-[#09262f] rounded-xl border border-teal-500/20 shadow-lg flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span className="text-xs font-bold text-white truncate">100% Offline Vault</span>
              </div>
              <button
                onClick={() => setShowQrModal(true)}
                className="p-1 rounded bg-teal-500/10 hover:bg-teal-500/25 text-teal-300 transition-colors"
                title="Scan QR Code to open on phone"
              >
                <QrCode className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-teal-200/70 leading-snug">
              Play all {tracks.length} songs completely offline on your phone with zero mobile data and laptop OFF.
            </p>

            <div className="flex flex-col gap-1.5 pt-1">
              {/* 1. Save All to Phone Offline Vault */}
              <button
                onClick={handleDownloadAllOffline}
                disabled={isCachingOffline}
                className="flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg font-bold text-xs text-black shadow-md transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-75"
                style={{ backgroundColor: accentColor }}
                title="Save entire library into your phone storage for offline use"
              >
                {isCachingOffline ? (
                  <>
                    <Disc3 className="w-3.5 h-3.5 animate-spin text-black" />
                    <span>{cacheProgress ? `${cacheProgress.current}/${cacheProgress.total}` : 'Saving...'}</span>
                  </>
                ) : offlineCount >= tracks.length ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                    <span>Vault Saved ({offlineCount})</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-black" />
                    <span>Save Vault ({offlineCount}/{tracks.length})</span>
                  </>
                )}
              </button>

              {/* 2. Install Orbi App (PWA) */}
              <button
                onClick={handleInstallApp}
                className="flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg font-semibold text-xs bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/30 transition-colors"
                title="Install Orbi as standalone app on your phone"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{isAppInstalled ? 'Orbi App Installed' : 'Install Orbi App'}</span>
              </button>

              {/* 3. Download Orbi APK */}
              <a
                href="/orbi.apk"
                download="Orbi-Music.apk"
                className="flex items-center justify-center gap-1.5 w-full py-1 px-3 rounded-lg font-medium text-[11px] text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                title="Download compiled Android APK directly"
              >
                <Download className="w-3 h-3 text-teal-400" />
                <span>Download Android APK</span>
              </a>

              {/* 4. Scan QR Code Button */}
              <button
                onClick={() => setShowQrModal(true)}
                className="flex items-center justify-center gap-1.5 w-full py-1 px-3 rounded-lg text-[11px] font-medium text-teal-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <QrCode className="w-3 h-3" />
                <span>Scan QR for Phone</span>
              </button>
            </div>
          </div>
        </aside>

        {/* --- DYNAMIC CENTER CONTENT AREA --- */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#06191f]/95 m-0 md:m-2 md:ml-0 md:rounded-xl overflow-hidden relative shadow-2xl border-0 md:border md:border-teal-500/15 backdrop-blur-md pb-28 md:pb-0">
          {/* Top Bar Header */}
          <header className="h-14 md:h-16 px-3 md:px-8 flex items-center justify-between sticky top-0 z-30 bg-[#06191f]/90 backdrop-blur-md border-b border-teal-500/15">
            {/* Search Input */}
            <div className="flex items-center gap-2 md:gap-4 flex-1 max-w-xl mr-2">
              <div className="relative flex-1 max-w-md">
                <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentView.type !== 'search') setCurrentView({ type: 'search' });
                  }}
                  onFocus={() => {
                    if (currentView.type !== 'search') setCurrentView({ type: 'search' });
                  }}
                  placeholder="Search songs, artists, albums, genres..."
                  className="w-full bg-[#09262f] hover:bg-[#0f3844] focus:bg-[#0f3844] text-xs sm:text-sm text-white placeholder-gray-400 pl-9 pr-8 py-2 rounded-full border border-teal-500/20 focus:border-teal-400 outline-none transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="hidden sm:flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-full text-black transition-transform hover:scale-105 shadow-md"
                style={{ backgroundColor: accentColor }}
                title="Upload audio files"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
              </button>

              {/* Equalizer Button */}
              <button
                onClick={() => setShowEqualizer(true)}
                className="p-2 rounded-full bg-black/40 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                title="5-Band Graphic Equalizer"
              >
                <Sliders className="w-4 h-4" />
              </button>

              {/* Palette Accent Color Toggle */}
              <div className="relative group">
                <button
                  className="p-2 rounded-full bg-black/40 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                  title="Theme Accent Colors"
                >
                  <Palette className="w-4 h-4" />
                </button>
                <div className="hidden group-hover:flex absolute right-0 top-10 z-50 bg-[#09262f] p-2 rounded-xl border border-teal-500/20 shadow-2xl flex-col gap-1.5 w-40">
                  <span className="text-[10px] font-bold text-gray-400 uppercase px-1">Accent Themes</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {THEME_ACCENTS.map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => updateAccentColor(c.hex)}
                        className={`w-7 h-7 rounded-full shadow transition-transform hover:scale-110 ${
                          accentColor === c.hex ? 'ring-2 ring-white scale-105' : ''
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* --- VIEW 1: HOME VIEW --- */}
          {currentView.type === 'home' && (
            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 space-y-7 select-none">
              {/* --- HERO BANNER: 100% OFFLINE VAULT & CROSS-PLATFORM --- */}
              <div className="relative rounded-2xl overflow-hidden p-6 md:p-8 bg-gradient-to-r from-[#0d3b47] via-[#09262f] to-[#04161b] border border-teal-500/25 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col gap-2.5 max-w-xl text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold w-fit mx-auto md:mx-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>100% Offline Music Vault • Zero Data Required</span>
                  </div>

                  <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                    Get Orbi Everywhere — 100% Offline
                  </h1>

                  <p className="text-xs md:text-sm text-teal-100/75 leading-relaxed">
                    Install Orbi on your phone and save the entire {tracks.length}-song library directly to your phone storage. Plays anywhere with zero mobile data, in airplane mode, and even when your laptop is completely turned off.
                  </p>

                  {/* Live offline caching progress indicator */}
                  {isCachingOffline && cacheProgress && (
                    <div className="w-full max-w-md bg-black/40 rounded-xl p-2.5 border border-teal-500/30 space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-teal-300">
                        <span>Saving Songs Offline...</span>
                        <span>{cacheProgress.current} / {cacheProgress.total} ({cacheProgress.percent}%)</span>
                      </div>
                      <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-teal-400 transition-all duration-200" 
                          style={{ width: `${cacheProgress.percent}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-teal-200/60 truncate">Caching: {cacheProgress.trackTitle}</p>
                    </div>
                  )}

                  {/* Prominent Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                    {/* Action 1: Save All Songs to Phone (Offline Vault) */}
                    <button
                      onClick={handleDownloadAllOffline}
                      disabled={isCachingOffline}
                      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-black shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-75"
                      style={{ backgroundColor: accentColor }}
                      title="Save all songs locally to your phone storage for 100% offline playback"
                    >
                      {isCachingOffline ? (
                        <>
                          <Disc3 className="w-4 h-4 animate-spin text-black" />
                          <span>Saving ({cacheProgress ? `${cacheProgress.percent}%` : '...'})</span>
                        </>
                      ) : offlineCount >= tracks.length ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-black" />
                          <span>All {offlineCount} Songs Saved Offline</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 text-black" />
                          <span>Save All to Phone ({offlineCount > 0 ? `${offlineCount}/${tracks.length}` : 'Offline Vault'})</span>
                        </>
                      )}
                    </button>

                    {/* Action 2: Install Orbi App */}
                    <button
                      onClick={handleInstallApp}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 text-teal-300 font-bold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95"
                      title="Install Orbi as a standalone app on your phone"
                    >
                      <Smartphone className="w-4 h-4 text-teal-400" />
                      <span>{isAppInstalled ? 'Orbi App Installed' : 'Install Orbi App'}</span>
                    </button>

                    {/* Action 3: Download Android APK */}
                    <a
                      href="/orbi.apk"
                      download="Orbi-Music.apk"
                      className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs transition-colors hover:scale-105 active:scale-95"
                      title="Download the compiled Android APK directly"
                    >
                      <Download className="w-3.5 h-3.5 text-teal-300" />
                      <span>Download APK</span>
                    </a>

                    {/* Action 4: Local Wi-Fi Network Link */}
                    <div className="inline-flex items-center bg-black/50 border border-teal-500/30 rounded-full p-1 pl-3.5 gap-2 text-xs text-white">
                      <Wifi className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                      <span className="font-mono text-teal-200/80 truncate max-w-[120px] sm:max-w-[160px]">
                        {serverInfo.localUrl || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173')}
                      </span>
                      <button
                        onClick={() => copyLink(serverInfo.localUrl || window.location.origin, 'local')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-500/20 hover:bg-teal-500/35 text-teal-300 font-semibold transition-colors"
                        title="Copy Local Wi-Fi link"
                      >
                        {copiedType === 'local' ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedType === 'local' ? 'Copied!' : 'Copy Wi-Fi'}</span>
                      </button>
                    </div>

                    {/* Action 5: Scan QR Code Button */}
                    <button
                      onClick={() => setShowQrModal(true)}
                      className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-teal-500/30 text-white font-bold text-xs transition-colors shadow-md hover:scale-105 active:scale-95"
                      title="Scan QR Code to connect phone camera immediately"
                    >
                      <QrCode className="w-4 h-4 text-teal-300" />
                      <span>Scan QR for Phone</span>
                    </button>
                  </div>
                </div>

                {/* Right Hero Badge Visual */}
                <div className="hidden lg:flex items-center justify-center flex-shrink-0 relative">
                  <div 
                    onClick={() => setShowQrModal(true)}
                    className="w-36 h-36 rounded-3xl bg-gradient-to-tr from-[#09262f] to-[#04161b] border-2 border-teal-500/40 p-2 shadow-2xl rotate-3 hover:rotate-0 transition-transform cursor-pointer flex flex-col items-center justify-center group"
                    title="Click to view QR Code"
                  >
                    <img
                      src={`/api/qr-code?url=${encodeURIComponent(serverInfo.localUrl || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'))}`}
                      alt="Scan to open on phone"
                      className="w-24 h-24 rounded-lg group-hover:scale-105 transition-transform"
                    />
                    <span className="text-[10px] font-bold text-teal-300 mt-1 flex items-center gap-1">
                      <QrCode className="w-3 h-3" /> Connect Phone
                    </span>
                  </div>
                  <div className="absolute -bottom-3 -left-3 bg-[#030e12] border border-teal-500/30 px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2">
                    <Disc3 className="w-4 h-4 text-teal-400 animate-spin" />
                    <span className="text-xs font-bold text-white">{tracks.length} Real Tracks</span>
                  </div>
                </div>
              </div>

              {/* 4 Curated Playlists */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-extrabold text-white tracking-tight">Curated Playlists</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {playlists.map((pl) => {
                    const plTracks = tracks.filter((t) => pl.trackIds?.includes(t.id));
                    return (
                      <div
                        key={pl.id}
                        onClick={() => setCurrentView({ type: 'playlist', id: pl.id })}
                        className="group relative p-4 bg-[#09262f]/70 hover:bg-[#0f3844] rounded-xl border border-teal-500/15 hover:border-teal-500/30 cursor-pointer transition-all shadow-md"
                      >
                        <div className="relative mb-3 overflow-hidden rounded-lg aspect-square shadow-md">
                          <img
                            src={pl.coverUrl}
                            alt={pl.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (plTracks.length > 0) playTrack(plTracks[0], plTracks);
                            }}
                            className="absolute bottom-2 right-2 w-11 h-11 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 shadow-2xl hover:scale-105 transition-all"
                            style={{ backgroundColor: accentColor }}
                          >
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </button>
                        </div>
                        <h4 className="font-bold text-sm text-white truncate">{pl.name}</h4>
                        <p className="text-xs text-teal-200/60 line-clamp-2 mt-1">{pl.description}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* All Tracks List */}
              <section className="pb-10">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-extrabold text-white tracking-tight">All Tracks ({tracks.length})</h2>
                  <span className="text-xs text-teal-300/70 hidden sm:inline">Tap any song to play immediately</span>
                </div>

                {/* Table Header (Desktop) */}
                <div className="hidden md:grid grid-cols-[16px_4fr_2fr_minmax(100px,1fr)] gap-4 px-4 py-2 border-b border-teal-500/15 text-xs font-semibold text-teal-300/70 uppercase tracking-wider mb-1">
                  <span>#</span>
                  <span>Title</span>
                  <span>Album</span>
                  <span className="text-right">Duration</span>
                </div>

                {/* Song Rows */}
                <div className="space-y-1">
                  {tracks.map((track, idx) => {
                    const isCurrent = currentTrack && currentTrack.id === track.id;
                    const isLiked = likedSongIds.has(track.id);

                    return (
                      <div
                        key={track.id}
                        onClick={() => playTrack(track, tracks)}
                        className={`group relative flex items-center justify-between md:grid md:grid-cols-[16px_4fr_2fr_minmax(100px,1fr)] gap-3 md:gap-4 px-3 md:px-4 py-2.5 md:py-2 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors text-sm text-gray-300 cursor-pointer ${
                          isCurrent ? 'bg-teal-500/15 font-semibold text-white' : ''
                        }`}
                      >
                        {/* 1. Track Number or Play Indicator */}
                        <div className="hidden md:flex items-center justify-center w-4 h-8 flex-shrink-0">
                          {isCurrent && isPlaying ? (
                            <div className="flex items-end gap-[2px] h-3">
                              <span className="playing-bar" style={{ backgroundColor: accentColor }}></span>
                              <span className="playing-bar" style={{ backgroundColor: accentColor }}></span>
                              <span className="playing-bar" style={{ backgroundColor: accentColor }}></span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400 group-hover:hidden">{idx + 1}</span>
                          )}
                          <Play className="w-3.5 h-3.5 fill-current hidden group-hover:block text-white" />
                        </div>

                        {/* 2. Cover + Title & Artist */}
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <img
                            src={track.coverUrl}
                            alt={track.title}
                            className="w-10 h-10 rounded-md object-cover flex-shrink-0 shadow border border-teal-500/15"
                          />
                          <div className="flex flex-col min-w-0">
                            <span 
                              className="truncate font-semibold"
                              style={{ color: isCurrent ? accentColor : '#ffffff' }}
                            >
                              {track.title}
                            </span>
                            <span 
                              onClick={(e) => {
                                e.stopPropagation();
                                const artistName = track.artist.toLowerCase().includes('seedhe maut') ? 'Seedhe Maut' : track.artist;
                                setCurrentView({ type: 'artist', name: artistName });
                              }}
                              className="truncate text-xs text-teal-200/70 hover:underline hover:text-white"
                            >
                              {track.artist}
                            </span>
                          </div>
                        </div>

                        {/* 3. Album */}
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            const albumLower = (track.album || '').toLowerCase();
                            const matchedPlaylist = playlists.find(p => p.name.toLowerCase().includes(albumLower));
                            if (matchedPlaylist) {
                              setCurrentView({ type: 'playlist', id: matchedPlaylist.id });
                            }
                          }}
                          className="truncate text-gray-400 hidden md:block hover:text-teal-300 hover:underline cursor-pointer"
                        >
                          {track.album || 'Single'}
                        </div>

                        {/* 4. Duration & Actions */}
                        <div className="flex items-center justify-end gap-2.5 text-right flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(track.id);
                            }}
                            className={`p-1.5 transition-colors ${
                              isLiked ? 'text-teal-400' : 'text-gray-400 hover:text-white md:opacity-0 md:group-hover:opacity-100'
                            }`}
                            title={isLiked ? 'Remove from Liked' : 'Save to Liked'}
                          >
                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                          </button>

                          <span className="text-xs tabular-nums text-gray-400 hidden sm:inline">
                            {formatTime(track.duration)}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setTrackToEdit(track);
                              setShowEditModal(true);
                            }}
                            className="p-1.5 text-gray-400 hover:text-white md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                            title="Edit Details / Replace Audio"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}

          {/* --- VIEW 2: SEARCH VIEW --- */}
          {currentView.type === 'search' && (
            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 space-y-6 select-none">
              <h2 className="text-2xl font-black text-white">Search Music</h2>

              {searchQuery ? (
                <div>
                  <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider mb-3">
                    Search Results ({searchResults.length})
                  </h3>

                  {searchResults.length === 0 ? (
                    <div className="py-20 text-center text-gray-400">
                      <p className="text-base font-semibold text-white">No songs found matching "{searchQuery}"</p>
                      <p className="text-xs text-teal-200/60 mt-1">Try searching for Yeat, Seedhe Maut, Nettspend, Arpit Bala, or Skai</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {searchResults.map((track, idx) => (
                        <div
                          key={track.id}
                          onClick={() => playTrack(track, searchResults)}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img src={track.coverUrl} alt={track.title} className="w-11 h-11 rounded-md object-cover" />
                            <div className="flex flex-col min-w-0">
                              <span className="font-semibold text-white truncate">{track.title}</span>
                              <span className="text-xs text-teal-200/70 truncate">{track.artist} • {track.album}</span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-400 tabular-nums">{formatTime(track.duration)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {playlists.map((pl) => (
                    <div
                      key={pl.id}
                      onClick={() => setCurrentView({ type: 'playlist', id: pl.id })}
                      className="p-4 bg-[#09262f] rounded-xl border border-teal-500/20 cursor-pointer hover:bg-[#0f3844] transition-all"
                    >
                      <img src={pl.coverUrl} alt={pl.name} className="w-full aspect-square object-cover rounded-lg mb-2" />
                      <h4 className="font-bold text-sm text-white truncate">{pl.name}</h4>
                      <p className="text-xs text-teal-300/70 mt-1">{pl.trackIds?.length || 0} tracks</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* --- VIEW 3: YOUR LIBRARY VIEW --- */}
          {currentView.type === 'library' && (
            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 space-y-6 select-none">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">Your Library</h2>
                  <p className="text-xs text-teal-200/60 mt-0.5">{tracks.length} tracks • {playlists.length} playlists</p>
                </div>
                <button
                  onClick={handleCreatePlaylist}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full font-bold text-xs text-black shadow"
                  style={{ backgroundColor: accentColor }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Playlist</span>
                </button>
              </div>

              {/* Library Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {/* Liked Songs Box */}
                <div
                  onClick={() => setCurrentView({ type: 'liked' })}
                  className="p-4 bg-gradient-to-br from-teal-700 via-teal-900 to-[#06191f] rounded-xl border border-teal-500/30 cursor-pointer flex flex-col justify-between h-52 shadow-lg"
                >
                  <Heart className="w-8 h-8 text-white fill-current" />
                  <div>
                    <h4 className="font-black text-base text-white">Liked Songs</h4>
                    <p className="text-xs text-teal-200/80 mt-1">{likedSongIds.size} songs</p>
                  </div>
                </div>

                {/* Custom Playlists */}
                {playlists.map((pl) => (
                  <div
                    key={pl.id}
                    onClick={() => setCurrentView({ type: 'playlist', id: pl.id })}
                    className="p-4 bg-[#09262f] rounded-xl border border-teal-500/20 cursor-pointer hover:bg-[#0f3844] transition-all flex flex-col justify-between"
                  >
                    <img src={pl.coverUrl} alt={pl.name} className="w-full aspect-square object-cover rounded-lg mb-2 shadow" />
                    <div>
                      <h4 className="font-bold text-sm text-white truncate">{pl.name}</h4>
                      <p className="text-xs text-teal-200/60 truncate mt-0.5">Playlist • {pl.trackIds?.length || 0} songs</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- VIEW 4: PLAYLIST VIEW --- */}
          {currentView.type === 'playlist' && activePlaylist && (
            <div className="flex-1 overflow-y-auto select-none">
              {/* Header Banner */}
              <div className="p-4 sm:p-8 pt-6 sm:pt-12 bg-gradient-to-b from-[#0e3845] via-[#09262f] to-[#06191f] border-b border-teal-500/20 flex flex-col sm:flex-row items-center sm:items-end gap-5">
                <img
                  src={activePlaylist.coverUrl}
                  alt={activePlaylist.name}
                  className="w-36 h-36 sm:w-48 sm:h-48 rounded-xl object-cover shadow-2xl border border-teal-500/20"
                />
                <div className="flex flex-col gap-1 text-center sm:text-left flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-teal-300">Playlist</span>
                  <h1 className="text-2xl sm:text-4xl font-black text-white truncate">{activePlaylist.name}</h1>
                  <p className="text-xs text-teal-200/70 mt-1 line-clamp-2">{activePlaylist.description}</p>
                  <p className="text-xs text-gray-400 mt-2 font-medium">{activePlaylistTracks.length} tracks</p>
                </div>
              </div>

              {/* Action Controls */}
              <div className="px-4 sm:px-8 py-4 flex items-center gap-4">
                <button
                  onClick={() => {
                    if (activePlaylistTracks.length > 0) playTrack(activePlaylistTracks[0], activePlaylistTracks);
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-black shadow-xl hover:scale-105 active:scale-95 transition-all"
                  style={{ backgroundColor: accentColor }}
                  title="Play Playlist"
                >
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </button>
              </div>

              {/* Tracks List */}
              <div className="px-4 sm:px-8 pb-12 space-y-1">
                {activePlaylistTracks.map((track, idx) => (
                  <div
                    key={track.id}
                    onClick={() => playTrack(track, activePlaylistTracks)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs text-gray-400 w-4">{idx + 1}</span>
                      <img src={track.coverUrl} alt={track.title} className="w-10 h-10 rounded-md object-cover" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-white truncate">{track.title}</span>
                        <span className="text-xs text-teal-200/70 truncate">{track.artist}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 tabular-nums">{formatTime(track.duration)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- VIEW 5: LIKED SONGS VIEW --- */}
          {currentView.type === 'liked' && (
            <div className="flex-1 overflow-y-auto select-none">
              <div className="p-4 sm:p-8 pt-6 sm:pt-12 bg-gradient-to-b from-teal-800 via-[#09262f] to-[#06191f] border-b border-teal-500/20 flex flex-col sm:flex-row items-center sm:items-end gap-5">
                <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-400 flex items-center justify-center text-white shadow-2xl">
                  <Heart className="w-20 h-20 fill-current" />
                </div>
                <div className="flex flex-col gap-1 text-center sm:text-left flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-teal-300">Playlist</span>
                  <h1 className="text-2xl sm:text-4xl font-black text-white">Liked Songs</h1>
                  <p className="text-xs text-gray-400 mt-2 font-medium">{likedTracks.length} saved songs</p>
                </div>
              </div>

              <div className="px-4 sm:px-8 py-4 flex items-center gap-4">
                <button
                  onClick={() => {
                    if (likedTracks.length > 0) playTrack(likedTracks[0], likedTracks);
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-black shadow-xl hover:scale-105 active:scale-95 transition-all"
                  style={{ backgroundColor: accentColor }}
                  title="Play Liked Songs"
                >
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </button>
              </div>

              <div className="px-4 sm:px-8 pb-12 space-y-1">
                {likedTracks.map((track, idx) => (
                  <div
                    key={track.id}
                    onClick={() => playTrack(track, likedTracks)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs text-gray-400 w-4">{idx + 1}</span>
                      <img src={track.coverUrl} alt={track.title} className="w-10 h-10 rounded-md object-cover" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-white truncate">{track.title}</span>
                        <span className="text-xs text-teal-200/70 truncate">{track.artist}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 tabular-nums">{formatTime(track.duration)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- VIEW 6: ARTIST VIEW --- */}
          {currentView.type === 'artist' && (
            <div className="flex-1 overflow-y-auto select-none">
              <div 
                className="p-6 sm:p-10 pt-12 sm:pt-20 bg-gradient-to-b from-[#0e3845] via-[#09262f] to-[#06191f] border-b border-teal-500/20"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-teal-300 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 fill-current" />
                  <span>Verified Artist</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white">{currentView.name}</h1>
                <p className="text-xs text-teal-200/70 mt-2">{artistTracks.length} tracks available</p>
              </div>

              <div className="px-4 sm:px-8 py-4 flex items-center gap-4">
                <button
                  onClick={() => {
                    if (artistTracks.length > 0) playTrack(artistTracks[0], artistTracks);
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-black shadow-xl hover:scale-105 active:scale-95 transition-all"
                  style={{ backgroundColor: accentColor }}
                  title={`Play ${currentView.name}`}
                >
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </button>
              </div>

              <div className="px-4 sm:px-8 pb-12 space-y-1">
                {artistTracks.map((track, idx) => (
                  <div
                    key={track.id}
                    onClick={() => playTrack(track, artistTracks)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs text-gray-400 w-4">{idx + 1}</span>
                      <img src={track.coverUrl} alt={track.title} className="w-10 h-10 rounded-md object-cover" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-white truncate">{track.title}</span>
                        <span className="text-xs text-teal-200/70 truncate">{track.album}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 tabular-nums">{formatTime(track.duration)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- DESKTOP BOTTOM PLAYER BAR (hidden on mobile) --- */}
      <footer className="hidden md:flex h-24 bg-[#030e12]/95 border-t border-teal-500/20 backdrop-blur-xl px-4 items-center justify-between select-none z-40 shadow-2xl">
        {/* 1. Track Info (Left) */}
        <div className="flex items-center gap-3 w-1/4 min-w-[180px]">
          {currentTrack ? (
            <>
              <div 
                className="relative group cursor-pointer"
                onClick={() => setShowLyrics((prev) => !prev)}
                title="Click to view lyrics (L)"
              >
                <img
                  src={currentTrack.coverUrl}
                  alt={currentTrack.title}
                  className="w-14 h-14 rounded-lg object-cover shadow border border-teal-500/20"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
                  <Mic2 className="w-5 h-5 text-teal-300" />
                </div>
              </div>

              <div className="flex flex-col min-w-0">
                <span 
                  onClick={() => setShowLyrics((prev) => !prev)}
                  className="text-sm font-bold text-white truncate cursor-pointer hover:underline"
                >
                  {currentTrack.title}
                </span>
                <span 
                  onClick={() => setCurrentView({ type: 'artist', name: currentTrack.artist })}
                  className="text-xs text-teal-200/70 truncate cursor-pointer hover:underline hover:text-white"
                >
                  {currentTrack.artist}
                </span>
              </div>

              <button
                onClick={() => toggleLike(currentTrack.id)}
                className="p-1.5 text-gray-400 hover:text-white transition-colors ml-1"
                style={{ color: likedSongIds.has(currentTrack.id) ? accentColor : undefined }}
                title={likedSongIds.has(currentTrack.id) ? 'Remove from Liked' : 'Save to Liked'}
              >
                <Heart className={`w-5 h-5 ${likedSongIds.has(currentTrack.id) ? 'fill-current' : ''}`} />
              </button>
            </>
          ) : (
            <span className="text-xs text-gray-500">No track selected</span>
          )}
        </div>

        {/* 2. Controls & Scrubber (Center) */}
        <div className="flex flex-col items-center gap-2 max-w-2xl w-2/4">
          <div className="flex items-center gap-5">
            {/* Shuffle */}
            <button
              onClick={() => setIsShuffle((prev) => !prev)}
              className={`p-1.5 transition-colors relative ${isShuffle ? 'text-teal-400' : 'text-gray-400 hover:text-white'}`}
              title={`Shuffle: ${isShuffle ? 'On' : 'Off'}`}
            >
              <Shuffle className="w-4 h-4" />
              {isShuffle && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal-400" />}
            </button>

            {/* Prev */}
            <button
              onClick={handlePrevTrack}
              className="p-1.5 text-gray-300 hover:text-white transition-transform active:scale-95"
              title="Previous"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full flex items-center justify-center text-black shadow-xl hover:scale-105 active:scale-95 transition-transform"
              style={{ backgroundColor: accentColor }}
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            {/* Next */}
            <button
              onClick={handleNextTrack}
              className="p-1.5 text-gray-300 hover:text-white transition-transform active:scale-95"
              title="Next"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>

            {/* Repeat */}
            <button
              onClick={() => {
                setRepeatMode((prev) => (prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off'));
              }}
              className={`p-1.5 transition-colors relative ${repeatMode !== 'off' ? 'text-teal-400' : 'text-gray-400 hover:text-white'}`}
              title={`Repeat: ${repeatMode}`}
            >
              {repeatMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
            </button>
          </div>

          {/* Scrubber Progress Bar */}
          <div className="w-full flex items-center gap-3 text-xs text-gray-400 font-mono">
            <span className="w-10 text-right">{formatTime(currentTime)}</span>
            <div className="relative flex-1 flex items-center group">
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                    backgroundColor: accentColor,
                  }}
                />
              </div>
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.5}
                value={currentTime || 0}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <span className="w-10">{formatTime(duration)}</span>
          </div>
        </div>

        {/* 3. Visualizer Canvas, Lyrics, Equalizer & Volume (Right) */}
        <div className="flex items-center justify-end gap-3 w-1/4 min-w-[200px]">
          {/* Live Frequency Spectrum Visualizer */}
          <canvas
            ref={visualizerCanvasRef}
            width={70}
            height={22}
            className="rounded opacity-80"
            title="Real-time Web Audio API spectrum"
          />

          {/* Synced Lyrics Toggle */}
          <button
            onClick={() => setShowLyrics((prev) => !prev)}
            className={`p-2 rounded-full transition-colors ${showLyrics ? 'text-teal-400 bg-white/10' : 'text-gray-400 hover:text-white'}`}
            title="Synced Lyrics (L)"
          >
            <Mic2 className="w-4 h-4" />
          </button>

          {/* Up Next Queue Toggle */}
          <button
            onClick={() => setShowQueue((prev) => !prev)}
            className={`p-2 rounded-full transition-colors ${showQueue ? 'text-teal-400 bg-white/10' : 'text-gray-400 hover:text-white'}`}
            title="Up Next Queue (Q)"
          >
            <ListMusic className="w-4 h-4" />
          </button>

          {/* 5-Band Equalizer Toggle */}
          <button
            onClick={() => setShowEqualizer(true)}
            className="p-2 rounded-full text-gray-400 hover:text-white transition-colors"
            title="5-Band Equalizer"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button onClick={toggleMute} className="text-gray-400 hover:text-white">
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : volume < 0.5 ? (
                <Volume1 className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-20"
            />
          </div>
        </div>
      </footer>

      {/* --- MOBILE FLOATING MINI PLAYER (md:hidden) --- */}
      {currentTrack && (
        <div
          onClick={() => setShowMobileNowPlaying(true)}
          className="md:hidden fixed bottom-[60px] inset-x-2 h-14 bg-[#09262f]/95 backdrop-blur-xl rounded-xl border border-teal-500/25 shadow-2xl flex items-center justify-between px-3 z-30 cursor-pointer overflow-hidden select-none"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
            <img src={currentTrack.coverUrl} alt={currentTrack.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 shadow" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate">{currentTrack.title}</span>
              <span className="text-[11px] text-teal-200/70 truncate">{currentTrack.artist}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(currentTrack.id);
              }}
              className="p-1 text-gray-400 hover:text-white"
              style={{ color: likedSongIds.has(currentTrack.id) ? accentColor : undefined }}
            >
              <Heart className={`w-5 h-5 ${likedSongIds.has(currentTrack.id) ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-black shadow-lg"
              style={{ backgroundColor: accentColor }}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
          </div>

          {/* Mini progress line */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/10">
            <div
              className="h-full"
              style={{
                width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                backgroundColor: accentColor,
              }}
            />
          </div>
        </div>
      )}

      {/* --- MOBILE BOTTOM NAVIGATION (md:hidden) --- */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 h-14 bg-[#030e12]/95 backdrop-blur-xl border-t border-teal-500/15 flex items-center justify-around z-40 select-none">
        <button
          onClick={() => setCurrentView({ type: 'home' })}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full ${
            currentView.type === 'home' ? 'text-teal-400 font-bold' : 'text-gray-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => setCurrentView({ type: 'search' })}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full ${
            currentView.type === 'search' ? 'text-teal-400 font-bold' : 'text-gray-400'
          }`}
        >
          <SearchIcon className="w-5 h-5" />
          <span className="text-[10px]">Search</span>
        </button>

        <button
          onClick={() => setCurrentView({ type: 'library' })}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full ${
            currentView.type === 'library' ? 'text-teal-400 font-bold' : 'text-gray-400'
          }`}
        >
          <Library className="w-5 h-5" />
          <span className="text-[10px]">Your Library</span>
        </button>
      </nav>

      {/* --- MODAL 1: SYNCED LRC LYRICS VIEW (L Key) --- */}
      {showLyrics && currentTrack && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#0a303a] via-[#06191f] to-[#020a0d] flex flex-col p-6 select-none animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 max-w-4xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold"
                style={{ backgroundColor: accentColor }}
              >
                <Mic2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Synced Lyrics</h2>
                <p className="text-xs text-teal-200/70">{currentTrack.title} • {currentTrack.artist}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <canvas ref={lyricsVisualizerCanvasRef} width={80} height={24} className="rounded" />
              <button
                onClick={() => setShowLyrics(false)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
                title="Close (L / Esc)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Lyrics Scroller */}
          <div className="flex-1 overflow-y-auto max-w-3xl mx-auto w-full py-8 text-center space-y-5">
            {parsedLyrics.length === 0 ? (
              <p className="text-gray-400 italic py-20">No synced lyrics available for this track.</p>
            ) : (
              parsedLyrics.map((line, idx) => {
                const isActive = idx === activeLyricIndex;
                return (
                  <p
                    key={idx}
                    ref={isActive ? activeLyricRef : null}
                    onClick={() => handleSeek(line.time)}
                    className={`cursor-pointer transition-all duration-300 py-1.5 px-4 rounded-xl ${
                      isActive
                        ? 'text-2xl sm:text-3xl font-black scale-105 drop-shadow-md'
                        : 'text-lg sm:text-xl font-medium text-gray-500 hover:text-gray-300'
                    }`}
                    style={{ color: isActive ? accentColor : undefined }}
                  >
                    {line.text}
                  </p>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* --- MODAL: SCANNABLE QR CODE & OFFLINE VAULT SETUP GUIDE --- */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 select-none animate-in fade-in duration-150">
          <div className="bg-[#09262f] border border-teal-500/30 rounded-2xl shadow-2xl w-full max-w-lg p-6 flex flex-col gap-4 text-center relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center gap-1 pt-1">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-black mb-1 shadow-lg"
                style={{ backgroundColor: accentColor }}
              >
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">Connect Phone & Play 100% Offline</h3>
              <p className="text-xs text-teal-200/70 max-w-sm">
                Follow these 4 simple steps to have the entire library on your phone forever, even with zero internet.
              </p>
            </div>

            {/* 4-Step Offline Walkthrough */}
            <div className="text-left bg-black/40 border border-teal-500/20 rounded-xl p-3 space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">1</span>
                <p className="text-gray-300">
                  <span className="text-white font-bold">Connect Phone:</span> Make sure your phone is connected to the same home Wi-Fi network.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">2</span>
                <p className="text-gray-300">
                  <span className="text-white font-bold">Scan QR:</span> Point your phone camera at the QR code below or open the URL in Chrome.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">3</span>
                <p className="text-gray-300">
                  <span className="text-white font-bold">Install Orbi App:</span> Tap the <span className="text-teal-300 font-semibold">"Install Orbi App"</span> button (or Chrome menu <span className="text-teal-300">⋮</span> &rarr; "Add to Home screen").
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">4</span>
                <p className="text-gray-300">
                  <span className="text-white font-bold">Save Offline Vault:</span> Tap <span className="text-teal-300 font-semibold">"Save All to Phone"</span>. Once finished, turn your laptop OFF and enjoy music anywhere!
                </p>
              </div>
            </div>

            {/* QR Code Display Container */}
            <div className="p-4 bg-black/50 border border-teal-500/25 rounded-2xl flex flex-col items-center justify-center shadow-inner">
              {(() => {
                const targetUrl = serverInfo.localUrl || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173');
                return (
                  <>
                    <div className="p-3 bg-[#06191f] rounded-xl border border-teal-500/30 shadow-2xl mb-3">
                      <img
                        src={`/api/qr-code?url=${encodeURIComponent(targetUrl)}`}
                        alt="QR Code"
                        className="w-44 h-44 object-contain"
                      />
                    </div>
                    <div className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-[#09262f] rounded-lg border border-teal-500/20">
                      <span className="font-mono text-xs text-teal-300 truncate max-w-[260px]">
                        {targetUrl}
                      </span>
                      <button
                        onClick={() => copyLink(targetUrl, 'local')}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-xs font-semibold flex-shrink-0"
                      >
                        {copiedType === 'local' ? <Check className="w-3 h-3 text-teal-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedType === 'local' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <a
                href="/orbi.apk"
                download="Orbi-Music.apk"
                className="flex-1 py-2 px-3 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Android APK</span>
              </a>
              <button
                onClick={() => setShowQrModal(false)}
                className="py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: 5-BAND GRAPHIC EQUALIZER MODAL --- */}
      {showEqualizer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 select-none">
          <div className="bg-[#09262f] border border-teal-500/25 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-teal-500/15">
              <div className="flex items-center gap-3">
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center text-black font-bold"
                  style={{ backgroundColor: accentColor }}
                >
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Graphic Equalizer</h3>
                  <p className="text-xs text-teal-200/70">Web Audio API 5-Band Filter</p>
                </div>
              </div>
              <button onClick={() => setShowEqualizer(false)} className="p-1 rounded-full text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Presets */}
            <div className="pt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300 block mb-2">Presets</span>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(EQ_PRESETS).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleEqPresetSelect(preset)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedEqPreset === preset
                        ? 'bg-teal-400 text-black shadow'
                        : 'bg-white/10 hover:bg-white/15 text-white'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* 5-Band Vertical Sliders */}
            <div className="py-8 flex justify-around items-end h-56 bg-black/30 rounded-xl my-4 px-4 border border-teal-500/10">
              {EQ_FREQUENCIES.map((freq, idx) => (
                <div key={freq} className="flex flex-col items-center gap-3 h-full justify-between">
                  <span className="text-xs font-mono text-teal-300 font-bold">{eqGains[idx] > 0 ? `+${eqGains[idx]}` : eqGains[idx]}dB</span>
                  <input
                    type="range"
                    min={-12}
                    max={12}
                    step={1}
                    value={eqGains[idx]}
                    onChange={(e) => handleEqBandChange(idx, e.target.value)}
                    className="h-32 [writing-mode:vertical-lr] [direction:rtl]"
                  />
                  <span className="text-[11px] font-mono text-gray-400">
                    {freq >= 1000 ? `${freq / 1000}k` : `${freq}`}Hz
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => handleEqPresetSelect('Flat')}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
              >
                Reset to Flat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: IN-APP TRACK EDITOR & REPLACE AUDIO --- */}
      {showEditModal && trackToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 select-none">
          <div className="bg-[#09262f] border border-teal-500/30 rounded-2xl shadow-2xl w-full max-w-lg p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-teal-500/15">
              <h3 className="text-lg font-bold text-white">Edit Song / Replace Audio</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updated = {
                  ...trackToEdit,
                  title: formData.get('title') || trackToEdit.title,
                  artist: formData.get('artist') || trackToEdit.artist,
                  album: formData.get('album') || trackToEdit.album,
                  genre: formData.get('genre') || trackToEdit.genre,
                  year: parseInt(formData.get('year'), 10) || trackToEdit.year,
                  coverUrl: formData.get('coverUrl') || trackToEdit.coverUrl,
                  lyrics: formData.get('lyrics') || trackToEdit.lyrics,
                };
                const audioFile = e.target.audioFile?.files?.[0];
                handleSaveTrackEdit(updated, audioFile);
              }}
              className="flex flex-col gap-3 text-xs"
            >
              <div>
                <label className="font-bold text-teal-300 block mb-1">Track Title</label>
                <input
                  name="title"
                  defaultValue={trackToEdit.title}
                  className="w-full bg-black/40 border border-teal-500/20 rounded px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-teal-300 block mb-1">Artist</label>
                  <input
                    name="artist"
                    defaultValue={trackToEdit.artist}
                    className="w-full bg-black/40 border border-teal-500/20 rounded px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-teal-300 block mb-1">Album</label>
                  <input
                    name="album"
                    defaultValue={trackToEdit.album}
                    className="w-full bg-black/40 border border-teal-500/20 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-teal-300 block mb-1">Attach / Replace Audio File (.mp3, .wav, .m4a)</label>
                <input
                  type="file"
                  name="audioFile"
                  accept="audio/*,.mp3,.wav,.m4a"
                  className="w-full text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-teal-500 file:text-black cursor-pointer"
                />
              </div>

              <div>
                <label className="font-bold text-teal-300 block mb-1">Cover Image URL</label>
                <input
                  name="coverUrl"
                  defaultValue={trackToEdit.coverUrl}
                  className="w-full bg-black/40 border border-teal-500/20 rounded px-3 py-2 text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-bold text-teal-300 block mb-1">Synced LRC Lyrics</label>
                <textarea
                  name="lyrics"
                  defaultValue={trackToEdit.lyrics}
                  rows={4}
                  className="w-full bg-black/40 border border-teal-500/20 rounded p-2 text-white font-mono text-[11px]"
                  placeholder="[00:05.00] Your lyric here..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 font-semibold text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg font-bold text-black"
                  style={{ backgroundColor: accentColor }}
                >
                  Save to IndexedDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 4: UP NEXT QUEUE DRAWER (Q Key) --- */}
      {showQueue && (
        <div className="fixed right-0 top-0 bottom-24 w-80 md:w-96 bg-[#06191f]/95 backdrop-blur-xl border-l border-teal-500/20 z-40 flex flex-col shadow-2xl p-4 select-none animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-teal-500/15">
            <div className="flex items-center gap-2">
              <ListMusic className="w-5 h-5 text-teal-400" />
              <h3 className="font-bold text-white">Up Next Queue</h3>
            </div>
            <button onClick={() => setShowQueue(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-3 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">Now Playing</span>
            {currentTrack && (
              <div className="flex items-center gap-3 p-2 bg-teal-500/15 rounded-lg border border-teal-500/20">
                <img src={currentTrack.coverUrl} alt={currentTrack.title} className="w-10 h-10 rounded object-cover" />
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-white text-xs truncate">{currentTrack.title}</span>
                  <span className="text-[11px] text-teal-200/70 truncate">{currentTrack.artist}</span>
                </div>
              </div>
            )}

            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 block pt-3">Next in Line</span>
            {queue.slice(queueIndex + 1).map((t, idx) => (
              <div
                key={`${t.id}-${idx}`}
                onClick={() => playTrack(t)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
              >
                <img src={t.coverUrl} alt={t.title} className="w-8 h-8 rounded object-cover" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-medium text-white text-xs truncate">{t.title}</span>
                  <span className="text-[10px] text-gray-400 truncate">{t.artist}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- MODAL 5: FULL-SCREEN MOBILE NOW PLAYING --- */}
      {showMobileNowPlaying && currentTrack && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#0c3843] via-[#06191f] to-[#020a0d] flex flex-col p-6 select-none animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between pb-4">
            <button onClick={() => setShowMobileNowPlaying(false)} className="p-2 text-gray-300 hover:text-white">
              <ChevronDown className="w-7 h-7" />
            </button>
            <div className="text-center flex-1 min-w-0 px-2">
              <span className="text-[10px] uppercase tracking-wider text-teal-300 font-bold block">Playing From</span>
              <span className="text-xs font-semibold text-white truncate block">{currentTrack.album || 'Single'}</span>
            </div>
            <div className="w-7" />
          </div>

          <div className="flex-1 flex items-center justify-center py-4">
            <div className="w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-teal-500/20">
              <img src={currentTrack.coverUrl} alt={currentTrack.title} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="min-w-0 flex-1 mr-4">
              <h2 className="text-2xl font-black text-white truncate">{currentTrack.title}</h2>
              <p className="text-sm text-teal-200/70 truncate mt-0.5">{currentTrack.artist}</p>
            </div>
            <button
              onClick={() => toggleLike(currentTrack.id)}
              className="p-2 text-gray-400 hover:text-white"
              style={{ color: likedSongIds.has(currentTrack.id) ? accentColor : undefined }}
            >
              <Heart className={`w-7 h-7 ${likedSongIds.has(currentTrack.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Progress */}
          <div className="py-2">
            <div className="relative flex items-center h-4 cursor-pointer">
              <div className="absolute inset-x-0 h-1.5 bg-[#0f3844] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                    backgroundColor: accentColor,
                  }}
                />
              </div>
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.5}
                value={currentTime || 0}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-xs text-teal-300/70 font-mono mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => setIsShuffle((prev) => !prev)}
              className={`p-2 ${isShuffle ? 'text-teal-400' : 'text-gray-400'}`}
            >
              <Shuffle className="w-5 h-5" />
            </button>

            <button onClick={handlePrevTrack} className="p-2 text-white">
              <SkipBack className="w-8 h-8 fill-current" />
            </button>

            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full flex items-center justify-center text-black shadow-2xl"
              style={{ backgroundColor: accentColor }}
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </button>

            <button onClick={handleNextTrack} className="p-2 text-white">
              <SkipForward className="w-8 h-8 fill-current" />
            </button>

            <button
              onClick={() => setRepeatMode((prev) => (prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off'))}
              className={`p-2 ${repeatMode !== 'off' ? 'text-teal-400' : 'text-gray-400'}`}
            >
              {repeatMode === 'one' ? <Repeat1 className="w-5 h-5" /> : <Repeat className="w-5 h-5" />}
            </button>
          </div>

          {/* Bottom quick icons */}
          <div className="flex items-center justify-around pt-2 border-t border-teal-500/15 text-gray-400">
            <button
              onClick={() => {
                setShowMobileNowPlaying(false);
                setShowLyrics(true);
              }}
              className="flex flex-col items-center gap-1 text-xs"
            >
              <Mic2 className="w-5 h-5" />
              <span className="text-[10px]">Lyrics</span>
            </button>

            <button
              onClick={() => {
                setShowMobileNowPlaying(false);
                setShowEqualizer(true);
              }}
              className="flex flex-col items-center gap-1 text-xs"
            >
              <Sliders className="w-5 h-5" />
              <span className="text-[10px]">Equalizer</span>
            </button>

            <button
              onClick={() => {
                setShowMobileNowPlaying(false);
                setShowQueue(true);
              }}
              className="flex flex-col items-center gap-1 text-xs"
            >
              <ListMusic className="w-5 h-5" />
              <span className="text-[10px]">Queue</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
