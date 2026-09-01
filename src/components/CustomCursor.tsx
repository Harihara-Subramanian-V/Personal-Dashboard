import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instantly position the center laser dot with zero lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering interactive elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.cyber-card') ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // High-performance smooth ring follow loop (lerp)
    const renderLoop = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.28;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.28;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Precision Laser Center Reticle Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-[4px] -mt-[4px] will-change-transform pointer-events-none"
      >
        <div
          className={`w-2 h-2 rounded-full transition-colors duration-150 ${
            isClicking
              ? 'bg-white shadow-[0_0_12px_#ffffff] scale-125'
              : isHovered
              ? 'bg-emerald-400 shadow-[0_0_10px_#00ff66] scale-110'
              : 'bg-orange-500 shadow-[0_0_8px_#ff6b00]'
          }`}
        />
      </div>

      {/* Cyber Reticle Targeting Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -ml-[18px] -mt-[18px] will-change-transform pointer-events-none"
      >
        <div
          className={`relative rounded-full transition-all duration-200 flex items-center justify-center ${
            isClicking
              ? 'w-9 h-9 border-2 border-white scale-90 bg-white/20'
              : isHovered
              ? 'w-10 h-10 border border-emerald-400 scale-125 bg-emerald-500/10 rotate-45'
              : 'w-9 h-9 border border-orange-500/60 scale-100'
          }`}
        >
          {/* Crosshair Corner Ticks */}
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-orange-400" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-orange-400" />
          <span className="absolute -left-1 top-1/2 -translate-y-1/2 h-0.5 w-1 bg-orange-400" />
          <span className="absolute -right-1 top-1/2 -translate-y-1/2 h-0.5 w-1 bg-orange-400" />
        </div>
      </div>
    </div>
  );
};
