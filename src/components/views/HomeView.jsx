import React, { useMemo } from 'react';
import { Play, Heart, Flame, Sparkles } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import SongRow from '../common/SongRow';

export default function HomeView() {
  const {
    tracks,
    playlists,
    recentlyPlayed,
    playTrack,
    navigate,
    accentColor,
  } = usePlayer();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // Extracted Artists
  const featuredArtists = [
    { name: 'Yeat', count: '10 tracks', cover: '/covers/yeat-money-so-big.jpg' },
    { name: 'esdeekid', count: '3 tracks', cover: '/covers/esdeekid-4-me.jpg' },
    { name: 'nettspend', count: '4 tracks', cover: '/covers/nettspend-drankdrankdrank.jpg' },
    { name: '2hollis', count: '3 tracks', cover: '/covers/2hollis-poster-boy.jpg' },
    { name: 'OsamaSon', count: '4 tracks', cover: '/covers/osamason-cts-v.jpg' },
    { name: 'nine vicious', count: '1 track', cover: '/covers/nine-vicious-demon-time.jpg' },
  ];

  // Quick picks
  const quickItems = useMemo(() => {
    const items = [
      {
        id: 'liked-quick',
        name: 'Liked Songs',
        type: 'liked',
        coverArt: null,
        isLiked: true,
      },
    ];

    playlists.forEach((pl) => {
      items.push({
        id: pl.id,
        name: pl.name,
        type: 'playlist',
        coverArt: pl.coverArt,
        trackIds: pl.trackIds,
      });
    });

    return items;
  }, [playlists]);

  const handleQuickItemPlay = (item, e) => {
    e.stopPropagation();
    if (item.type === 'liked') {
      const likedTracks = tracks.filter((t) => t.isFavorite);
      if (likedTracks.length > 0) playTrack(likedTracks[0], likedTracks);
    } else {
      const plTracks = tracks.filter((t) => item.trackIds?.includes(t.id));
      if (plTracks.length > 0) playTrack(plTracks[0], plTracks);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 space-y-6 md:space-y-8 select-none">
      {/* 1. Header Greeting & Quick Jumps */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-extrabold text-[#f0fdfa] tracking-tight">
            {greeting}
          </h1>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
            {tracks.length} Extracted Tracks
          </span>
        </div>

        {/* Quick Jump Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.type === 'liked') navigate({ type: 'liked' });
                else navigate({ type: 'playlist', id: item.id });
              }}
              className="group relative flex items-center bg-[#09262f]/70 hover:bg-[#0f3844] rounded-lg overflow-hidden cursor-pointer transition-all border border-teal-500/10 hover:border-teal-500/30 shadow-md"
            >
              {item.isLiked ? (
                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-500 flex items-center justify-center flex-shrink-0 text-white">
                  <Heart className="w-7 h-7 fill-current" />
                </div>
              ) : (
                <img
                  src={item.coverArt}
                  alt={item.name}
                  className="w-16 h-16 object-cover flex-shrink-0"
                />
              )}

              <span className="font-bold text-sm text-[#f0fdfa] px-4 truncate flex-1">
                {item.name}
              </span>

              {/* Hover Play Button */}
              <button
                onClick={(e) => handleQuickItemPlay(item, e)}
                className="opacity-0 group-hover:opacity-100 mr-4 w-10 h-10 rounded-full flex items-center justify-center text-black shadow-xl hover:scale-105 transition-all"
                style={{ backgroundColor: accentColor }}
              >
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Featured Artists */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#f0fdfa]">Featured Artists</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {featuredArtists.map((art) => (
            <div
              key={art.name}
              onClick={() => navigate({ type: 'artist', name: art.name })}
              className="group flex flex-col items-center p-3 rounded-xl bg-[#09262f]/50 hover:bg-[#0f3844] border border-teal-500/10 hover:border-teal-500/30 cursor-pointer transition-all text-center"
            >
              <div className="relative mb-3 w-24 h-24 rounded-full overflow-hidden shadow-lg border border-teal-500/20 group-hover:scale-105 transition-transform">
                <img
                  src={art.cover}
                  alt={art.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-sm text-[#f0fdfa] truncate w-full">{art.name}</h4>
              <p className="text-xs text-teal-300/70 mt-0.5">{art.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Curated Playlists */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#f0fdfa]">Curated Playlists</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {playlists.map((pl) => {
            const plTracks = tracks.filter((t) => pl.trackIds?.includes(t.id));
            return (
              <div
                key={pl.id}
                onClick={() => navigate({ type: 'playlist', id: pl.id })}
                className="group relative p-4 bg-[#09262f]/60 hover:bg-[#0f3844] rounded-xl border border-teal-500/10 hover:border-teal-500/30 cursor-pointer transition-all shadow-md"
              >
                <div className="relative mb-3 overflow-hidden rounded-lg shadow-md aspect-square">
                  <img
                    src={pl.coverArt}
                    alt={pl.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (plTracks.length > 0) playTrack(plTracks[0], plTracks);
                    }}
                    className="absolute bottom-2 right-2 w-11 h-11 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 shadow-2xl hover:scale-105 transition-all"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                </div>
                <h4 className="font-bold text-base text-[#f0fdfa] truncate">{pl.name}</h4>
                <p className="text-xs text-teal-200/60 line-clamp-2 mt-1">{pl.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Complete Songs Table */}
      <section className="pb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-[#f0fdfa]">All Tracks ({tracks.length})</h2>
          <span className="text-xs text-teal-300/70 hidden sm:inline">Tap any song to play</span>
        </div>

        {/* Table Column Headers (hidden on mobile) */}
        <div className="hidden md:grid grid-cols-[16px_4fr_2fr_2fr_minmax(120px,1fr)] gap-4 px-4 py-2 border-b border-teal-500/15 text-xs font-semibold text-teal-300/70 uppercase tracking-wider">
          <span>#</span>
          <span>Title</span>
          <span className="hidden md:block">Album</span>
          <span className="hidden lg:block">Date Added</span>
          <span className="text-right">Duration</span>
        </div>

        {/* Songs List */}
        <div className="mt-2 space-y-0.5">
          {tracks.map((track, idx) => (
            <SongRow
              key={track.id}
              track={track}
              index={idx}
              queueList={tracks}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
