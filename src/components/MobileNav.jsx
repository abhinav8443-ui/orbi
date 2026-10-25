import React from 'react';
import { Home, Search, Library } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function MobileNav() {
  const { currentView, navigate, accentColor } = usePlayer();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 h-14 bg-[#030e12]/95 backdrop-blur-xl border-t border-teal-500/15 flex items-center justify-around z-40 select-none">
      <button
        onClick={() => navigate({ type: 'home' })}
        className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${
          currentView.type === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
        style={{ color: currentView.type === 'home' ? accentColor : undefined }}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Home</span>
      </button>

      <button
        onClick={() => navigate({ type: 'search' })}
        className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${
          currentView.type === 'search' ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
        style={{ color: currentView.type === 'search' ? accentColor : undefined }}
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Search</span>
      </button>

      <button
        onClick={() => navigate({ type: 'library' })}
        className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${
          currentView.type === 'library' ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
        style={{ color: currentView.type === 'library' ? accentColor : undefined }}
      >
        <Library className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Your Library</span>
      </button>
    </nav>
  );
}
