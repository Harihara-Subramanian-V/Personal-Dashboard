import React, { useState, useEffect, useRef } from 'react';
import { Bot, Radio, RotateCcw } from 'lucide-react';
import { cyberAudio } from '../../utils/audio';

type GestureDirection = 'IDLE' | 'FORWARD' | 'BACKWARD' | 'LEFT' | 'RIGHT' | 'BRAKE';

export const GestureBotSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeGesture, setActiveGesture] = useState<GestureDirection>('IDLE');
  const [robotPos, setRobotPos] = useState({ x: 220, y: 130, angle: 0, speed: 0 });
  const [gyroX, setGyroX] = useState<number>(0);
  const [gyroY, setGyroY] = useState<number>(0);
  const [batteryLevel] = useState<number>(94);
  const [packetCount, setPacketCount] = useState<number>(312);

  // Animate robot movement on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid terrain
      ctx.strokeStyle = 'rgba(255, 107, 0, 0.1)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Station Point Anchor Target
      ctx.beginPath();
      ctx.arc(220, 130, 28, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 107, 0, 0.3)';
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(255, 167, 38, 0.15)';
      ctx.fill();

      ctx.fillStyle = '#ff8800';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillText('STATION_POINT', 185, 134);

      // Draw Robot Body
      ctx.save();
      ctx.translate(robotPos.x, robotPos.y);
      ctx.rotate(robotPos.angle);

      // Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(-22, -16, 44, 32);

      // Robot Chassis
      ctx.fillStyle = '#181824';
      ctx.strokeStyle = '#ff6b00';
      ctx.lineWidth = 2;
      ctx.fillRect(-20, -14, 40, 28);
      ctx.strokeRect(-20, -14, 40, 28);

      // Wheels
      ctx.fillStyle = '#ff8c00';
      ctx.fillRect(-18, -18, 10, 5);
      ctx.fillRect(8, -18, 10, 5);
      ctx.fillRect(-18, 13, 10, 5);
      ctx.fillRect(8, 13, 10, 5);

      // Heading indicator LED
      ctx.fillStyle = activeGesture !== 'IDLE' && activeGesture !== 'BRAKE' ? '#00ff66' : '#ff3e00';
      ctx.beginPath();
      ctx.arc(14, 0, 3, 0, Math.PI * 2);
      ctx.fill();

      // Core Microcontroller Icon
      ctx.fillStyle = '#ffffff';
      ctx.font = '8px "JetBrains Mono", monospace';
      ctx.fillText('ESP32', -12, 3);

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [robotPos, activeGesture]);

  // Update physics loop based on gesture
  useEffect(() => {
    const interval = setInterval(() => {
      setPacketCount((p) => p + 1);

      setRobotPos((prev) => {
        let newAngle = prev.angle;
        let newX = prev.x;
        let newY = prev.y;
        let speed = prev.speed;

        if (activeGesture === 'FORWARD') {
          speed = 2.4;
          newX += Math.cos(newAngle) * speed;
          newY += Math.sin(newAngle) * speed;
          setGyroY(-28.4);
        } else if (activeGesture === 'BACKWARD') {
          speed = -1.8;
          newX += Math.cos(newAngle) * speed;
          newY += Math.sin(newAngle) * speed;
          setGyroY(24.2);
        } else if (activeGesture === 'LEFT') {
          newAngle -= 0.08;
          setGyroX(-32.1);
        } else if (activeGesture === 'RIGHT') {
          newAngle += 0.08;
          setGyroX(32.1);
        } else if (activeGesture === 'BRAKE') {
          speed = 0;
          setGyroX(0);
          setGyroY(0);
        } else {
          // Autonomous return to station point stabilization
          const dx = 220 - prev.x;
          const dy = 130 - prev.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 2) {
            newX += dx * 0.03;
            newY += dy * 0.03;
          }
          setGyroX(Number((Math.sin(Date.now() * 0.005) * 1.5).toFixed(1)));
          setGyroY(Number((Math.cos(Date.now() * 0.005) * 1.2).toFixed(1)));
        }

        // Boundary constraints
        newX = Math.max(30, Math.min(410, newX));
        newY = Math.max(30, Math.min(230, newY));

        return { x: newX, y: newY, angle: newAngle, speed };
      });
    }, 40);

    return () => clearInterval(interval);
  }, [activeGesture]);

  const triggerGesture = (gesture: GestureDirection) => {
    cyberAudio.playClick();
    setActiveGesture(gesture);
  };

  const resetStationPoint = () => {
    cyberAudio.playAccessGranted();
    setActiveGesture('IDLE');
    setRobotPos({ x: 220, y: 130, angle: 0, speed: 0 });
  };

  return (
    <div className="space-y-4 text-xs font-mono">
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orange-500/20 pb-3">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-orange-400" />
          <span className="font-orbitron text-sm font-bold text-orange-400">
            GESTURE BOT TELEMETRY // ROBOVITICS NIGHTSLIPS & STATION-POINT
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-neutral-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> ESP32 RF LINK: 2.4GHz
          </span>
          <span>BATTERY: <strong className="text-orange-400">{batteryLevel}%</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Rover Canvas Simulation */}
        <div className="lg:col-span-2 relative bg-black/80 rounded border border-orange-500/30 overflow-hidden flex flex-col items-center justify-center p-2">
          <canvas
            ref={canvasRef}
            width={440}
            height={260}
            className="w-full max-h-[280px] object-contain rounded border border-orange-500/20"
          />

          <div className="absolute top-4 left-4 bg-black/70 px-2 py-0.5 rounded text-[10px] text-orange-400 border border-orange-500/30">
            AUTONOMOUS STABILIZER: {activeGesture === 'IDLE' ? 'STATION LOCKED' : 'MANUAL OVERRIDE'}
          </div>

          <button
            onClick={resetStationPoint}
            className="absolute bottom-4 right-4 bg-black/80 hover:bg-neutral-900 border border-orange-500/40 text-orange-300 px-2.5 py-1 rounded text-[11px] flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset Anchor
          </button>
        </div>

        {/* Gesture Input Controls & IMU Gauges */}
        <div className="bg-black/60 p-3 rounded border border-orange-500/20 space-y-3">
          <div className="text-orange-400 font-bold uppercase flex items-center justify-between">
            <span>Gesture Matrix Glove</span>
            <span className="text-[10px] text-neutral-400">STATE: {activeGesture}</span>
          </div>

          {/* D-Pad Style Gesture Controller */}
          <div className="flex flex-col items-center gap-1.5 py-1">
            <button
              onMouseDown={() => triggerGesture('FORWARD')}
              onMouseUp={() => triggerGesture('IDLE')}
              onTouchStart={() => triggerGesture('FORWARD')}
              onTouchEnd={() => triggerGesture('IDLE')}
              className="px-4 py-2 bg-orange-500/20 border border-orange-500/50 hover:bg-orange-500 hover:text-black rounded text-center font-bold transition-colors w-32"
            >
              ▲ TILT FORWARD
            </button>
            <div className="flex gap-2">
              <button
                onMouseDown={() => triggerGesture('LEFT')}
                onMouseUp={() => triggerGesture('IDLE')}
                onTouchStart={() => triggerGesture('LEFT')}
                onTouchEnd={() => triggerGesture('IDLE')}
                className="px-3 py-2 bg-orange-500/20 border border-orange-500/50 hover:bg-orange-500 hover:text-black rounded font-bold transition-colors"
              >
                ◀ TILT LEFT
              </button>
              <button
                onClick={() => triggerGesture('BRAKE')}
                className="px-3 py-2 bg-red-950/60 border border-red-500/50 text-red-300 hover:bg-red-600 hover:text-white rounded font-bold transition-colors"
              >
                ■ BRAKE
              </button>
              <button
                onMouseDown={() => triggerGesture('RIGHT')}
                onMouseUp={() => triggerGesture('IDLE')}
                onTouchStart={() => triggerGesture('RIGHT')}
                onTouchEnd={() => triggerGesture('IDLE')}
                className="px-3 py-2 bg-orange-500/20 border border-orange-500/50 hover:bg-orange-500 hover:text-black rounded font-bold transition-colors"
              >
                TILT RIGHT ▶
              </button>
            </div>
            <button
              onMouseDown={() => triggerGesture('BACKWARD')}
              onMouseUp={() => triggerGesture('IDLE')}
              onTouchStart={() => triggerGesture('BACKWARD')}
              onTouchEnd={() => triggerGesture('IDLE')}
              className="px-4 py-2 bg-orange-500/20 border border-orange-500/50 hover:bg-orange-500 hover:text-black rounded text-center font-bold transition-colors w-32"
            >
              ▼ TILT BACK
            </button>
          </div>

          {/* Telemetry Sensor Readout */}
          <div className="pt-2 border-t border-neutral-800 space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-neutral-400">MPU6050 Gyro Pitch (Y):</span>
              <span className="text-orange-400">{gyroY}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">MPU6050 Gyro Roll (X):</span>
              <span className="text-orange-400">{gyroX}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Kinematic Coordinates:</span>
              <span className="text-emerald-400 font-mono">X:{Math.round(robotPos.x)} Y:{Math.round(robotPos.y)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">ESP32 Packets RX:</span>
              <span className="text-neutral-300">#{packetCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
