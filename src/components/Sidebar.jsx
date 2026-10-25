import React, { useRef } from 'react';
import { 
  Home, 
  Search, 
  Library, 
  PlusSquare, 
  Heart, 
  Upload, 
  Music2, 
  Trash2, 
  Edit2,
  Folder
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function Sidebar() {
  const {
    currentView,
    navigate,
    playlists,
    createPlaylist,
    deletePlaylist,
    setEditingPlaylist,
    tracks,
    uploadFiles,
    accentColor,
  } = usePlayer();

  const fileInputRef = useRef(null);

  const handleCreateNewPlaylist = async () => {
    const pl = await createPlaylist(`My Playlist #${playlists.length + 1}`);
    setEditingPlaylist(pl);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(e.target.files);
      e.target.value = '';
    }
  };

  return (
    <aside className="hidden md:flex w-64 bg-transparent flex-col h-full flex-shrink-0 p-2 gap-2 select-none">
      {/* Hidden File Input for music uploads */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="audio/*,.mp3,.wav,.ogg,.flac,.m4a,.aac"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* Top Nav Box */}
      <div className="bg-[#06191f]/95 border border-teal-500/15 rounded-xl p-4 flex flex-col gap-4 shadow-lg">
        {/* Brand Header */}
        <div 
          onClick={() => navigate({ type: 'home' })}
          className="flex items-center gap-2 cursor-pointer group px-1"
        >
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-black shadow-md transition-transform group-hover:scale-105"
            style={{ backgroundColor: accentColor }}
          >
            <Music2 className="w-5 h-5 fill-current" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1">
            Orbi <span className="text-xs font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider bg-white/10 text-gray-300">Player</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1">
          <button
            onClick={() => navigate({ type: 'home' })}
            className={`flex items-center gap-4 px-3 py-2 rounded-md font-semibold text-sm transition-colors ${
              currentView.type === 'home'
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Home className="w-6 h-6" />
            Home
          </button>

          <button
            onClick={() => navigate({ type: 'search' })}
            className={`flex items-center gap-4 px-3 py-2 rounded-md font-semibold text-sm transition-colors ${
              currentView.type === 'search'
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Search className="w-6 h-6" />
            Search
          </button>

          <button
            onClick={() => navigate({ type: 'library' })}
            className={`flex items-center gap-4 px-3 py-2 rounded-md font-semibold text-sm transition-colors ${
              currentView.type === 'library'
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Library className="w-6 h-6" />
            Your Library
          </button>
        </nav>
      </div>

      {/* Main Library / Playlists Box */}
      <div className="bg-[#06191f]/95 border border-teal-500/15 rounded-xl flex-1 flex flex-col p-4 overflow-hidden shadow-lg">
        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pb-3 border-b border-white/10">
          <button
            onClick={handleCreateNewPlaylist}
            className="flex items-center gap-3 px-2 py-1.5 rounded-md text-sm font-semibold text-gray-300 hover:text-white transition-colors group"
          >
            <div className="w-6 h-6 rounded bg-white/20 group-hover:bg-white text-black flex items-center justify-center transition-colors">
              <PlusSquare className="w-4 h-4 text-white group-hover:text-black transition-colors" />
            </div>
            Create Playlist
          </button>

          <button
            onClick={() => navigate({ type: 'liked' })}
            className={`flex items-center gap-3 px-2 py-1.5 rounded-md text-sm font-semibold transition-colors group ${
              currentView.type === 'liked' ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-600 to-purple-400 flex items-center justify-center text-white shadow">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
            Liked Songs
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-3 px-2 py-1.5 rounded-md text-sm font-semibold text-gray-300 hover:text-white transition-colors group"
          >
            <div 
              className="w-6 h-6 rounded flex items-center justify-center text-black font-bold shadow transition-transform group-hover:scale-105"
              style={{ backgroundColor: accentColor }}
            >
              <Upload className="w-3.5 h-3.5" />
            </div>
            Upload Music
          </button>
        </div>

        {/* Playlist List Header */}
        <div className="flex items-center justify-between pt-3 pb-2 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <span>Playlists</span>
          <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">
            {playlists.length}
          </span>
        </div>

        {/* Scrollable Playlist Items */}
        <div className="flex-1 overflow-y-auto space-y-0.5 pr-1">
          {playlists.map((pl) => {
            const isActive = currentView.type === 'playlist' && currentView.id === pl.id;
            return (
              <div
                key={pl.id}
                onClick={() => navigate({ type: 'playlist', id: pl.id })}
                className={`group flex items-center justify-between px-2 py-2 rounded-md cursor-pointer transition-colors text-sm ${
                  isActive
                    ? 'bg-white/15 text-white font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={pl.coverArt || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&auto=format&fit=crop&q=80'}
                    alt={pl.name}
                    className="w-8 h-8 rounded object-cover flex-shrink-0"
                  />
                  <div className="truncate flex flex-col">
                    <span className="truncate">{pl.name}</span>
                    <span className="text-[11px] text-gray-500">
                      {pl.trackIds ? pl.trackIds.length : 0} songs
                    </span>
                  </div>
                </div>

                {/* Edit & Delete quick buttons on hover */}
                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingPlaylist(pl);
                    }}
                    className="p-1 hover:text-blue-400 text-gray-400"
                    title="Edit playlist"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete playlist "${pl.name}"?`)) {
                        deletePlaylist(pl.id);
                      }
                    }}
                    className="p-1 hover:text-red-400 text-gray-400"
                    title="Delete playlist"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Local Library Summary */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 px-1">
          <span className="flex items-center gap-1.5">
            <Folder className="w-3.5 h-3.5 text-gray-400" />
            {tracks.length} tracks
          </span>
          <span className="text-[11px] text-emerald-400 font-medium">Ready Offline</span>
        </div>
      </div>
    </aside>
  );
}
