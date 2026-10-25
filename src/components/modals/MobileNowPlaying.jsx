import React from 'react';
import { 
  ChevronDown, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Repeat1, 
  Heart, 
  Mic2, 
  ListMusic, 
  Sliders 
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function MobileNowPlaying({ isOpen, onClose }) {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    isShuffle,
    repeatMode,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    toggleShuffle,
    cycleRepeat,
    toggleFavorite,
    setShowLyrics,
    setShowQueue,
    setShowEqualizer,
    accentColor,
  } = usePlayer();

  if (!isOpen || !currentTrack) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#0c3843] via-[#06191f] to-[#020a0d] flex flex-col p-6 select-none animate-in slide-in-from-bottom duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4">
        <button
          onClick={onClose}
          className="p-2 -ml-2 text-gray-300 hover:text-white"
          title="Collapse"
        >
          <ChevronDown className="w-7 h-7" />
        </button>

        <div className="text-center flex-1 min-w-0 px-2">
          <span className="text-[10px] uppercase tracking-wider text-teal-300/80 font-bold block">
            Playing From
          </span>
          <span className="text-xs font-semibold text-white truncate block">
            {currentTrack.album || 'Single'}
          </span>
        </div>

        <div className="w-7" />
      </div>

      {/* Big Cover Art */}
      <div className="flex-1 flex items-center justify-center py-4">
        <div className="w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-teal-500/20">
          <img
            src={currentTrack.coverArt}
            alt={currentTrack.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Song Info & Heart */}
      <div className="flex items-center justify-between py-2">
        <div className="min-w-0 flex-1 mr-4">
          <h2 className="text-2xl font-bold text-white truncate">
            {currentTrack.title}
          </h2>
          <p className="text-base text-teal-200/70 truncate mt-0.5">
            {currentTrack.artist}
          </p>
        </div>

        <button
          onClick={() => toggleFavorite(currentTrack.id)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          style={{ color: currentTrack.isFavorite ? accentColor : undefined }}
        >
          <Heart className={`w-7 h-7 ${currentTrack.isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Scrubber Progress Bar */}
      <div className="py-2">
        <div className="relative flex items-center h-4 cursor-pointer">
          <div className="absolute inset-x-0 h-1.5 bg-[#0f3844] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${progressPercent}%`,
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
            onChange={(e) => seek(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        <div className="flex justify-between text-xs text-teal-300/70 font-mono mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Controls Row */}
      <div className="flex items-center justify-between py-4">
        <button
          onClick={toggleShuffle}
          className="p-2 text-gray-400 hover:text-white"
          style={{ color: isShuffle ? accentColor : undefined }}
        >
          <Shuffle className="w-5 h-5" />
        </button>

        <button
          onClick={prevTrack}
          className="p-2 text-white hover:scale-110 active:scale-95 transition-transform"
        >
          <SkipBack className="w-8 h-8 fill-current" />
        </button>

        <button
          onClick={togglePlay}
          className="w-16 h-16 rounded-full flex items-center justify-center text-black shadow-2xl hover:scale-105 active:scale-95 transition-transform"
          style={{ backgroundColor: accentColor }}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 fill-current" />
          ) : (
            <Play className="w-8 h-8 fill-current ml-1" />
          )}
        </button>

        <button
          onClick={nextTrack}
          className="p-2 text-white hover:scale-110 active:scale-95 transition-transform"
        >
          <SkipForward className="w-8 h-8 fill-current" />
        </button>

        <button
          onClick={cycleRepeat}
          className="p-2 text-gray-400 hover:text-white"
          style={{ color: repeatMode !== 'off' ? accentColor : undefined }}
        >
          {repeatMode === 'one' ? (
            <Repeat1 className="w-5 h-5" />
          ) : (
            <Repeat className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Quick Utilities (Lyrics, Queue, Equalizer) */}
      <div className="flex items-center justify-around pt-2 border-t border-teal-500/15 text-gray-400">
        <button
          onClick={() => {
            onClose();
            setShowLyrics(true);
          }}
          className="flex flex-col items-center gap-1 text-xs hover:text-white"
        >
          <Mic2 className="w-5 h-5" />
          <span className="text-[10px]">Lyrics</span>
        </button>

        <button
          onClick={() => {
            onClose();
            setShowQueue(true);
          }}
          className="flex flex-col items-center gap-1 text-xs hover:text-white"
        >
          <ListMusic className="w-5 h-5" />
          <span className="text-[10px]">Queue</span>
        </button>

        <button
          onClick={() => {
            onClose();
            setShowEqualizer(true);
          }}
          className="flex flex-col items-center gap-1 text-xs hover:text-white"
        >
          <Sliders className="w-5 h-5" />
          <span className="text-[10px]">Equalizer</span>
        </button>
      </div>
    </div>
  );
}
