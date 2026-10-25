import React, { useRef, useEffect } from 'react';
import { audioEngine } from '../../services/audioEngine';
import { usePlayer } from '../../context/PlayerContext';

export default function Visualizer({ height = 60, barCount = 32, className = '' }) {
  const canvasRef = useRef(null);
  const { isPlaying, accentColor } = usePlayer();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const render = () => {
      const data = audioEngine.getFrequencyData();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const ch = canvas.height;
      const barWidth = (width / barCount) - 2;

      for (let i = 0; i < barCount; i++) {
        // Sample frequency data
        const dataIndex = Math.floor((i / barCount) * (data.length * 0.7));
        const value = isPlaying ? (data[dataIndex] || 0) : 0;
        const percent = value / 255;
        const barHeight = Math.max(3, percent * (ch - 6));

        const x = i * (barWidth + 2);
        const y = ch - barHeight;

        // Gradient for each bar
        const gradient = ctx.createLinearGradient(0, y, 0, ch);
        gradient.addColorStop(0, accentColor);
        gradient.addColorStop(1, '#ffffff20');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [2, 2, 0, 0]);
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying, accentColor, barCount]);

  return (
    <canvas
      ref={canvasRef}
      width={barCount * 8}
      height={height}
      className={`block ${className}`}
    />
  );
}
