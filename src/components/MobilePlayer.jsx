import React, { useState } from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import MobileNowPlaying from './modals/MobileNowPlaying';

export default function MobilePlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    toggleFavorite,
    accentColor,
  } = usePlayer();

  const [isExpanded, setIsExpanded] = useState(false);

  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Floating Mini Player bar right above mobile navigation */}
      <div
        onClick={() => setIsExpanded(true)}
        className="md:hidden fixed bottom-[60px] inset-x-2 h-14 bg-[#09262f]/95 backdrop-blur-xl rounded-xl border border-teal-500/25 shadow-2xl flex items-center justify-between px-3 z-30 cursor-pointer overflow-hidden select-none"
      >
        {/* Track Thumbnail & Title */}
        <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
          <img
            src={currentTrack.coverArt}
            alt={currentTrack.title}
            className="w-10 h-10 rounded-lg object-cover flex-shrink-0 shadow border border-teal-500/20"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#f0fdfa] truncate">
              {currentTrack.title}
            </span>
            <span className="text-[11px] text-teal-200/70 truncate">
              {currentTrack.artist}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(currentTrack.id);
            }}
            className="p-1 text-gray-400 hover:text-white"
            style={{ color: currentTrack.isFavorite ? accentColor : undefined }}
          >
            <Heart className={`w-5 h-5 ${currentTrack.isFavorite ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-black shadow-lg"
            style={{ backgroundColor: accentColor }}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>
        </div>

        {/* Bottom 2px progress bar */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/10">
          <div
            className="h-full transition-all"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: accentColor,
            }}
          />
        </div>
      </div>

      {/* Expanded Full-Screen Mobile Player */}
      <MobileNowPlaying isOpen={isExpanded} onClose={() => setIsExpanded(false)} />
    </>
  );
}
