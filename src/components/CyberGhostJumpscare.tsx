import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cyberAudio } from '../utils/audio';

interface CyberGhostJumpscareProps {
  manualTriggerCount?: number;
}

export const CyberGhostJumpscare: React.FC<CyberGhostJumpscareProps> = ({ manualTriggerCount = 0 }) => {
  const [isActive, setIsActive] = useState(false);
  const [hasTriggeredAuto, setHasTriggeredAuto] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawHorrorFace = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    // Deep void black base
    ctx.fillStyle = '#050002';
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;

    // 1. Ghostly Necrotic Face Shroud
    const grad = ctx.createRadialGradient(cx, cy - 30, 20, cx, cy, 260);
    grad.addColorStop(0, '#e0d8d8');
    grad.addColorStop(0.35, '#8c8084');
    grad.addColorStop(0.7, '#241a1e');
    grad.addColorStop(1, '#050002');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(cx, cy - 20, 160, 230, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. Sunken Black Hollow Eye Sockets
    ctx.fillStyle = '#000000';
    // Left eye
    ctx.beginPath();
    ctx.ellipse(cx - 55, cy - 70, 38, 48, -0.15, 0, Math.PI * 2);
    ctx.fill();
    // Right eye
    ctx.beginPath();
    ctx.ellipse(cx + 55, cy - 70, 38, 48, 0.15, 0, Math.PI * 2);
    ctx.fill();

    // Piercing Demonic Blood-Red Pupils
    ctx.fillStyle = '#ff0022';
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 25;
    ctx.beginPath();
    ctx.arc(cx - 52, cy - 70, 7, 0, Math.PI * 2);
    ctx.arc(cx + 52, cy - 70, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // White intense pinpoint center
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx - 52, cy - 70, 2.5, 0, Math.PI * 2);
    ctx.arc(cx + 52, cy - 70, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Bloodshot Dark Veins
    ctx.strokeStyle = '#680010';
    ctx.lineWidth = 1.8;
    for (let i = 0; i < 14; i++) {
      ctx.beginPath();
      const angle = (i / 14) * Math.PI * 2;
      const startX = cx - 55 + Math.cos(angle) * 35;
      const startY = cy - 70 + Math.sin(angle) * 42;
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + (Math.random() - 0.5) * 45, startY + (Math.random() - 0.5) * 45);
      ctx.stroke();
    }

    // 3. Agonizing Screaming Gaping Maw (Abyss Mouth)
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 85, 55, 95, 0, 0, Math.PI * 2);
    ctx.fill();

    // Jagged Sharp Demon Teeth
    ctx.fillStyle = '#e6ddcb';
    // Upper teeth
    for (let x = cx - 45; x <= cx + 45; x += 11) {
      ctx.beginPath();
      ctx.moveTo(x - 5, cy + 20);
      ctx.lineTo(x + 5, cy + 20);
      ctx.lineTo(x, cy + 48 + (Math.random() * 12));
      ctx.closePath();
      ctx.fill();
    }
    // Lower teeth
    for (let x = cx - 40; x <= cx + 40; x += 12) {
      ctx.beginPath();
      ctx.moveTo(x - 5, cy + 155);
      ctx.lineTo(x + 5, cy + 155);
      ctx.lineTo(x, cy + 125 - (Math.random() * 10));
      ctx.closePath();
      ctx.fill();
    }

    // Throat Void Glow
    ctx.fillStyle = '#400008';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 85, 25, 45, 0, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const triggerJumpscare = useCallback(() => {
    setIsActive(true);
    cyberAudio.playJumpscareScreech();

    // Draw horror visage
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) drawHorrorFace(ctx, canvas.width, canvas.height);
      }
    }, 20);

    // Auto dismiss after 2.0 seconds
    setTimeout(() => {
      setIsActive(false);
    }, 2000);
  }, [drawHorrorFace]);

  // Random automatic trigger between 30 to 55 seconds
  useEffect(() => {
    if (hasTriggeredAuto) return;

    const randomDelay = Math.floor(Math.random() * 20000) + 30000;
    const timer = setTimeout(() => {
      setHasTriggeredAuto(true);
      triggerJumpscare();
    }, randomDelay);

    return () => clearTimeout(timer);
  }, [hasTriggeredAuto, triggerJumpscare]);

  // Manual trigger from terminal (e.g. typing 'ghost' or 'jumpscare')
  useEffect(() => {
    if (manualTriggerCount > 0) {
      triggerJumpscare();
    }
  }, [manualTriggerCount, triggerJumpscare]);

  if (!isActive) return null;

  return (
    <div
      onClick={() => setIsActive(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden cursor-pointer select-none"
    >
      {/* 1. Fullscreen Horror Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover animate-in zoom-in-150 duration-75 scale-125 filter contrast-150"
      />

      {/* 2. Violent Chromatic Strobe Flash Overlays */}
      <div className="absolute inset-0 bg-red-600/35 mix-blend-difference animate-ping [animation-duration:80ms] pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-90 pointer-events-none" />

      {/* 3. Terrifying Static Glitch Banner */}
      <div className="relative z-10 text-center space-y-2 pointer-events-none">
        <div className="text-3xl sm:text-6xl font-orbitron font-black text-red-600 tracking-widest uppercase drop-shadow-[0_0_25px_#ff0000] animate-pulse">
          ☠️ SYSTEM CORRUPTED ☠️
        </div>
        <div className="text-xs font-mono text-white bg-black/90 px-4 py-1.5 rounded border border-red-600 inline-block font-bold">
          [CRITICAL BREACH // ENTITY DETECTED // CLICK TO EXPEL]
        </div>
      </div>
    </div>
  );
};
