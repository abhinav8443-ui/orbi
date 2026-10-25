import React, { useState, useEffect } from 'react';
import { UploadCloud } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export default function DropZone() {
  const [isDragging, setIsDragging] = useState(false);
  const { uploadFiles, accentColor } = usePlayer();

  useEffect(() => {
    let dragCounter = 0;

    const handleDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter++;
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter--;
      if (dragCounter === 0) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounter = 0;

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        await uploadFiles(e.dataTransfer.files);
      }
    };

    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, [uploadFiles]);

  if (!isDragging) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-none transition-all duration-300">
      <div 
        className="flex flex-col items-center justify-center p-12 rounded-3xl border-2 border-dashed border-white/40 bg-[#181818]/90 shadow-2xl scale-105 animate-pulse-subtle max-w-lg text-center"
        style={{ borderColor: accentColor }}
      >
        <div 
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6 text-black shadow-lg"
          style={{ backgroundColor: accentColor }}
        >
          <UploadCloud className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Drop your music here</h2>
        <p className="text-gray-400 text-base">
          Supports MP3, WAV, FLAC, M4A, OGG & AAC audio files. Tags and artwork will be automatically extracted!
        </p>
      </div>
    </div>
  );
}
