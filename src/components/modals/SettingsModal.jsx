import React, { useRef } from 'react';
import { X, Settings, Download, Upload, RotateCcw, Palette, Keyboard, ShieldCheck } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { THEME_ACCENTS } from '../../data/categories';
import { dbService } from '../../services/db';

export default function SettingsModal() {
  const {
    showSettings,
    setShowSettings,
    accentColor,
    changeAccentColor,
  } = usePlayer();

  const fileInputRef = useRef(null);

  if (!showSettings) return null;

  const handleExportData = async () => {
    try {
      const dataStr = await dbService.exportLibraryData();
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `orbi-music-library-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to export library: ' + err.message);
    }
  };

  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.tracks && Array.isArray(parsed.tracks)) {
          for (const track of parsed.tracks) {
            await dbService.saveTrack(track);
          }
        }
        if (parsed.playlists && Array.isArray(parsed.playlists)) {
          for (const pl of parsed.playlists) {
            await dbService.savePlaylist(pl);
          }
        }
        alert('Library data imported successfully! Refreshing...');
        window.location.reload();
      } catch (err) {
        alert('Invalid library backup file: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetData = async () => {
    if (confirm('Are you sure you want to reset your library to default tracks? Custom uploaded tracks will be cleared.')) {
      await dbService.resetAll();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-[#282828] border border-white/10 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150 select-none">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold"
              style={{ backgroundColor: accentColor }}
            >
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">App Settings & Appearance</h3>
              <p className="text-xs text-gray-400">Personalize your Orbi Music experience</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(false)}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* Accent Color Customization */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4 text-gray-400" />
              <h4 className="font-semibold text-white">Accent Theme Color</h4>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {THEME_ACCENTS.map((item) => (
                <button
                  key={item.hex}
                  onClick={() => changeAccentColor(item.hex)}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all ${
                    accentColor === item.hex
                      ? 'border-white bg-white/10 scale-105'
                      : 'border-transparent hover:border-white/20 bg-[#181818]'
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full shadow-md"
                    style={{ backgroundColor: item.hex }}
                  />
                  <span className="text-[10px] text-gray-300 font-medium text-center truncate w-full">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Keyboard className="w-4 h-4 text-gray-400" />
              <h4 className="font-semibold text-white">Keyboard Shortcuts</h4>
            </div>
            <div className="bg-[#181818] p-3 rounded-lg border border-white/5 grid grid-cols-2 gap-2 text-xs text-gray-300">
              <div className="flex justify-between items-center pr-2">
                <span>Play / Pause</span>
                <kbd className="bg-black/50 px-2 py-0.5 rounded border border-white/10 font-mono text-[11px]">Space</kbd>
              </div>
              <div className="flex justify-between items-center pr-2">
                <span>Seek ±5 seconds</span>
                <kbd className="bg-black/50 px-2 py-0.5 rounded border border-white/10 font-mono text-[11px]">← / →</kbd>
              </div>
              <div className="flex justify-between items-center pr-2">
                <span>Next / Previous Track</span>
                <kbd className="bg-black/50 px-2 py-0.5 rounded border border-white/10 font-mono text-[11px]">Ctrl + ← / →</kbd>
              </div>
              <div className="flex justify-between items-center pr-2">
                <span>Volume ±5%</span>
                <kbd className="bg-black/50 px-2 py-0.5 rounded border border-white/10 font-mono text-[11px]">↑ / ↓</kbd>
              </div>
              <div className="flex justify-between items-center pr-2">
                <span>Mute / Unmute</span>
                <kbd className="bg-black/50 px-2 py-0.5 rounded border border-white/10 font-mono text-[11px]">M</kbd>
              </div>
              <div className="flex justify-between items-center pr-2">
                <span>Toggle Lyrics</span>
                <kbd className="bg-black/50 px-2 py-0.5 rounded border border-white/10 font-mono text-[11px]">L</kbd>
              </div>
            </div>
          </div>

          {/* Backup & Data Management */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-gray-400" />
              <h4 className="font-semibold text-white">Library Backup & Persistence</h4>
            </div>
            <div className="bg-[#181818] p-4 rounded-lg border border-white/5 space-y-3">
              <p className="text-xs text-gray-400">
                Your music files, edits, playlists, and preferences are stored securely in browser IndexedDB.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Backup Library (JSON)
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Restore Backup
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={handleImportData}
                />

                <button
                  onClick={handleResetData}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 text-xs font-semibold text-red-400 transition-colors ml-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
