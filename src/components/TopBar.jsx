import React, { useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Upload, 
  Sliders, 
  Settings, 
  User, 
  X 
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function TopBar() {
  const {
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    currentView,
    navigate,
    searchQuery,
    setSearchQuery,
    setShowEqualizer,
    setShowSettings,
    uploadFiles,
    accentColor,
  } = usePlayer();

  const fileInputRef = useRef(null);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (currentView.type !== 'search') {
      navigate({ type: 'search' });
    }
  };

  const handleUploadChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(e.target.files);
      e.target.value = '';
    }
  };

  return (
    <header className="h-14 md:h-16 px-3 md:px-8 flex items-center justify-between sticky top-0 z-40 bg-[#06191f]/90 backdrop-blur-md transition-colors border-b border-teal-500/15">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="audio/*,.mp3,.wav,.ogg,.flac,.m4a,.aac"
        className="hidden"
        onChange={handleUploadChange}
      />

      {/* History Nav & Search */}
      <div className="flex items-center gap-2 md:gap-4 flex-1 max-w-xl mr-2">
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={goBack}
            disabled={!canGoBack}
            className={`w-8 h-8 rounded-full bg-black/60 flex items-center justify-center transition-opacity ${
              canGoBack ? 'text-white hover:bg-black/90 cursor-pointer' : 'text-gray-600 cursor-not-allowed opacity-50'
            }`}
            title="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goForward}
            disabled={!canGoForward}
            className={`w-8 h-8 rounded-full bg-black/60 flex items-center justify-center transition-opacity ${
              canGoForward ? 'text-white hover:bg-black/90 cursor-pointer' : 'text-gray-600 cursor-not-allowed opacity-50'
            }`}
            title="Go forward"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              if (currentView.type !== 'search') navigate({ type: 'search' });
            }}
            placeholder="Search songs, artists, albums..."
            className="w-full bg-[#09262f] hover:bg-[#0f3844] focus:bg-[#0f3844] text-xs sm:text-sm text-white placeholder-gray-400 pl-9 pr-8 py-2 rounded-full border border-teal-500/20 focus:border-teal-400 outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons & Profile */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        {/* Quick Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="hidden sm:flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-full text-black transition-transform hover:scale-105 shadow-md"
          style={{ backgroundColor: accentColor }}
          title="Upload audio files"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Songs</span>
        </button>

        {/* Equalizer Modal Toggle */}
        <button
          onClick={() => setShowEqualizer(true)}
          className="p-2 rounded-full bg-black/40 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
          title="Audio Equalizer & Presets"
        >
          <Sliders className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Settings Modal Toggle */}
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-full bg-black/40 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
          title="Settings & Appearance"
        >
          <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* User Profile Pill */}
        <div 
          onClick={() => setShowSettings(true)}
          className="flex items-center gap-2 bg-black/60 hover:bg-black/90 p-1 pr-2 sm:pr-3 rounded-full cursor-pointer transition-colors border border-white/5"
          title="User Profile"
        >
          <div 
            className="w-7 h-7 rounded-full flex items-center justify-center text-black font-bold text-xs"
            style={{ backgroundColor: accentColor }}
          >
            <User className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-white hidden sm:inline">Abhinav</span>
        </div>
      </div>
    </header>
  );
}
