import React, { useMemo } from 'react';
import { Play, Search as SearchIcon, Music } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import SongRow from '../common/SongRow';

const EXTRACTED_BROWSE = [
  { id: 'cat-yeat-up2me', name: 'Yeat: Up 2 Më & 2 Alivë', query: 'Yeat', color: 'from-teal-600 to-cyan-900', img: '/covers/yeat-money-so-big.jpg' },
  { id: 'cat-yeat-lyfe', name: 'Yeat: Lyfë & 2093', query: 'Yeat', color: 'from-emerald-700 to-teal-950', img: '/covers/yeat-out-the-way.jpg' },
  { id: 'cat-esdeekid', name: 'esdeekid (4 me, phantom, ritz)', query: 'esdeekid', color: 'from-cyan-800 to-slate-950', img: '/covers/esdeekid-4-me.jpg' },
  { id: 'cat-nettspend', name: 'nettspend (drank, that one song)', query: 'nettspend', color: 'from-teal-700 to-blue-950', img: '/covers/nettspend-drankdrankdrank.jpg' },
  { id: 'cat-2hollis', name: '2hollis (poster boy, jeans, crush)', query: '2hollis', color: 'from-teal-500 to-emerald-950', img: '/covers/2hollis-poster-boy.jpg' },
  { id: 'cat-osamason', name: 'OsamaSon (cts-v, blonde, kills)', query: 'OsamaSon', color: 'from-cyan-700 to-teal-900', img: '/covers/osamason-cts-v.jpg' },
  { id: 'cat-ninevicious', name: 'nine vicious (demon time)', query: 'nine vicious', color: 'from-teal-800 to-indigo-950', img: '/covers/nine-vicious-demon-time.jpg' },
  { id: 'cat-drake-yeat', name: 'IDGAF (Drake & Yeat)', query: 'IDGAF', color: 'from-cyan-600 to-teal-950', img: '/covers/yeat-idgaf.jpg' },
];

export default function SearchView() {
  const {
    tracks,
    playlists,
    searchQuery,
    setSearchQuery,
    playTrack,
    navigate,
    accentColor,
  } = usePlayer();

  const query = searchQuery.trim().toLowerCase();

  // Filtered tracks
  const matchedTracks = useMemo(() => {
    if (!query) return [];
    return tracks.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.artist.toLowerCase().includes(query) ||
        (t.album && t.album.toLowerCase().includes(query)) ||
        (t.genre && t.genre.toLowerCase().includes(query))
    );
  }, [tracks, query]);

  // Filtered playlists
  const matchedPlaylists = useMemo(() => {
    if (!query) return [];
    return playlists.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query))
    );
  }, [playlists, query]);

  const topResult = matchedTracks[0];

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 space-y-6 md:space-y-8 select-none">
      {/* Search active results */}
      {query ? (
        <div>
          {matchedTracks.length === 0 && matchedPlaylists.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
              <SearchIcon className="w-12 h-12 stroke-[1.5] text-teal-500/50" />
              <h3 className="text-xl font-bold text-white">No results found for "{searchQuery}"</h3>
              <p className="text-sm text-teal-200/60">Try searching for Yeat, esdeekid, nettspend, 2hollis, OsamaSon, or nine vicious.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Top Result + Matching Songs */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Top Result Card */}
                {topResult && (
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-[#f0fdfa] mb-3">Top result</h3>
                    <div
                      onClick={() => playTrack(topResult, matchedTracks)}
                      className="group relative p-5 rounded-xl bg-[#09262f]/80 hover:bg-[#0f3844] border border-teal-500/20 cursor-pointer transition-all flex flex-col justify-between h-56 shadow-lg"
                    >
                      <img
                        src={topResult.coverArt}
                        alt={topResult.title}
                        className="w-24 h-24 rounded-lg object-cover shadow-lg border border-teal-500/20"
                      />
                      <div>
                        <h4 className="text-2xl font-bold text-[#f0fdfa] truncate group-hover:text-white">
                          {topResult.title}
                        </h4>
                        <p className="text-sm text-teal-300/70 mt-1">
                          <span className="text-white font-medium">{topResult.artist}</span> • {topResult.album || 'Single'}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playTrack(topResult, matchedTracks);
                        }}
                        className="absolute bottom-5 right-5 w-12 h-12 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 shadow-2xl hover:scale-105 transition-all"
                        style={{ backgroundColor: accentColor }}
                      >
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Matching Songs List */}
                <div className={topResult ? 'lg:col-span-3' : 'lg:col-span-5'}>
                  <h3 className="text-xl font-bold text-[#f0fdfa] mb-3">Songs</h3>
                  <div className="space-y-0.5">
                    {matchedTracks.slice(0, 6).map((track, idx) => (
                      <SongRow
                        key={track.id}
                        track={track}
                        index={idx}
                        queueList={matchedTracks}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Matching Playlists */}
              {matchedPlaylists.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-[#f0fdfa] mb-3">Playlists</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {matchedPlaylists.map((pl) => (
                      <div
                        key={pl.id}
                        onClick={() => navigate({ type: 'playlist', id: pl.id })}
                        className="p-3 bg-[#09262f]/60 hover:bg-[#0f3844] rounded-lg border border-teal-500/15 cursor-pointer transition-colors group"
                      >
                        <img
                          src={pl.coverArt}
                          alt={pl.name}
                          className="w-full aspect-square object-cover rounded-md mb-3"
                        />
                        <h5 className="font-bold text-sm text-[#f0fdfa] truncate">{pl.name}</h5>
                        <p className="text-xs text-teal-200/60 truncate mt-1">{pl.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Browse All Category Tiles - Extracted Artists & Albums */
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-extrabold text-[#f0fdfa]">Explore Music</h2>
            <span className="text-xs text-teal-300/70">Click any card to filter</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {EXTRACTED_BROWSE.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSearchQuery(cat.query)}
                className={`relative h-44 rounded-xl overflow-hidden cursor-pointer p-5 bg-gradient-to-br ${cat.color} transition-all hover:scale-[1.02] shadow-xl border border-teal-400/20`}
              >
                <h3 className="text-lg font-bold text-white leading-tight break-words max-w-[65%] drop-shadow">
                  {cat.name}
                </h3>
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="absolute -bottom-2 -right-3 w-28 h-28 object-cover rotate-[20deg] shadow-2xl rounded-md border border-white/20"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
