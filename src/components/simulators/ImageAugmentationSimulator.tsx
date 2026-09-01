import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sliders, CheckCircle2, Cpu } from 'lucide-react';
import { cyberAudio } from '../../utils/audio';

export const ImageAugmentationSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [filterMode, setFilterMode] = useState<'none' | 'grayscale' | 'sobel' | 'blur' | 'threshold' | 'invert' | 'noise'>('sobel');
  const [thresholdVal, setThresholdVal] = useState<number>(128);
  const [blurKernel, setBlurKernel] = useState<number>(3);
  const [noiseLevel, setNoiseLevel] = useState<number>(20);
  const [benchmarkTime, setBenchmarkTime] = useState<number>(2.4);
  const [activePattern, setActivePattern] = useState<'circuit' | 'road' | 'cyber_reticle'>('circuit');

  // Draw base synthetic pattern
  const drawBasePattern = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, width, height);

    if (activePattern === 'circuit') {
      // Draw simulated electronic microcontroller circuit traces
      ctx.strokeStyle = '#ff8800';
      ctx.lineWidth = 3;
      ctx.beginPath();
      // Chip body
      ctx.fillStyle = '#1e1e2d';
      ctx.fillRect(width * 0.3, height * 0.3, width * 0.4, height * 0.4);
      ctx.strokeRect(width * 0.3, height * 0.3, width * 0.4, height * 0.4);

      // Pins
      ctx.fillStyle = '#ffa726';
      for (let i = 0; i < 6; i++) {
        const y = height * 0.35 + i * (height * 0.05);
        ctx.fillRect(width * 0.22, y, width * 0.08, 4);
        ctx.fillRect(width * 0.7, y, width * 0.08, 4);
      }

      // Traces
      ctx.strokeStyle = '#ff6b00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width * 0.22, height * 0.35);
      ctx.lineTo(width * 0.1, height * 0.35);
      ctx.lineTo(width * 0.1, height * 0.8);
      ctx.lineTo(width * 0.5, height * 0.8);

      ctx.moveTo(width * 0.78, height * 0.55);
      ctx.lineTo(width * 0.9, height * 0.55);
      ctx.lineTo(width * 0.9, height * 0.2);
      ctx.stroke();

      // Text label
      ctx.font = '14px "JetBrains Mono", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('ESP32-CORE', width * 0.35, height * 0.52);
    } else if (activePattern === 'road') {
      // Road lane detection test pattern
      ctx.fillStyle = '#141419';
      ctx.fillRect(0, 0, width, height);

      // Road perspective
      ctx.fillStyle = '#282832';
      ctx.beginPath();
      ctx.moveTo(width * 0.4, height * 0.2);
      ctx.lineTo(width * 0.6, height * 0.2);
      ctx.lineTo(width * 0.95, height);
      ctx.lineTo(width * 0.05, height);
      ctx.fill();

      // Yellow lane dividers
      ctx.strokeStyle = '#ffb300';
      ctx.lineWidth = 4;
      ctx.setLineDash([12, 10]);
      ctx.beginPath();
      ctx.moveTo(width * 0.5, height * 0.2);
      ctx.lineTo(width * 0.5, height);
      ctx.stroke();
      ctx.setLineDash([]);
    } else {
      // Cyber target reticle
      ctx.strokeStyle = '#ff6b00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.5, width * 0.3, 0, Math.PI * 2);
      ctx.arc(width * 0.5, height * 0.5, width * 0.15, 0, Math.PI * 2);
      ctx.moveTo(0, height * 0.5);
      ctx.lineTo(width, height * 0.5);
      ctx.moveTo(width * 0.5, 0);
      ctx.lineTo(width * 0.5, height);
      ctx.stroke();

      ctx.fillStyle = '#ffa726';
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillText('TARGET LOCK: 99.4%', width * 0.55, height * 0.45);
    }
  }, [activePattern]);

  // Apply OpenCV-style transformations
  const processImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const startTime = performance.now();
    const width = canvas.width;
    const height = canvas.height;

    // Reset base pattern
    drawBasePattern(ctx, width, height);

    if (filterMode === 'none') {
      setBenchmarkTime(parseFloat((performance.now() - startTime).toFixed(2)));
      return;
    }

    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    const original = new Uint8ClampedArray(data);

    if (filterMode === 'grayscale') {
      for (let i = 0; i < data.length; i += 4) {
        const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }
    } else if (filterMode === 'threshold') {
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const val = avg >= thresholdVal ? 255 : 0;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
      }
    } else if (filterMode === 'invert') {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
    } else if (filterMode === 'noise') {
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * noiseLevel * 2.5;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
    } else if (filterMode === 'blur') {
      const k = Math.floor(blurKernel);
      for (let y = k; y < height - k; y++) {
        for (let x = k; x < width - k; x++) {
          let r = 0, g = 0, b = 0, count = 0;
          for (let dy = -k; dy <= k; dy++) {
            for (let dx = -k; dx <= k; dx++) {
              const idx = ((y + dy) * width + (x + dx)) * 4;
              r += original[idx];
              g += original[idx + 1];
              b += original[idx + 2];
              count++;
            }
          }
          const outIdx = (y * width + x) * 4;
          data[outIdx] = r / count;
          data[outIdx + 1] = g / count;
          data[outIdx + 2] = b / count;
        }
      }
    } else if (filterMode === 'sobel') {
      const gx = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
      const gy = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          let sumX = 0;
          let sumY = 0;
          let kIdx = 0;

          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const idx = ((y + dy) * width + (x + dx)) * 4;
              const gray = 0.299 * original[idx] + 0.587 * original[idx + 1] + 0.114 * original[idx + 2];
              sumX += gray * gx[kIdx];
              sumY += gray * gy[kIdx];
              kIdx++;
            }
          }

          const magnitude = Math.sqrt(sumX * sumX + sumY * sumY);
          const outIdx = (y * width + x) * 4;
          if (magnitude > 45) {
            data[outIdx] = 255;
            data[outIdx + 1] = 107;
            data[outIdx + 2] = 0;
          } else {
            data[outIdx] = 10;
            data[outIdx + 1] = 10;
            data[outIdx + 2] = 15;
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const endTime = performance.now();
    setBenchmarkTime(parseFloat((endTime - startTime).toFixed(2)));
  }, [drawBasePattern, filterMode, thresholdVal, blurKernel, noiseLevel]);

  useEffect(() => {
    processImage();
  }, [processImage]);

  const handleFilterSelect = (mode: typeof filterMode) => {
    cyberAudio.playClick();
    setFilterMode(mode);
  };

  const handlePatternChange = (pat: typeof activePattern) => {
    cyberAudio.playClick();
    setActivePattern(pat);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orange-500/20 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-orange-400" />
          <span className="font-orbitron text-sm font-bold text-orange-400">
            OPENCV_AUGMENTATION_BENCH // LIVE FILTER LAB
          </span>
        </div>
        <div className="text-xs font-mono text-neutral-400 flex items-center gap-3">
          <span>LATENCY: <strong className="text-orange-400">{benchmarkTime} ms</strong></span>
          <span>KERNEL: <strong className="text-orange-400">{filterMode.toUpperCase()}</strong></span>
        </div>
      </div>

      {/* Target Pattern Selector */}
      <div className="flex flex-wrap gap-2 items-center text-xs font-mono">
        <span className="text-neutral-400">TEST SAMPLE:</span>
        {(['circuit', 'road', 'cyber_reticle'] as const).map((pat) => (
          <button
            key={pat}
            onClick={() => handlePatternChange(pat)}
            className={`px-2.5 py-1 rounded text-xs transition-all uppercase ${
              activePattern === pat
                ? 'bg-orange-500 text-black font-bold shadow-md shadow-orange-500/30'
                : 'bg-black/50 border border-orange-500/30 text-neutral-300 hover:border-orange-400'
            }`}
          >
            {pat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Main Canvas & Pipeline Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Canvas Display */}
        <div className="lg:col-span-2 relative bg-black/80 rounded border border-orange-500/30 overflow-hidden flex items-center justify-center p-2">
          <canvas
            ref={canvasRef}
            width={480}
            height={280}
            className="w-full max-h-[300px] object-contain rounded border border-orange-500/20"
          />
          <div className="absolute top-4 left-4 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono text-orange-400 border border-orange-500/30">
            FRAME BUFFER: 480x280 RGB
          </div>
        </div>

        {/* Filter Controls & Parameters */}
        <div className="bg-black/60 rounded border border-orange-500/20 p-3 space-y-3 text-xs font-mono">
          <div className="text-orange-400 font-bold uppercase flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" /> Transform Operators
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'sobel', label: 'Sobel Edges' },
              { id: 'grayscale', label: 'Grayscale' },
              { id: 'threshold', label: 'Threshold' },
              { id: 'blur', label: 'Gaussian Blur' },
              { id: 'noise', label: 'Noise Injection' },
              { id: 'invert', label: 'Color Invert' },
              { id: 'none', label: 'Raw Bypass' },
            ].map((op) => (
              <button
                key={op.id}
                onClick={() => handleFilterSelect(op.id as typeof filterMode)}
                className={`px-2 py-1.5 rounded text-left transition-all border ${
                  filterMode === op.id
                    ? 'bg-orange-500/20 border-orange-500 text-orange-300 font-bold shadow-sm'
                    : 'bg-black/40 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                &gt; {op.label}
              </button>
            ))}
          </div>

          {/* Dynamic Sliders */}
          {filterMode === 'threshold' && (
            <div className="space-y-1 pt-2 border-t border-neutral-800">
              <div className="flex justify-between text-neutral-300">
                <span>Threshold Level:</span>
                <span className="text-orange-400">{thresholdVal}</span>
              </div>
              <input
                type="range"
                min="10"
                max="240"
                value={thresholdVal}
                onChange={(e) => setThresholdVal(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>
          )}

          {filterMode === 'blur' && (
            <div className="space-y-1 pt-2 border-t border-neutral-800">
              <div className="flex justify-between text-neutral-300">
                <span>Kernel Radius:</span>
                <span className="text-orange-400">{blurKernel}px</span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                value={blurKernel}
                onChange={(e) => setBlurKernel(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>
          )}

          {filterMode === 'noise' && (
            <div className="space-y-1 pt-2 border-t border-neutral-800">
              <div className="flex justify-between text-neutral-300">
                <span>Noise Sigma:</span>
                <span className="text-orange-400">{noiseLevel}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                value={noiseLevel}
                onChange={(e) => setNoiseLevel(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>
          )}

          <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-1">
            <div className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> OpenCV Python Bindings Ready
            </div>
            <div>Dataset Pipeline: <span className="text-orange-400 font-mono">Image-Augmentation-using-Python</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
