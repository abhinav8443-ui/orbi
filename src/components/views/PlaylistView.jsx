import React, { useMemo } from 'react';
import { Play, Shuffle, MoreHorizontal, Edit2, Trash2, Clock, Music } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import SongRow from '../common/SongRow';

function formatTotalTime(tracks) {
  const totalSecs = tracks.reduce((acc, t) => acc + (t.duration || 0), 0);
  const hours = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  if (hours > 0) return `${hours} hr ${mins} min`;
  return `${mins} min`;
}

export default function PlaylistView() {
  const {
    currentView,
    playlists,
    tracks,
    playTrack,
    deletePlaylist,
    setEditingPlaylist,
    accentColor,
  } = usePlayer();

  const playlistId = currentView.id;
  const playlist = playlists.find((p) => p.id === playlistId);

  // Tracks in this playlist
  const playlistTracks = useMemo(() => {
    if (!playlist || !playlist.trackIds) return [];
    return playlist.trackIds
      .map((id) => tracks.find((t) => t.id === id))
      .filter(Boolean);
  }, [playlist, tracks]);

  if (!playlist) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
        <Music className="w-12 h-12 mb-3 text-gray-500" />
        <h3 className="text-xl font-bold text-white">Playlist not found</h3>
      </div>
    );
  }

  const handlePlayAll = () => {
    if (playlistTracks.length > 0) {
      playTrack(playlistTracks[0], playlistTracks);
    }
  };

  const handleShufflePlay = () => {
    if (playlistTracks.length > 0) {
      const randomIdx = Math.floor(Math.random() * playlistTracks.length);
      playTrack(playlistTracks[randomIdx], playlistTracks);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto select-none">
      {/* 1. Giant Header Banner */}
      <div className="relative p-4 sm:p-8 pt-10 sm:pt-16 flex flex-col sm:flex-row items-center sm:items-end text-center sm:text-left gap-4 sm:gap-6 bg-gradient-to-b from-[#0f4d5c] via-[#092b34] to-[#06191f] border-b border-teal-500/15">
        <div 
          onClick={() => setEditingPlaylist(playlist)}
          className="relative group w-36 h-36 sm:w-56 sm:h-56 rounded-lg shadow-2xl overflow-hidden flex-shrink-0 cursor-pointer bg-black/40 border border-teal-500/20"
          title="Click to edit cover"
        >
          <img
            src={playlist.coverArt}
            alt={playlist.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-xs gap-1 transition-opacity">
            <Edit2 className="w-6 h-6" />
            <span>Choose photo</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 sm:gap-2 min-w-0 flex-1">
          <span className="text-xs uppercase tracking-wider font-bold text-teal-300/80">
            Playlist
          </span>

          <h1
            onClick={() => setEditingPlaylist(playlist)}
            className="text-2xl sm:text-5xl md:text-6xl font-black text-white tracking-tight cursor-pointer hover:underline line-clamp-2"
          >
            {playlist.name}
          </h1>

          {playlist.description && (
            <p className="text-xs sm:text-sm text-gray-300 mt-1 line-clamp-2">{playlist.description}</p>
          )}

          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-gray-300 mt-2 font-medium">
            <span className="text-white font-bold">Abhinav</span>
            <span>•</span>
            <span>{playlistTracks.length} songs</span>
            <span>•</span>
            <span className="text-gray-400">{formatTotalTime(playlistTracks)}</span>
          </div>
        </div>
      </div>

      {/* 2. Actions Row (Play, Shuffle, Edit, Delete) */}
      <div className="px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-center sm:justify-start gap-5 sm:gap-6">
        <button
          onClick={handlePlayAll}
          disabled={playlistTracks.length === 0}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-black shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: accentColor }}
          title="Play"
        >
          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" />
        </button>

        <button
          onClick={handleShufflePlay}
          disabled={playlistTracks.length === 0}
          className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          title="Shuffle Play"
        >
          <Shuffle className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={() => setEditingPlaylist(playlist)}
          className="text-gray-400 hover:text-white transition-colors"
          title="Edit Details"
        >
          <Edit2 className="w-5 h-5" />
        </button>

        <button
          onClick={() => {
            if (confirm(`Delete playlist "${playlist.name}"?`)) {
              deletePlaylist(playlist.id);
            }
          }}
          className="text-gray-400 hover:text-red-400 transition-colors"
          title="Delete Playlist"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* 3. Song Table */}
      <div className="px-3 sm:px-8 pb-12">
        {playlistTracks.length === 0 ? (
          <div className="py-16 text-center text-gray-400 bg-white/5 rounded-xl border border-white/5">
            <Music className="w-12 h-12 mx-auto mb-3 text-gray-500" />
            <h4 className="text-lg font-bold text-white mb-1">Let's find something for your playlist</h4>
            <p className="text-xs">Add songs from Search or your Library using the "..." song menu.</p>
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
              {playlistTracks.map((track, idx) => (
                <SongRow
                  key={track.id}
                  track={track}
                  index={idx}
                  playlistId={playlist.id}
                  queueList={playlistTracks}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
