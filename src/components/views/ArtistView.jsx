import React, { useMemo } from 'react';
import { Play, CheckCircle2, Clock } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import SongRow from '../common/SongRow';

export default function ArtistView() {
  const { currentView, tracks, playTrack, accentColor } = usePlayer();
  const artistName = currentView.name || 'Unknown Artist';

  const artistTracks = useMemo(() => {
    return tracks.filter(
      (t) => t.artist && t.artist.toLowerCase() === artistName.toLowerCase()
    );
  }, [tracks, artistName]);

  const artistCover = artistTracks[0]?.coverArt || '/covers/yeat-up-2-me.jpg';

  const handlePlayAll = () => {
    if (artistTracks.length > 0) {
      playTrack(artistTracks[0], artistTracks);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto select-none">
      {/* 1. Artist Hero Banner */}
      <div 
        className="relative h-56 sm:h-72 p-4 sm:p-8 flex flex-col justify-end bg-cover bg-center border-b border-teal-500/15"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(6,25,31,0.2), rgba(6,25,31,0.95)), url(${artistCover})`,
        }}
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-300/90 mb-2">
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 fill-current" />
          <span>Verified Artist</span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight">
          {artistName}
        </h1>

        <p className="text-xs text-teal-200/70 mt-1 sm:mt-2">
          {artistTracks.length} songs available
        </p>
      </div>

      {/* 2. Action Controls */}
      <div className="px-4 sm:px-8 py-4 sm:py-5 flex items-center gap-6">
        <button
          onClick={handlePlayAll}
          disabled={artistTracks.length === 0}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-black shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          style={{ backgroundColor: accentColor }}
          title={`Play ${artistName}`}
        >
          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" />
        </button>
      </div>

      {/* 3. Popular Tracks */}
      <div className="px-3 sm:px-8 pb-12">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 px-1">Popular</h3>

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
          {artistTracks.map((track, idx) => (
            <SongRow
              key={track.id}
              track={track}
              index={idx}
              queueList={artistTracks}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
