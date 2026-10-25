import React, { useEffect, useRef, useMemo } from 'react';
import { X, Edit3, Mic2, Music } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { parseLyrics } from '../../services/lrcParser';
import Visualizer from '../common/Visualizer';

export default function LyricsView() {
  const {
    currentTrack,
    currentTime,
    duration,
    seek,
    showLyrics,
    setShowLyrics,
    setEditingTrack,
    accentColor,
  } = usePlayer();

  const containerRef = useRef(null);
  const activeLineRef = useRef(null);

  // Parse lyrics with timestamps
  const parsedLyrics = useMemo(() => {
    if (!currentTrack || !currentTrack.lyrics) return [];
    return parseLyrics(currentTrack.lyrics, currentTrack.duration || 180);
  }, [currentTrack]);

  // Find active line index
  const activeIndex = useMemo(() => {
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
  }, [parsedLyrics, currentTime]);

  // Smooth auto-scroll active lyric line to center
  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeIndex]);

  if (!showLyrics) return null;

  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-b from-[#0a303a] via-[#06191f] to-[#020a0d] flex flex-col p-8 pt-6 select-none animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold"
            style={{ backgroundColor: accentColor }}
          >
            <Mic2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white leading-tight">Lyrics</h2>
            {currentTrack && (
              <p className="text-xs text-gray-400">
                {currentTrack.title} • {currentTrack.artist}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentTrack && (
            <button
              onClick={() => {
                setEditingTrack(currentTrack);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              title="Edit Lyrics & Timestamps"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Lyrics
            </button>
          )}

          <button
            onClick={() => setShowLyrics(false)}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title="Close Lyrics (L)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto w-full py-6 overflow-hidden">
        {/* Track Cover preview (hidden on small screens) */}
        {currentTrack && (
          <div className="hidden md:flex flex-col items-center gap-4 w-72 flex-shrink-0">
            <img
              src={currentTrack.coverArt || '/covers/yeat-up-2-me.jpg'}
              alt={currentTrack.title}
              className="w-64 h-64 rounded-2xl shadow-2xl object-cover ring-1 ring-teal-500/20"
            />
            <div className="text-center">
              <h3 className="font-bold text-lg text-white truncate max-w-[260px]">{currentTrack.title}</h3>
              <p className="text-sm text-gray-400 truncate max-w-[260px]">{currentTrack.artist}</p>
            </div>
            {/* Live Audio Visualizer */}
            <div className="pt-2">
              <Visualizer height={45} barCount={24} className="rounded-lg opacity-80" />
            </div>
          </div>
        )}

        {/* Scrollable Lyrics Column */}
        <div 
          ref={containerRef}
          className="flex-1 h-full overflow-y-auto px-4 py-12 flex flex-col items-start space-y-7"
        >
          {parsedLyrics.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full h-full text-center text-gray-500 gap-3">
              <Music className="w-12 h-12 stroke-[1.5]" />
              <p className="text-lg">No lyrics available for this song yet.</p>
              <button
                onClick={() => setEditingTrack(currentTrack)}
                className="text-xs px-4 py-2 rounded-full font-semibold text-black"
                style={{ backgroundColor: accentColor }}
              >
                Add Lyrics
              </button>
            </div>
          ) : (
            parsedLyrics.map((line, idx) => {
              const isActive = idx === activeIndex;
              const isPast = idx < activeIndex;

              return (
                <p
                  key={idx}
                  ref={isActive ? activeLineRef : null}
                  onClick={() => seek(line.time)}
                  className={`cursor-pointer transition-all duration-300 font-bold select-none ${
                    isActive
                      ? 'text-3xl md:text-4xl text-white scale-[1.02] filter drop-shadow'
                      : isPast
                      ? 'text-2xl text-white/40 hover:text-white/80'
                      : 'text-2xl text-white/20 hover:text-white/60'
                  }`}
                  style={{
                    color: isActive ? accentColor : undefined,
                  }}
                >
                  {line.text}
                </p>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
