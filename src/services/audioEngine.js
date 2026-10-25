// Web Audio API Engine with 5-Band Equalizer, Live Spectrum Analyser, and MediaSession integration

const EQ_FREQUENCIES = [60, 250, 1000, 4000, 16000];

export const EQ_PRESETS = {
  Flat: [0, 0, 0, 0, 0],
  'Bass Boost': [8, 5, 1, -1, -2],
  'Treble Boost': [-3, -1, 0, 5, 8],
  Electronic: [6, 4, -1, 3, 6],
  Rock: [5, 3, -1, 4, 6],
  Acoustic: [3, 2, 0, 3, 4],
  'Vocal Boost': [-3, 1, 6, 4, -1],
  Chill: [4, 2, -1, 2, 1],
};

// Procedural WAV fallback generator for offline or restricted networks
const fallbackCache = new Map();

async function generateFallbackAudio(seedStr = 'track') {
  if (fallbackCache.has(seedStr)) {
    return fallbackCache.get(seedStr);
  }

  const sampleRate = 22050;
  const duration = 90; // 90 seconds loop
  const totalSamples = sampleRate * duration;
  const OfflineCtxClass = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  if (!OfflineCtxClass) return null;

  const offlineCtx = new OfflineCtxClass(2, totalSamples, sampleRate);

  // Compute seed number
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed + seedStr.charCodeAt(i) * 17) % 1000;
  }

  // Chord progression (root frequencies)
  const progressions = [
    [130.81, 164.81, 196.00, 246.94], // Cmaj7
    [110.00, 130.81, 164.81, 196.00], // Am7
    [146.83, 174.61, 220.00, 261.63], // Dm7
    [196.00, 246.94, 293.66, 349.23], // G7
  ];

  const chordDuration = 4; // 4 seconds per chord
  const numChords = Math.ceil(duration / chordDuration);

  for (let c = 0; c < numChords; c++) {
    const chord = progressions[(c + seed) % progressions.length];
    const startTime = c * chordDuration;

    chord.forEach((freq, noteIdx) => {
      // Warm pad oscillator
      const osc = offlineCtx.createOscillator();
      const gain = offlineCtx.createGain();

      osc.type = noteIdx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      // Soft envelope
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.08, startTime + 1.2);
      gain.gain.setValueAtTime(0.08, startTime + chordDuration - 1.2);
      gain.gain.linearRampToValueAtTime(0, startTime + chordDuration);

      osc.connect(gain);
      gain.connect(offlineCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + chordDuration);
    });
  }

  const renderedBuffer = await offlineCtx.startRendering();
  const blob = audioBufferToWav(renderedBuffer);
  fallbackCache.set(seedStr, blob);
  return blob;
}

function audioBufferToWav(buffer) {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const bitDepth = 16;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const length = buffer.length;
  const dataSize = length * blockAlign;
  const headerSize = 44;
  const arrayBuffer = new ArrayBuffer(headerSize + dataSize);
  const view = new DataView(arrayBuffer);

  function writeString(offset, str) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  let offset = 44;
  const channels = [];
  for (let i = 0; i < numChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }

  for (let i = 0; i < length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      let sample = channels[ch][i];
      sample = Math.max(-1, Math.min(1, sample));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

class AudioEngine {
  constructor() {
    this.audio = new Audio();
    this.audio.crossOrigin = 'anonymous';
    this.audio.preload = 'auto';

    this.audioCtx = null;
    this.sourceNode = null;
    this.analyser = null;
    this.gainNode = null;
    this.eqFilters = [];
    this.currentPreset = 'Flat';
    this.currentGains = [0, 0, 0, 0, 0];
    this.isInitialized = false;

    // Track state
    this.currentTrack = null;
    this.isPlaying = false;
  }

  initAudioContext() {
    if (this.isInitialized) return;

    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) return;

      this.audioCtx = new AudioCtxClass();

      // Master Gain
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.value = this.audio.volume;

      // Analyser Node for Visualizers
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 128;
      this.analyser.smoothingTimeConstant = 0.8;

      // 5-band EQ filters
      this.eqFilters = EQ_FREQUENCIES.map((freq, index) => {
        const filter = this.audioCtx.createBiquadFilter();
        if (index === 0) {
          filter.type = 'lowshelf';
        } else if (index === EQ_FREQUENCIES.length - 1) {
          filter.type = 'highshelf';
        } else {
          filter.type = 'peaking';
          filter.Q.value = 1.0;
        }
        filter.frequency.value = freq;
        filter.gain.value = this.currentGains[index] || 0;
        return filter;
      });

      // Connect HTMLAudioElement -> SourceNode
      try {
        this.sourceNode = this.audioCtx.createMediaElementSource(this.audio);

        let currentNode = this.sourceNode;
        this.eqFilters.forEach(filter => {
          currentNode.connect(filter);
          currentNode = filter;
        });

        currentNode.connect(this.gainNode);
        this.gainNode.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
      } catch (e) {
        console.warn('MediaElementSource connection note:', e);
      }

      this.isInitialized = true;
    } catch (e) {
      console.warn('AudioContext init error:', e);
    }
  }

  async resumeContext() {
    this.initAudioContext();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }
  }

  loadTrack(track, autoPlay = true) {
    this.currentTrack = track;
    this.resumeContext();

    const src = track.audioUrl || (track.audioBlob ? URL.createObjectURL(track.audioBlob) : '');

    // Setup fallback error handler
    this.audio.onerror = async () => {
      console.warn(`Audio loading notice for "${track.title}". Activating smooth synthesized procedural track...`);
      try {
        const fallbackBlob = await generateFallbackAudio(track.id || track.title);
        if (fallbackBlob) {
          this.audio.src = URL.createObjectURL(fallbackBlob);
          if (autoPlay || this.isPlaying) {
            this.audio.play().catch(() => {});
          }
        }
      } catch (err) {
        console.warn('Fallback error:', err);
      }
    };

    if (this.audio.src !== src) {
      this.audio.src = src;
    }

    this.updateMediaSession(track);

    if (autoPlay) {
      this.play();
    }
  }

  async play() {
    await this.resumeContext();
    try {
      await this.audio.play();
      this.isPlaying = true;
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
      }
    } catch (err) {
      console.warn('Playback notice:', err);
    }
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'paused';
    }
  }

  seek(seconds) {
    if (isFinite(seconds) && this.audio.duration) {
      const clamped = Math.max(0, Math.min(seconds, this.audio.duration));
      this.audio.currentTime = clamped;
    }
  }

  setVolume(volume) {
    const val = Math.max(0, Math.min(1, volume));
    this.audio.volume = val;
    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(val, this.audioCtx ? this.audioCtx.currentTime : 0);
    }
  }

  setMuted(muted) {
    this.audio.muted = muted;
  }

  setEqPreset(presetName) {
    if (EQ_PRESETS[presetName]) {
      this.currentPreset = presetName;
      this.currentGains = [...EQ_PRESETS[presetName]];
      this.applyEqGains();
    }
  }

  setEqBand(bandIndex, gainValue) {
    if (bandIndex >= 0 && bandIndex < this.eqFilters.length) {
      this.currentGains[bandIndex] = gainValue;
      this.currentPreset = 'Custom';
      if (this.eqFilters[bandIndex] && this.audioCtx) {
        this.eqFilters[bandIndex].gain.setValueAtTime(gainValue, this.audioCtx.currentTime);
      }
    }
  }

  applyEqGains() {
    if (!this.eqFilters.length || !this.audioCtx) return;
    this.eqFilters.forEach((filter, idx) => {
      const gain = this.currentGains[idx] || 0;
      filter.gain.setValueAtTime(gain, this.audioCtx.currentTime);
    });
  }

  getFrequencyData() {
    if (!this.analyser) {
      return new Uint8Array(32);
    }
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  updateMediaSession(track) {
    if (!('mediaSession' in navigator) || !track) return;

    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title || 'Unknown Title',
        artist: track.artist || 'Unknown Artist',
        album: track.album || 'Orbi Music',
        artwork: track.coverArt
          ? [
              { src: track.coverArt, sizes: '96x96', type: 'image/jpeg' },
              { src: track.coverArt, sizes: '128x128', type: 'image/jpeg' },
              { src: track.coverArt, sizes: '256x256', type: 'image/jpeg' },
              { src: track.coverArt, sizes: '512x512', type: 'image/jpeg' },
            ]
          : [],
      });
    } catch (e) {
      console.warn('MediaSession metadata notice:', e);
    }
  }
}

export const audioEngine = new AudioEngine();
