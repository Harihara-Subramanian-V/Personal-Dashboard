import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sliders, X } from 'lucide-react';

interface ImageAugmentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageAugmentationModal: React.FC<ImageAugmentationModalProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [filterMode, setFilterMode] = useState<'none' | 'grayscale' | 'sobel' | 'blur' | 'threshold' | 'invert' | 'noise'>('sobel');
  const [thresholdVal, setThresholdVal] = useState<number>(128);
  const [blurKernel, setBlurKernel] = useState<number>(3);
  const [noiseLevel, setNoiseLevel] = useState<number>(25);
  const [benchmarkTime, setBenchmarkTime] = useState<number>(1.8);
  const [activePattern, setActivePattern] = useState<'circuit' | 'road' | 'grid'>('circuit');

  // Draw base pattern
  const drawBasePattern = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#0e0e12';
    ctx.fillRect(0, 0, width, height);

    if (activePattern === 'circuit') {
      // Draw microcontroller PCB traces
      ctx.fillStyle = '#1c1c24';
      ctx.fillRect(width * 0.3, height * 0.3, width * 0.4, height * 0.4);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.strokeRect(width * 0.3, height * 0.3, width * 0.4, height * 0.4);

      // Pins
      ctx.fillStyle = '#fbbf24';
      for (let i = 0; i < 6; i++) {
        const y = height * 0.35 + i * (height * 0.05);
        ctx.fillRect(width * 0.22, y, width * 0.08, 4);
        ctx.fillRect(width * 0.7, y, width * 0.08, 4);
      }

      // Traces
      ctx.strokeStyle = '#d97706';
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

      ctx.font = '13px "JetBrains Mono", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('ESP32-S3', width * 0.38, height * 0.52);
    } else if (activePattern === 'road') {
      // Road lane perspective test pattern
      ctx.fillStyle = '#18181f';
      ctx.beginPath();
      ctx.moveTo(width * 0.4, height * 0.2);
      ctx.lineTo(width * 0.6, height * 0.2);
      ctx.lineTo(width * 0.95, height);
      ctx.lineTo(width * 0.05, height);
      ctx.fill();

      // Lane dividers
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.setLineDash([12, 10]);
      ctx.beginPath();
      ctx.moveTo(width * 0.5, height * 0.2);
      ctx.lineTo(width * 0.5, height);
      ctx.stroke();
      ctx.setLineDash([]);
    } else {
      // Geometric Calibration Grid
      ctx.strokeStyle = '#3f3f46';
      ctx.lineWidth = 1;
      const step = 30;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.5, 45, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [activePattern]);

  // Apply real-time image processing filters
  const processImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const t0 = performance.now();
    drawBasePattern(ctx, canvas.width, canvas.height);

    if (filterMode === 'none') {
      setBenchmarkTime(+(performance.now() - t0).toFixed(2));
      return;
    }

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    const w = canvas.width;
    const h = canvas.height;

    // Grayscale
    if (filterMode === 'grayscale') {
      for (let i = 0; i < data.length; i += 4) {
        const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }
      ctx.putImageData(imgData, 0, 0);
    }
    // Sobel Edge Detection Filter
    else if (filterMode === 'sobel') {
      const gray = new Uint8Array(w * h);
      for (let i = 0; i < data.length; i += 4) {
        gray[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      }

      const output = ctx.createImageData(w, h);
      const outData = output.data;

      const gx = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
      const gy = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          let sumX = 0;
          let sumY = 0;
          let k = 0;

          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const pixel = gray[(y + dy) * w + (x + dx)];
              sumX += pixel * gx[k];
              sumY += pixel * gy[k];
              k++;
            }
          }

          const magnitude = Math.min(255, Math.hypot(sumX, sumY));
          const idx = (y * w + x) * 4;
          outData[idx] = magnitude > 80 ? 245 : 10;
          outData[idx + 1] = magnitude > 80 ? 158 : 10;
          outData[idx + 2] = magnitude > 80 ? 11 : 16;
          outData[idx + 3] = 255;
        }
      }
      ctx.putImageData(output, 0, 0);
    }
    // Box Blur
    else if (filterMode === 'blur') {
      const copy = new Uint8ClampedArray(data);
      const r = Math.floor(blurKernel / 2);

      for (let y = r; y < h - r; y++) {
        for (let x = r; x < w - r; x++) {
          let red = 0, green = 0, blue = 0, count = 0;
          for (let dy = -r; dy <= r; dy++) {
            for (let dx = -r; dx <= r; dx++) {
              const idx = ((y + dy) * w + (x + dx)) * 4;
              red += copy[idx];
              green += copy[idx + 1];
              blue += copy[idx + 2];
              count++;
            }
          }
          const outIdx = (y * w + x) * 4;
          data[outIdx] = red / count;
          data[outIdx + 1] = green / count;
          data[outIdx + 2] = blue / count;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }
    // Thresholding
    else if (filterMode === 'threshold') {
      for (let i = 0; i < data.length; i += 4) {
        const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const val = avg >= thresholdVal ? 255 : 0;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
      }
      ctx.putImageData(imgData, 0, 0);
    }
    // Invert
    else if (filterMode === 'invert') {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
      ctx.putImageData(imgData, 0, 0);
    }
    // Noise Injection
    else if (filterMode === 'noise') {
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * noiseLevel * 2.5;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
      ctx.putImageData(imgData, 0, 0);
    }

    const t1 = performance.now();
    setBenchmarkTime(+(t1 - t0).toFixed(2));
  }, [filterMode, thresholdVal, blurKernel, noiseLevel, drawBasePattern]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(processImage, 50);
    }
  }, [isOpen, processImage]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-4xl bg-[#121216] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden text-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Sliders className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white">
                Interactive Computer Vision Augmentation
              </h2>
              <p className="text-xs text-zinc-400">
                Real-time Canvas 2D convolution kernels & spatial filters
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Canvas Display Viewport */}
          <div className="lg:col-span-7 flex flex-col items-center space-y-2">
            <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 shadow-inner">
              <canvas
                ref={canvasRef}
                width={460}
                height={320}
                className="rounded-lg max-w-full h-auto bg-black"
              />
            </div>
            <div className="flex items-center justify-between w-full max-w-[460px] text-[11px] font-mono text-zinc-400 px-1">
              <span>Kernel compute: {benchmarkTime} ms</span>
              <span>Resolution: 460 x 320 px</span>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Pattern Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400 uppercase">
                Input Pattern
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['circuit', 'road', 'grid'] as const).map((pat) => (
                  <button
                    key={pat}
                    onClick={() => setActivePattern(pat)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer ${
                      activePattern === pat
                        ? 'bg-zinc-800 text-amber-300 border border-amber-500/30'
                        : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                    }`}
                  >
                    {pat}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Modes */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400 uppercase">
                Applied Transform / Kernel
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { mode: 'none', label: 'Original' },
                  { mode: 'sobel', label: 'Sobel Edges' },
                  { mode: 'grayscale', label: 'Grayscale' },
                  { mode: 'blur', label: 'Box Blur' },
                  { mode: 'threshold', label: 'Binary Threshold' },
                  { mode: 'noise', label: 'Noise Injection' },
                  { mode: 'invert', label: 'Invert Color' },
                ].map(({ mode, label }) => (
                  <button
                    key={mode}
                    onClick={() => setFilterMode(mode as any)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      filterMode === mode
                        ? 'bg-amber-500 text-zinc-950 font-semibold'
                        : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Parameter Sliders */}
            {filterMode === 'threshold' && (
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Threshold Cutoff</span>
                  <span>{thresholdVal}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={thresholdVal}
                  onChange={(e) => setThresholdVal(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            )}

            {filterMode === 'blur' && (
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Kernel Size (px)</span>
                  <span>{blurKernel}x{blurKernel}</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="15"
                  step="2"
                  value={blurKernel}
                  onChange={(e) => setBlurKernel(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            )}

            {filterMode === 'noise' && (
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Gaussian Noise Variance</span>
                  <span>{noiseLevel}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-zinc-900/80 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <span>OpenCV-style transformations run entirely client-side via HTML5 Canvas</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
