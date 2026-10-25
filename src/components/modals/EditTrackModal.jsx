import React, { useState } from 'react';
import { X, Upload, Save, Music, Image as ImageIcon } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export default function EditTrackModal() {
  const { editingTrack, setEditingTrack, updateTrack, accentColor } = usePlayer();

  if (!editingTrack) return null;

  const [title, setTitle] = useState(editingTrack.title || '');
  const [artist, setArtist] = useState(editingTrack.artist || '');
  const [album, setAlbum] = useState(editingTrack.album || '');
  const [genre, setGenre] = useState(editingTrack.genre || '');
  const [year, setYear] = useState(editingTrack.year || new Date().getFullYear());
  const [coverArt, setCoverArt] = useState(editingTrack.coverArt || '');
  const [lyrics, setLyrics] = useState(editingTrack.lyrics || '');

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverArt(url);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updated = {
      ...editingTrack,
      title: title.trim() || 'Untitled',
      artist: artist.trim() || 'Unknown Artist',
      album: album.trim() || 'Single',
      genre: genre.trim() || 'Music',
      year: Number(year) || new Date().getFullYear(),
      coverArt: coverArt || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      lyrics: lyrics.trim(),
    };

    await updateTrack(updated);
    setEditingTrack(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-[#282828] border border-white/10 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5" style={{ color: accentColor }} />
            <h3 className="text-lg font-bold text-white">Edit Song Details & Lyrics</h3>
          </div>
          <button
            onClick={() => setEditingTrack(null)}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Artwork Preview & Upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative group w-36 h-36 rounded-lg overflow-hidden bg-black/40 border border-white/10 shadow-lg">
                <img
                  src={coverArt || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80'}
                  alt="Track cover"
                  className="w-full h-full object-cover"
                />
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-white text-xs gap-1">
                  <Upload className="w-5 h-5" />
                  <span>Change Art</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageFileChange}
                  />
                </label>
              </div>

              <div className="w-full">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Or Cover Image URL
                </label>
                <input
                  type="text"
                  value={coverArt}
                  onChange={(e) => setCoverArt(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#181818] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            {/* Metadata Fields */}
            <div className="md:col-span-2 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-[#181818] border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Artist</label>
                  <input
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    required
                    className="w-full bg-[#181818] border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Album</label>
                  <input
                    type="text"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                    className="w-full bg-[#181818] border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Genre</label>
                  <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="e.g. Synthwave, Lofi, Rock"
                    className="w-full bg-[#181818] border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Year</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-[#181818] border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Lyrics Editor (LRC or plain text) */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-300">
                Lyrics (Plain text or [mm:ss.xx] LRC format for synced playback)
              </label>
              <span className="text-[11px] text-gray-400">Timestamps sync in the Lyrics view</span>
            </div>
            <textarea
              rows={6}
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="[00:12.50] First line of lyrics&#10;[00:24.00] Second line of lyrics"
              className="w-full bg-[#181818] border border-white/10 rounded-md p-3 text-xs font-mono text-gray-200 placeholder-gray-600 focus:outline-none focus:border-white/40 leading-relaxed"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setEditingTrack(null)}
              className="px-4 py-2 rounded-full font-semibold text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 rounded-full font-bold text-black transition-transform hover:scale-105 shadow-md"
              style={{ backgroundColor: accentColor }}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
