import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Heart, MoreHorizontal, Plus, Edit3, Trash2, ListPlus } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return '';
  }
}

export default function SongRow({ track, index, playlistId = null, queueList = null }) {
  const {
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
    toggleFavorite,
    deleteTrack,
    playlists,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    setEditingTrack,
    navigate,
    accentColor,
  } = usePlayer();

  const [showMenu, setShowMenu] = useState(false);
  const [showPlaylistsSubmenu, setShowPlaylistsSubmenu] = useState(false);
  const menuRef = useRef(null);

  const isCurrent = currentTrack && currentTrack.id === track.id;
  const isRowPlaying = isCurrent && isPlaying;

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
        setShowPlaylistsSubmenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  const handleRowClick = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack(track, queueList);
    }
  };

  return (
    <div
      onClick={handleRowClick}
      className={`group relative flex items-center justify-between md:grid md:grid-cols-[16px_4fr_2fr_2fr_minmax(120px,1fr)] gap-3 md:gap-4 px-3 md:px-4 py-2.5 md:py-2 rounded-lg md:rounded-md hover:bg-white/10 active:bg-white/15 transition-colors text-sm text-gray-400 select-none cursor-pointer ${
        isCurrent ? 'bg-teal-500/10' : ''
      }`}
    >
      {/* 1. Track Number or Play/Pause Button */}
      <div className="hidden md:flex items-center justify-center w-4 h-8 flex-shrink-0">
        <span className="group-hover:hidden">
          {isRowPlaying ? (
            <div className="flex items-end gap-[2px] h-3">
              <span className="playing-bar" style={{ backgroundColor: accentColor }}></span>
              <span className="playing-bar" style={{ backgroundColor: accentColor }}></span>
              <span className="playing-bar" style={{ backgroundColor: accentColor }}></span>
            </div>
          ) : (
            <span className={isCurrent ? 'font-medium' : ''} style={{ color: isCurrent ? accentColor : undefined }}>
              {index + 1}
            </span>
          )}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRowClick();
          }}
          className="hidden group-hover:flex items-center justify-center text-white hover:scale-110 transition-transform"
        >
          {isRowPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
        </button>
      </div>

      {/* 2. Title & Artist */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="relative flex-shrink-0">
          <img
            src={track.coverArt || '/covers/yeat-up-2-me.jpg'}
            alt={track.title}
            className="w-11 h-11 md:w-10 md:h-10 rounded-md object-cover shadow border border-teal-500/15"
          />
          {isRowPlaying && (
            <div className="md:hidden absolute inset-0 bg-black/40 rounded-md flex items-center justify-center">
              <div className="flex items-end gap-[2px] h-3">
                <span className="playing-bar" style={{ backgroundColor: accentColor }}></span>
                <span className="playing-bar" style={{ backgroundColor: accentColor }}></span>
                <span className="playing-bar" style={{ backgroundColor: accentColor }}></span>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col min-w-0 overflow-hidden">
          <span
            className="truncate font-medium cursor-pointer"
            style={{ color: isCurrent ? accentColor : '#ffffff' }}
          >
            {track.title}
          </span>
          <span
            className="truncate text-xs text-teal-200/70 hover:underline hover:text-white cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              navigate({ type: 'artist', name: track.artist });
            }}
          >
            {track.artist}
          </span>
        </div>
      </div>

      {/* 3. Album */}
      <div className="truncate text-gray-400 hover:text-white cursor-pointer hidden md:block">
        {track.album || 'Single'}
      </div>

      {/* 4. Date Added */}
      <div className="truncate text-xs hidden lg:block">
        {formatDate(track.dateAdded)}
      </div>

      {/* 5. Like, Duration & More */}
      <div className="flex items-center justify-end gap-2 md:gap-3 text-right flex-shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(track.id);
          }}
          className={`transition-colors p-1.5 md:p-1 ${
            track.isFavorite
              ? 'opacity-100 hover:scale-110'
              : 'opacity-70 md:opacity-0 md:group-hover:opacity-100 hover:text-white text-gray-400'
          }`}
          style={{ color: track.isFavorite ? accentColor : undefined }}
          title={track.isFavorite ? 'Remove from Liked Songs' : 'Save to Liked Songs'}
        >
          <Heart className={`w-4 h-4 ${track.isFavorite ? 'fill-current' : ''}`} />
        </button>

        <span className="hidden sm:inline-block w-10 text-xs tabular-nums text-gray-400">
          {formatDuration(track.duration)}
        </span>

        {/* Options Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(prev => !prev);
            }}
            className="opacity-80 md:opacity-0 md:group-hover:opacity-100 hover:text-white p-1.5 md:p-1 text-gray-400 transition-opacity"
            title="More options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-8 z-50 w-52 bg-[#282828] border border-white/10 rounded-lg shadow-2xl py-1 text-xs text-gray-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  playTrack(track, queueList);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/10 text-left"
              >
                <Play className="w-3.5 h-3.5" />
                Play now
              </button>

              <div
                className="relative"
                onMouseEnter={() => setShowPlaylistsSubmenu(true)}
                onMouseLeave={() => setShowPlaylistsSubmenu(false)}
              >
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/10 text-left"
                >
                  <span className="flex items-center gap-2">
                    <ListPlus className="w-3.5 h-3.5" />
                    Add to playlist
                  </span>
                  <span>▸</span>
                </button>

                {showPlaylistsSubmenu && (
                  <div className="absolute right-full top-0 w-48 bg-[#282828] border border-white/10 rounded-lg shadow-2xl py-1 max-h-48 overflow-y-auto">
                    {playlists.length === 0 ? (
                      <span className="block px-3 py-2 text-gray-500">No playlists</span>
                    ) : (
                      playlists.map((pl) => (
                        <button
                          key={pl.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            addTrackToPlaylist(pl.id, track.id);
                            setShowMenu(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-white/10 truncate"
                        >
                          {pl.name}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  setEditingTrack(track);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/10 text-left text-blue-400"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit details & lyrics
              </button>

              {playlistId && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    removeTrackFromPlaylist(playlistId, track.id);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/10 text-left text-yellow-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove from this playlist
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  if (confirm(`Delete "${track.title}" from your library?`)) {
                    deleteTrack(track.id);
                  }
                }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-500/20 text-red-400 text-left"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete from library
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
