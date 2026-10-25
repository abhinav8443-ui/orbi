import React, { useState, useMemo } from 'react';
import { LayoutGrid, List, Plus, Search, Folder, Heart } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import SongRow from '../common/SongRow';

export default function LibraryView() {
  const {
    tracks,
    playlists,
    createPlaylist,
    navigate,
    setEditingPlaylist,
    accentColor,
  } = usePlayer();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'playlists' | 'artists' | 'local'
  const [isGrid, setIsGrid] = useState(true);
  const [filterQuery, setFilterQuery] = useState('');

  // Extract unique artists
  const artists = useMemo(() => {
    const map = new Map();
    tracks.forEach((t) => {
      const art = t.artist || 'Unknown';
      if (!map.has(art)) {
        map.set(art, { name: art, count: 1, coverArt: t.coverArt });
      } else {
        map.get(art).count++;
      }
    });
    return Array.from(map.values());
  }, [tracks]);

  // Local tracks
  const localTracks = useMemo(() => {
    return tracks.filter((t) => t.isCustom);
  }, [tracks]);

  const handleCreatePlaylist = async () => {
    const pl = await createPlaylist(`My Playlist #${playlists.length + 1}`);
    setEditingPlaylist(pl);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 space-y-5 md:space-y-6 select-none">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Your Library</h1>
          <p className="text-xs text-teal-200/60 mt-1">
            {tracks.length} tracks • {playlists.length} playlists • {artists.length} artists
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Create Playlist Button */}
          <button
            onClick={handleCreatePlaylist}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-400 text-black font-bold text-xs hover:scale-105 transition-transform shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Create Playlist</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#09262f] p-1 rounded-full border border-teal-500/20">
            <button
              onClick={() => setIsGrid(true)}
              className={`p-1.5 rounded-full transition-colors ${
                isGrid ? 'bg-teal-500/30 text-teal-200' : 'text-gray-400 hover:text-white'
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsGrid(false)}
              className={`p-1.5 rounded-full transition-colors ${
                !isGrid ? 'bg-teal-500/30 text-teal-200' : 'text-gray-400 hover:text-white'
              }`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {['all', 'playlists', 'artists', 'local'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${
              activeFilter === filter
                ? 'bg-teal-400 text-black'
                : 'bg-[#09262f] hover:bg-[#0f3844] text-teal-200 border border-teal-500/20'
            }`}
          >
            {filter === 'local' ? 'Downloaded / Local' : filter}
          </button>
        ))}
      </div>

      {/* Content depending on activeFilter */}
      {/* 1. Playlists Filter */}
      {(activeFilter === 'all' || activeFilter === 'playlists') && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-[#f0fdfa]">Playlists</h3>
          </div>

          <div className={isGrid ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4' : 'space-y-1'}>
            {/* Liked Songs Card */}
            <div
              onClick={() => navigate({ type: 'liked' })}
              className={`group cursor-pointer rounded-xl bg-gradient-to-br from-teal-700 via-teal-900 to-cyan-950 p-4 flex flex-col justify-between border border-teal-400/20 shadow-lg ${
                isGrid ? 'h-52' : 'h-16 flex-row items-center'
              }`}
            >
              <Heart className="w-8 h-8 text-white fill-current" />
              <div>
                <h4 className="font-bold text-base text-white">Liked Songs</h4>
                <p className="text-xs text-white/80">
                  {tracks.filter((t) => t.isFavorite).length} liked tracks
                </p>
              </div>
            </div>

            {/* Custom Playlists */}
            {playlists.map((pl) => (
              <div
                key={pl.id}
                onClick={() => navigate({ type: 'playlist', id: pl.id })}
                className={`p-3 bg-[#09262f]/60 hover:bg-[#0f3844] rounded-xl border border-teal-500/15 cursor-pointer transition-all group ${
                  isGrid ? '' : 'flex items-center gap-3'
                }`}
              >
                <img
                  src={pl.coverArt}
                  alt={pl.name}
                  className={`object-cover rounded-md shadow ${
                    isGrid ? 'w-full aspect-square mb-3' : 'w-12 h-12 flex-shrink-0'
                  }`}
                />
                <div className="truncate flex-1">
                  <h4 className="font-bold text-sm text-[#f0fdfa] truncate">{pl.name}</h4>
                  <p className="text-xs text-teal-200/60 truncate mt-0.5">
                    Playlist • {pl.trackIds ? pl.trackIds.length : 0} songs
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. Artists Filter */}
      {(activeFilter === 'all' || activeFilter === 'artists') && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-[#f0fdfa]">Artists</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {artists.map((art) => (
              <div
                key={art.name}
                onClick={() => navigate({ type: 'artist', name: art.name })}
                className="p-3 bg-[#09262f]/60 hover:bg-[#0f3844] rounded-xl border border-teal-500/15 cursor-pointer transition-all flex flex-col items-center text-center group"
              >
                <img
                  src={art.coverArt}
                  alt={art.name}
                  className="w-24 h-24 rounded-full object-cover shadow-lg mb-3 border border-teal-500/20"
                />
                <h4 className="font-bold text-sm text-[#f0fdfa] truncate w-full">{art.name}</h4>
                <p className="text-xs text-teal-200/60 mt-1">{art.count} songs</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Local Music Filter */}
      {(activeFilter === 'all' || activeFilter === 'local') && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-white">
              Local Uploaded Music ({localTracks.length})
            </h3>
          </div>

          {localTracks.length === 0 ? (
            <div className="p-8 rounded-xl bg-white/5 border border-white/5 text-center text-gray-400">
              <Folder className="w-10 h-10 mx-auto mb-2 text-gray-500" />
              <p className="font-medium text-white mb-1">No local tracks uploaded yet</p>
              <p className="text-xs">Drag and drop any MP3 / audio file into the player to save it offline!</p>
            </div>
          ) : (
            <div className="space-y-0.5">
              {localTracks.map((track, idx) => (
                <SongRow
                  key={track.id}
                  track={track}
                  index={idx}
                  queueList={localTracks}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
