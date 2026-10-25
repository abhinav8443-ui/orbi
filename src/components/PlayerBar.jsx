import React from 'react';
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
  Maximize2
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function PlayerBar() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeat,
    toggleFavorite,
    showLyrics,
    setShowLyrics,
    showQueue,
    setShowQueue,
    showEqualizer,
    setShowEqualizer,
    accentColor,
    navigate,
  } = usePlayer();

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercent = isMuted ? 0 : volume * 100;

  const handleSeekChange = (e) => {
    seek(Number(e.target.value));
  };

  const handleVolumeChange = (e) => {
    setVolume(Number(e.target.value));
  };

  return (
    <footer className="hidden md:flex h-24 bg-[#030e12]/95 border-t border-teal-500/20 backdrop-blur-xl px-4 items-center justify-between select-none z-50 shadow-2xl">
      {/* 1. Left Track Information */}
      <div className="flex items-center gap-3 w-1/4 min-w-[180px]">
        {currentTrack ? (
          <>
            <div 
              className="relative group cursor-pointer"
              onClick={() => setShowLyrics(prev => !prev)}
            >
              <img
                src={currentTrack.coverArt || '/covers/yeat-up-2-me.jpg'}
                alt={currentTrack.title}
                className="w-14 h-14 rounded-lg object-cover shadow-lg border border-teal-500/20"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded transition-opacity">
                <Maximize2 className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <span
                onClick={() => setShowLyrics(prev => !prev)}
                className="text-sm font-semibold text-white truncate cursor-pointer hover:underline"
              >
                {currentTrack.title}
              </span>
              <span
                onClick={() => navigate({ type: 'artist', name: currentTrack.artist })}
                className="text-xs text-gray-400 truncate cursor-pointer hover:underline hover:text-white"
              >
                {currentTrack.artist}
              </span>
            </div>

            <button
              onClick={() => toggleFavorite(currentTrack.id)}
              className="p-1 text-gray-400 hover:text-white transition-colors ml-1"
              style={{ color: currentTrack.isFavorite ? accentColor : undefined }}
              title={currentTrack.isFavorite ? 'Remove from Liked Songs' : 'Save to Liked Songs'}
            >
              <Heart className={`w-5 h-5 ${currentTrack.isFavorite ? 'fill-current' : ''}`} />
            </button>
          </>
        ) : (
          <div className="text-xs text-gray-500">No track selected</div>
        )}
      </div>

      {/* 2. Center Controls & Timeline */}
      <div className="flex flex-col items-center gap-2 max-w-2xl w-2/4">
        {/* Buttons Row */}
        <div className="flex items-center gap-5">
          {/* Shuffle Button */}
          <button
            onClick={toggleShuffle}
            className={`transition-colors relative p-1 ${
              isShuffle ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
            style={{ color: isShuffle ? accentColor : undefined }}
            title={`Shuffle: ${isShuffle ? 'On' : 'Off'}`}
          >
            <Shuffle className="w-4 h-4" />
            {isShuffle && (
              <span 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            )}
          </button>

          {/* Previous Track */}
          <button
            onClick={prevTrack}
            className="text-gray-400 hover:text-white transition-colors"
            title="Previous (Ctrl+Left)"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          {/* Play / Pause Main Button */}
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-white hover:scale-105 flex items-center justify-center text-black shadow-lg transition-transform"
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Next Track */}
          <button
            onClick={nextTrack}
            className="text-gray-400 hover:text-white transition-colors"
            title="Next (Ctrl+Right)"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>

          {/* Repeat Button */}
          <button
            onClick={cycleRepeat}
            className={`transition-colors relative p-1 ${
              repeatMode !== 'off' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
            style={{ color: repeatMode !== 'off' ? accentColor : undefined }}
            title={`Repeat: ${repeatMode}`}
          >
            {repeatMode === 'one' ? (
              <Repeat1 className="w-4 h-4" />
            ) : (
              <Repeat className="w-4 h-4" />
            )}
            {repeatMode !== 'off' && (
              <span 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            )}
          </button>
        </div>

        {/* Progress Bar Row */}
        <div className="w-full flex items-center gap-2 text-xs text-gray-400 font-mono">
          <span className="w-10 text-right">{formatTime(currentTime)}</span>

          <div className="relative flex-1 group flex items-center h-4 cursor-pointer">
            {/* Background Track */}
            <div className="absolute inset-x-0 h-1 bg-[#4d4d4d] rounded-full overflow-hidden">
              {/* Filled Track */}
              <div
                className="h-full rounded-full transition-all group-hover:brightness-110"
                style={{
                  width: `${progressPercent}%`,
                  backgroundColor: accentColor,
                }}
              />
            </div>

            {/* Native range input overlay */}
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.5}
              value={currentTime || 0}
              onChange={handleSeekChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          <span className="w-10 text-left">{formatTime(duration)}</span>
        </div>
      </div>

      {/* 3. Right Utilities: Lyrics, Queue, EQ, Volume */}
      <div className="flex items-center justify-end gap-3 w-1/4 min-w-[180px]">
        {/* Lyrics Button */}
        <button
          onClick={() => setShowLyrics(prev => !prev)}
          className={`p-1.5 transition-colors ${
            showLyrics ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
          style={{ color: showLyrics ? accentColor : undefined }}
          title="Synced Lyrics (L)"
        >
          <Mic2 className="w-4 h-4" />
        </button>

        {/* Queue Button */}
        <button
          onClick={() => setShowQueue(prev => !prev)}
          className={`p-1.5 transition-colors ${
            showQueue ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
          style={{ color: showQueue ? accentColor : undefined }}
          title="Queue (Q)"
        >
          <ListMusic className="w-4 h-4" />
        </button>

        {/* EQ Button */}
        <button
          onClick={() => setShowEqualizer(prev => !prev)}
          className={`p-1.5 transition-colors ${
            showEqualizer ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
          style={{ color: showEqualizer ? accentColor : undefined }}
          title="Audio Equalizer"
        >
          <Sliders className="w-4 h-4" />
        </button>

        {/* Volume Control */}
        <div className="flex items-center gap-2 group w-28">
          <button
            onClick={toggleMute}
            className="text-gray-400 hover:text-white transition-colors"
            title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5 text-red-400" />
            ) : volume < 0.5 ? (
              <Volume1 className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>

          <div className="relative flex-1 flex items-center h-3 cursor-pointer">
            <div className="absolute inset-x-0 h-1 bg-[#4d4d4d] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all group-hover:brightness-110"
                style={{
                  width: `${volumePercent}%`,
                  backgroundColor: isMuted ? '#888' : accentColor,
                }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
