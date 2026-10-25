import React, { useState } from 'react';
import { X, Upload, Save, ListMusic } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export default function EditPlaylistModal() {
  const { editingPlaylist, setEditingPlaylist, updatePlaylist, accentColor } = usePlayer();

  if (!editingPlaylist) return null;

  const [name, setName] = useState(editingPlaylist.name || '');
  const [description, setDescription] = useState(editingPlaylist.description || '');
  const [coverArt, setCoverArt] = useState(editingPlaylist.coverArt || '');

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
      ...editingPlaylist,
      name: name.trim() || 'My Playlist',
      description: description.trim(),
      coverArt: coverArt || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    };

    await updatePlaylist(updated);
    setEditingPlaylist(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-[#282828] border border-white/10 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ListMusic className="w-5 h-5" style={{ color: accentColor }} />
            <h3 className="text-lg font-bold text-white">Edit Playlist Details</h3>
          </div>
          <button
            onClick={() => setEditingPlaylist(null)}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4 text-sm">
          <div className="flex gap-4 items-start">
            {/* Cover Art Upload */}
            <div className="relative group w-32 h-32 rounded-lg overflow-hidden bg-black/40 border border-white/10 shadow-lg flex-shrink-0">
              <img
                src={coverArt || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80'}
                alt="Playlist cover"
                className="w-full h-full object-cover"
              />
              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-white text-xs gap-1">
                <Upload className="w-5 h-5" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageFileChange}
                />
              </label>
            </div>

            {/* Inputs */}
            <div className="flex-1 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Playlist Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="My Playlist"
                  className="w-full bg-[#181818] border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Give your playlist a memorable description"
                  className="w-full bg-[#181818] border border-white/10 rounded-md px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/40 resize-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Cover Image URL (optional)
            </label>
            <input
              type="text"
              value={coverArt}
              onChange={(e) => setCoverArt(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#181818] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setEditingPlaylist(null)}
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
