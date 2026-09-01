import React, { useEffect, useState } from 'react';
import { cyberAudio } from '../utils/audio';

export const AudioWaveVisualizer: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bars, setBars] = useState<number[]>([20, 45, 80, 55, 30, 70, 95, 40, 60, 35, 75, 50]);

  useEffect(() => {
    const unsubscribe = cyberAudio.subscribe((active) => {
      setIsPlaying(active);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Animate bars when playing
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setBars([
          Math.random() * 80 + 20,
          Math.random() * 95 + 25,
          Math.random() * 100 + 30,
          Math.random() * 85 + 20,
          Math.random() * 90 + 25,
          Math.random() * 100 + 35,
          Math.random() * 95 + 30,
          Math.random() * 80 + 20,
          Math.random() * 90 + 25,
          Math.random() * 75 + 20,
          Math.random() * 85 + 25,
          Math.random() * 70 + 20,
        ]);
      }, 70);
    } else {
      setBars([15, 25, 35, 20, 30, 40, 30, 25, 20, 35, 25, 15]);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className={`flex items-end gap-[3px] h-6 px-2 py-1 bg-black/60 rounded border border-orange-500/30 ${className}`}>
      {bars.map((height, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-t transition-all duration-75 ${
            isPlaying
              ? 'bg-gradient-to-t from-orange-600 via-orange-500 to-amber-300 shadow-sm shadow-orange-500/80'
              : 'bg-neutral-700'
          }`}
          style={{ height: `${height}%` }}
        />
      ))}
      <span className="text-[9px] font-mono text-orange-400 ml-1 hidden sm:inline">
        {isPlaying ? 'AUDIO_RX' : 'STANDBY'}
      </span>
    </div>
  );
};
