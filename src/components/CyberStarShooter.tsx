import React, { useRef, useEffect, useState } from 'react';
import { X, Trophy, Shield } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

interface CyberStarShooterProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Enemy {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hp: number;
  maxHp: number;
  type: 'drone' | 'asteroid' | 'boss';
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

export const CyberStarShooter: React.FC<CyberStarShooterProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('cyber_star_shooter_highscore');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animId: number;
    let playerX = canvas.width / 2;
    let playerY = canvas.height - 90;
    const playerSpeed = 8;

    let keys: Record<string, boolean> = {};
    let bullets: Bullet[] = [];
    let enemies: Enemy[] = [];
    let particles: Particle[] = [];
    let stars: Array<{ x: number; y: number; s: number; speed: number }> = [];

    // Background starfield
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: Math.random() * 2 + 1,
        speed: Math.random() * 2 + 0.5,
      });
    }

    let lastShotTime = 0;
    let lastEnemySpawn = 0;
    let currentScore = 0;
    let currentHp = 100;
    let isDead = false;

    let localHigh = 0;
    try {
      const saved = localStorage.getItem('cyber_star_shooter_highscore');
      localHigh = saved ? parseInt(saved, 10) : 0;
    } catch {
      localHigh = 0;
    }

    const updateHighScore = (val: number) => {
      if (val > localHigh) {
        localHigh = val;
        setHighScore(val);
        try {
          localStorage.setItem('cyber_star_shooter_highscore', String(val));
          window.dispatchEvent(new CustomEvent('star_shooter_highscore_updated', { detail: val }));
        } catch {}
      }
    };

    const spawnEnemy = () => {
      const isBoss = Math.random() < 0.12 && currentScore > 200;
      const type = isBoss ? 'boss' : Math.random() < 0.5 ? 'drone' : 'asteroid';
      enemies.push({
        x: Math.random() * (canvas.width - 60) + 30,
        y: -40,
        vx: (Math.random() - 0.5) * 2,
        vy: isBoss ? 1.2 : Math.random() * 2 + 1.8,
        size: isBoss ? 38 : type === 'asteroid' ? 24 : 18,
        hp: isBoss ? 8 : type === 'asteroid' ? 3 : 1,
        maxHp: isBoss ? 8 : type === 'asteroid' ? 3 : 1,
        type,
        color: isBoss ? '#ff0055' : type === 'asteroid' ? '#ffa726' : '#ff3300',
      });
    };

    const createExplosion = (x: number, y: number, color: string, count = 12) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = Math.random() * 4 + 1.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          alpha: 1.0,
          color,
          size: Math.random() * 3 + 1.5,
        });
      }
    };

    const shoot = () => {
      const now = Date.now();
      if (now - lastShotTime > 160) {
        bullets.push({
          x: playerX - 12,
          y: playerY - 14,
          vx: 0,
          vy: -11,
        });
        bullets.push({
          x: playerX + 12,
          y: playerY - 14,
          vx: 0,
          vy: -11,
        });
        cyberAudio.playClick();
        lastShotTime = now;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.code] = true;
      if (e.code === 'Space' && !isDead) {
        e.preventDefault();
        shoot();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.code] = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      playerX = e.clientX;
    };

    const handleMouseDown = () => {
      if (!isDead) shoot();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    const loop = () => {
      animId = requestAnimationFrame(loop);

      if (keys['ArrowLeft'] || keys['KeyA']) {
        playerX = Math.max(30, playerX - playerSpeed);
      }
      if (keys['ArrowRight'] || keys['KeyD']) {
        playerX = Math.min(canvas.width - 30, playerX + playerSpeed);
      }

      ctx.fillStyle = 'rgba(7, 7, 9, 0.35)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Starfield
      ctx.fillStyle = '#ffffff';
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
        ctx.fillRect(star.x, star.y, star.s, star.s);
      });

      // 2. Spawn Enemies
      const now = Date.now();
      if (now - lastEnemySpawn > 900 && !isDead) {
        spawnEnemy();
        lastEnemySpawn = now;
      }

      // 3. Update & Draw Bullets
      ctx.fillStyle = '#00ff88';
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 10;
      bullets.forEach((b, bIdx) => {
        b.y += b.vy;
        ctx.fillRect(b.x - 2, b.y - 8, 4, 14);

        enemies.forEach((en, enIdx) => {
          const dist = Math.hypot(b.x - en.x, b.y - en.y);
          if (dist < en.size + 4) {
            en.hp -= 1;
            bullets.splice(bIdx, 1);
            createExplosion(b.x, b.y, '#00ff88', 6);

            if (en.hp <= 0) {
              cyberAudio.playClick();
              createExplosion(en.x, en.y, en.color, en.type === 'boss' ? 36 : 16);
              enemies.splice(enIdx, 1);
              currentScore += en.type === 'boss' ? 50 : 10;
              setScore(currentScore);
              updateHighScore(currentScore);
            }
          }
        });

        if (b.y < -20) bullets.splice(bIdx, 1);
      });
      ctx.shadowBlur = 0;

      // 4. Update & Draw Enemies
      enemies.forEach((en, eIdx) => {
        en.y += en.vy;
        en.x += en.vx;

        if (en.x < en.size || en.x > canvas.width - en.size) en.vx *= -1;

        ctx.fillStyle = en.color;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        if (en.type === 'boss') {
          ctx.arc(en.x, en.y, en.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else if (en.type === 'drone') {
          ctx.moveTo(en.x, en.y + en.size);
          ctx.lineTo(en.x - en.size, en.y - en.size);
          ctx.lineTo(en.x, en.y - en.size * 0.4);
          ctx.lineTo(en.x + en.size, en.y - en.size);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.arc(en.x, en.y, en.size, 0, Math.PI * 2);
          ctx.fill();
        }

        const pDist = Math.hypot(en.x - playerX, en.y - playerY);
        if (pDist < en.size + 20 && !isDead) {
          createExplosion(playerX, playerY, '#ff4400', 25);
          currentHp -= en.type === 'boss' ? 40 : 20;
          setHealth(Math.max(0, currentHp));
          enemies.splice(eIdx, 1);
          cyberAudio.playAlert();

          if (currentHp <= 0) {
            isDead = true;
            setGameOver(true);
            cyberAudio.playAlert();
            updateHighScore(currentScore);
          }
        }

        if (en.y > canvas.height + 40) enemies.splice(eIdx, 1);
      });

      // 5. Update & Draw Particles
      particles.forEach((p, pIdx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        if (p.alpha <= 0) particles.splice(pIdx, 1);
      });

      // 6. Draw Player Starfighter
      if (!isDead) {
        ctx.shadowColor = '#ff8800';
        ctx.shadowBlur = 16;
        ctx.fillStyle = '#ff6b00';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(playerX, playerY - 26);
        ctx.lineTo(playerX - 22, playerY + 16);
        ctx.lineTo(playerX - 10, playerY + 8);
        ctx.lineTo(playerX, playerY + 14);
        ctx.lineTo(playerX + 10, playerY + 8);
        ctx.lineTo(playerX + 22, playerY + 16);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#00ffff';
        ctx.beginPath();
        ctx.arc(playerX, playerY - 4, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = Math.random() < 0.5 ? '#ff4400' : '#ffa726';
        ctx.beginPath();
        ctx.moveTo(playerX - 6, playerY + 14);
        ctx.lineTo(playerX + 6, playerY + 14);
        ctx.lineTo(playerX, playerY + 28 + Math.random() * 8);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen, onClose]);

  const handleRestart = () => {
    cyberAudio.playClick();
    setScore(0);
    setHealth(100);
    setGameOver(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 select-none animate-in fade-in">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />

      {/* Top HUD Stats Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none font-mono text-xs z-10">
        <div className="flex items-center gap-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded border border-orange-500/40">
          <div className="flex items-center gap-1.5 text-orange-400 font-bold">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>SCORE: {score}</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>SHIELD: {health}%</span>
          </div>

          {highScore > 0 && (
            <span className="text-neutral-400 hidden sm:inline">HIGH: {highScore}</span>
          )}
        </div>

        <button
          onClick={onClose}
          className="pointer-events-auto p-2 bg-neutral-900 hover:bg-orange-500 hover:text-black border border-neutral-800 rounded text-neutral-300 transition-all font-mono"
          title="Exit Star Shooter (ESC)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Game Over Screen */}
      {gameOver && (
        <div className="relative z-20 p-6 bg-black/90 border-2 border-red-500 rounded-lg text-center space-y-4 font-mono max-w-sm mx-4 animate-in zoom-in-95">
          <h2 className="text-2xl font-orbitron font-black text-red-500">SHIP COMPROMISED</h2>
          <div className="space-y-1 text-xs text-neutral-300">
            <div>FINAL SCORE: <strong className="text-orange-400 text-lg font-orbitron">{score}</strong></div>
            <div className="text-neutral-400">Tactical simulation complete.</div>
          </div>

          <div className="flex justify-center gap-2 pt-2">
            <button
              onClick={handleRestart}
              className="px-5 py-2 bg-orange-500 text-black font-bold font-orbitron rounded text-xs hover:bg-orange-400 transition-all"
            >
              RESPAWN SHIP
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 rounded text-xs"
            >
              EXIT
            </button>
          </div>
        </div>
      )}

      {/* Instructions Pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/75 px-4 py-1.5 rounded-full border border-neutral-800 font-mono text-[11px] text-neutral-400 pointer-events-none z-10">
        [MOUSE / ARROWS: Move Ship] • [CLICK / SPACE: Fire Plasma Lasers] • [ESC: Close]
      </div>
    </div>
  );
};
