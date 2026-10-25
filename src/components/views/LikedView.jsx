import React, { useMemo } from 'react';
import { Play, Shuffle, Heart, Clock, Music } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import SongRow from '../common/SongRow';

function formatTotalTime(tracks) {
  const totalSecs = tracks.reduce((acc, t) => acc + (t.duration || 0), 0);
  const hours = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  if (hours > 0) return `${hours} hr ${mins} min`;
  return `${mins} min`;
}

export default function LikedView() {
  const { tracks, playTrack, accentColor } = usePlayer();

  const likedTracks = useMemo(() => {
    return tracks.filter((t) => t.isFavorite);
  }, [tracks]);

  const handlePlayAll = () => {
    if (likedTracks.length > 0) {
      playTrack(likedTracks[0], likedTracks);
    }
  };

  const handleShufflePlay = () => {
    if (likedTracks.length > 0) {
      const randomIdx = Math.floor(Math.random() * likedTracks.length);
      playTrack(likedTracks[randomIdx], likedTracks);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto select-none">
      {/* 1. Spotify Liked Songs Gradient Banner */}
      <div className="relative p-4 sm:p-8 pt-10 sm:pt-16 flex flex-col sm:flex-row items-center sm:items-end text-center sm:text-left gap-4 sm:gap-6 bg-gradient-to-b from-teal-800 via-[#06191f] to-[#030e12] border-b border-teal-500/15">
        <div className="w-36 h-36 sm:w-56 sm:h-56 rounded-lg shadow-2xl bg-gradient-to-br from-teal-600 to-cyan-500 flex items-center justify-center flex-shrink-0 text-white border border-teal-400/20">
          <Heart className="w-16 h-16 sm:w-24 sm:h-24 fill-current drop-shadow-md" />
        </div>

        <div className="flex flex-col gap-1.5 sm:gap-2 min-w-0 flex-1">
          <span className="text-xs uppercase tracking-wider font-bold text-teal-300/80">
            Playlist
          </span>

          <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight">
            Liked Songs
          </h1>

          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-gray-300 mt-2 font-medium">
            <span className="text-white font-bold">Abhinav</span>
            <span>•</span>
            <span>{likedTracks.length} songs</span>
            {likedTracks.length > 0 && (
              <>
                <span>•</span>
                <span className="text-gray-400">{formatTotalTime(likedTracks)}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. Actions Row */}
      <div className="px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-center sm:justify-start gap-5 sm:gap-6">
        <button
          onClick={handlePlayAll}
          disabled={likedTracks.length === 0}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-black shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: accentColor }}
          title="Play Liked Songs"
        >
          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" />
        </button>

        <button
          onClick={handleShufflePlay}
          disabled={likedTracks.length === 0}
          className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          title="Shuffle Play"
        >
          <Shuffle className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* 3. Songs Table */}
      <div className="px-3 sm:px-8 pb-12">
        {likedTracks.length === 0 ? (
          <div className="py-16 text-center text-gray-400 bg-white/5 rounded-xl border border-white/5">
            <Heart className="w-12 h-12 mx-auto mb-3 text-gray-500" />
            <h4 className="text-lg font-bold text-white mb-1">Songs you like will appear here</h4>
            <p className="text-xs">Save songs by tapping the heart icon on any track row.</p>
          </div>
        ) : (
          <div>
            <div className="hidden md:grid grid-cols-[16px_4fr_2fr_2fr_minmax(120px,1fr)] gap-4 px-4 py-2 border-b border-white/10 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              <span>#</span>
              <span>Title</span>
              <span className="hidden md:block">Album</span>
              <span className="hidden lg:block">Date Added</span>
              <span className="flex items-center justify-end gap-1">
                <Clock className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-0.5">
              {likedTracks.map((track, idx) => (
                <SongRow
                  key={track.id}
                  track={track}
                  index={idx}
                  queueList={likedTracks}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
