import React from 'react';
import { X, Play, Music, ListMusic } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export default function QueueDrawer() {
  const {
    queue,
    queueIndex,
    currentTrack,
    playTrack,
    showQueue,
    setShowQueue,
    accentColor,
  } = usePlayer();

  if (!showQueue) return null;

  const upNext = queue.slice(queueIndex + 1);

  return (
    <div className="fixed right-0 top-0 bottom-0 md:bottom-24 w-full sm:w-80 md:w-96 bg-[#06191f]/95 backdrop-blur-xl border-l border-teal-500/20 z-50 md:z-40 flex flex-col shadow-2xl animate-in slide-in-from-right duration-200 select-none">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ListMusic className="w-5 h-5" style={{ color: accentColor }} />
          <h3 className="font-bold text-white text-base">Play Queue</h3>
        </div>
        <button
          onClick={() => setShowQueue(false)}
          className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Now Playing Section */}
        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
            Now Playing
          </span>
          {currentTrack ? (
            <div className="flex items-center gap-3 p-2 rounded-lg bg-white/10">
              <img
                src={currentTrack.coverArt}
                alt={currentTrack.title}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm text-white truncate" style={{ color: accentColor }}>
                  {currentTrack.title}
                </p>
                <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-500">Nothing playing</p>
          )}
        </div>

        {/* Up Next Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Next Up ({upNext.length})
            </span>
          </div>

          {upNext.length === 0 ? (
            <div className="p-4 rounded-lg bg-white/5 text-center text-xs text-gray-500 flex flex-col items-center gap-2">
              <Music className="w-6 h-6 text-gray-600" />
              <span>Queue is empty. Select songs to queue up next!</span>
            </div>
          ) : (
            <div className="space-y-1">
              {upNext.map((track, i) => (
                <div
                  key={`${track.id}-${i}`}
                  onClick={() => playTrack(track, queue)}
                  className="group flex items-center gap-3 p-2 rounded-md hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <span className="text-xs text-gray-500 w-4 text-center group-hover:hidden">
                    {i + 1}
                  </span>
                  <button className="hidden group-hover:flex w-4 text-white items-center justify-center">
                    <Play className="w-3 h-3 fill-current" />
                  </button>

                  <img
                    src={track.coverArt}
                    alt={track.title}
                    className="w-9 h-9 rounded object-cover flex-shrink-0"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs text-white truncate group-hover:text-white">
                      {track.title}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate">{track.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
