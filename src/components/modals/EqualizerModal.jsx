import React, { useState } from 'react';
import { X, Sliders, RotateCcw } from 'lucide-react';
import { audioEngine, EQ_PRESETS } from '../../services/audioEngine';
import { usePlayer } from '../../context/PlayerContext';
import Visualizer from '../common/Visualizer';

const FREQUENCIES = [
  { label: '60 Hz', name: 'Sub Bass' },
  { label: '250 Hz', name: 'Bass' },
  { label: '1 kHz', name: 'Mid' },
  { label: '4 kHz', name: 'Upper Mid' },
  { label: '16 kHz', name: 'Treble' },
];

export default function EqualizerModal() {
  const { showEqualizer, setShowEqualizer, accentColor } = usePlayer();
  const [selectedPreset, setSelectedPreset] = useState(audioEngine.currentPreset || 'Flat');
  const [gains, setGains] = useState([...audioEngine.currentGains]);

  if (!showEqualizer) return null;

  const handlePresetChange = (presetName) => {
    setSelectedPreset(presetName);
    audioEngine.setEqPreset(presetName);
    setGains([...audioEngine.currentGains]);
  };

  const handleBandChange = (index, value) => {
    const val = parseFloat(value);
    audioEngine.setEqBand(index, val);
    setSelectedPreset('Custom');
    setGains([...audioEngine.currentGains]);
  };

  const handleReset = () => {
    handlePresetChange('Flat');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-[#282828] border border-white/10 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 select-none">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold"
              style={{ backgroundColor: accentColor }}
            >
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Graphic Equalizer</h3>
              <p className="text-xs text-gray-400">Web Audio API 5-Band Filter</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
              title="Reset EQ to Flat"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              onClick={() => setShowEqualizer(false)}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Preset Selector */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Audio Profile
            </span>
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(EQ_PRESETS).map((preset) => (
                <button
                  key={preset}
                  onClick={() => handlePresetChange(preset)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedPreset === preset
                      ? 'bg-white text-black font-bold'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Equalizer Frequency Sliders */}
          <div className="bg-[#181818] p-6 rounded-xl border border-white/5 flex justify-between items-center h-52">
            {FREQUENCIES.map((freq, idx) => {
              const gain = gains[idx] || 0;
              return (
                <div key={freq.label} className="flex flex-col items-center h-full justify-between w-14">
                  {/* Gain label (+dB) */}
                  <span className="text-[11px] font-mono text-gray-400">
                    {gain > 0 ? `+${gain.toFixed(0)}` : gain.toFixed(0)} dB
                  </span>

                  {/* Vertical Range Slider */}
                  <div className="relative flex items-center justify-center flex-1 my-2">
                    <input
                      type="range"
                      min={-12}
                      max={12}
                      step={1}
                      value={gain}
                      onChange={(e) => handleBandChange(idx, e.target.value)}
                      className="w-28 -rotate-90 origin-center cursor-pointer"
                    />
                  </div>

                  {/* Frequency Labels */}
                  <div className="text-center mt-1">
                    <p className="text-xs font-bold text-white leading-tight">{freq.label}</p>
                    <p className="text-[10px] text-gray-500">{freq.name}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Frequency Spectrum Visualizer */}
          <div className="bg-[#181818] p-4 rounded-xl border border-white/5 flex flex-col items-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2 self-start">
              Live Spectrum Output
            </span>
            <Visualizer height={50} barCount={48} className="w-full rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
