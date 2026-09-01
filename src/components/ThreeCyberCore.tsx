import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { cyberAudio } from '../utils/audio';

interface ThreeCyberCoreProps {
  onInteract?: () => void;
}

export const ThreeCyberCore: React.FC<ThreeCyberCoreProps> = ({ onInteract }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // A. Outer Wireframe Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(2.1, 1);
    const icoWireframe = new THREE.WireframeGeometry(icoGeometry);
    const icoLineMaterial = new THREE.LineBasicMaterial({
      color: 0xff6b00,
      transparent: true,
      opacity: 0.65,
      linewidth: 1.5,
    });
    const outerIco = new THREE.LineSegments(icoWireframe, icoLineMaterial);
    coreGroup.add(outerIco);

    // B. Middle Torus Knot / Quantum Ring
    const knotGeometry = new THREE.TorusKnotGeometry(1.2, 0.28, 64, 16, 2, 3);
    const knotMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8c00,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const innerKnot = new THREE.Mesh(knotGeometry, knotMaterial);
    coreGroup.add(innerKnot);

    // C. Glowing Inner Node Center
    const centerGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const centerMat = new THREE.MeshBasicMaterial({
      color: 0xffa726,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const centerSphere = new THREE.Mesh(centerGeo, centerMat);
    coreGroup.add(centerSphere);

    // D. Swirling 3D Holographic Particles
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.4 + Math.random() * 1.4;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffa726,
      size: 0.055,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // 3. Mouse Parallax & Drag Interactivity
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let shockwaveScale = 1;
    let shockwaveDecay = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        coreGroup.rotation.y += deltaX * 0.01;
        coreGroup.rotation.x += deltaY * 0.01;
      } else {
        targetRotationY = mouseX * 0.8;
        targetRotationX = -mouseY * 0.8;
      }

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousMousePosition = { x: e.clientX, y: e.clientY };
      shockwaveScale = 1.35;
      shockwaveDecay = 0.025;
      cyberAudio.playScanSweep();
      setPulseCount((prev) => prev + 1);
      if (onInteract) onInteract();
    };

    const handlePointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    // 4. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 5. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth auto-rotation + mouse follow
      if (!isDragging) {
        coreGroup.rotation.y += 0.006;
        coreGroup.rotation.x += 0.003;
        coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.04;
        coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.04;
      }

      // Internal element counter-rotations
      outerIco.rotation.y -= 0.008;
      innerKnot.rotation.x += 0.012;
      innerKnot.rotation.z -= 0.009;
      centerSphere.rotation.y += 0.02;

      // Dynamic breathing scale
      const breathe = 1 + Math.sin(elapsedTime * 2) * 0.04;
      
      // Shockwave burst physics
      if (shockwaveScale > 1) {
        shockwaveScale -= shockwaveDecay;
        if (shockwaveScale < 1) shockwaveScale = 1;
      }

      coreGroup.scale.set(breathe * shockwaveScale, breathe * shockwaveScale, breathe * shockwaveScale);

      // Particle floating drift
      const positionsArr = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positionsArr[i3] = originalPositions[i3] + Math.sin(elapsedTime * 1.5 + i) * 0.08;
        positionsArr[i3 + 1] = originalPositions[i3 + 1] + Math.cos(elapsedTime * 1.2 + i) * 0.08;
        positionsArr[i3 + 2] = originalPositions[i3 + 2] + Math.sin(elapsedTime * 1.8 + i) * 0.08;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onInteract]);

  return (
    <div className="relative w-full max-w-[420px] h-[380px] sm:h-[440px] mx-auto flex items-center justify-center select-none">
      {/* 2D Cyber HUD Reticle Ring Overlays */}
      <div className="absolute inset-4 border border-orange-500/20 rounded-full animate-radar pointer-events-none" />
      <div className="absolute inset-10 border border-dashed border-orange-500/30 rounded-full animate-spin [animation-duration:35s] pointer-events-none" />
      <div className="absolute inset-16 border border-orange-500/15 rounded-full pointer-events-none" />

      {/* Crosshair telemetry lines */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent pointer-events-none" />
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-orange-500/30 to-transparent pointer-events-none" />

      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing z-10"
        title="Interactive 3D Cyber Core: Click & Drag to Rotate / Trigger Pulse Shockwave"
      />

      {/* HUD Telemetry Labels */}
      <div className="absolute bottom-2 left-3 text-[10px] font-mono text-orange-400/80 bg-black/60 px-2 py-0.5 border border-orange-500/30 rounded flex items-center gap-1.5 backdrop-blur-sm pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
        CORE: {isInteracting ? 'ACTIVE OVERRIDE' : 'STABLE HARMONIC'}
      </div>

      <div className="absolute bottom-2 right-3 text-[10px] font-mono text-orange-400/80 bg-black/60 px-2 py-0.5 border border-orange-500/30 rounded backdrop-blur-sm pointer-events-none">
        SHOCKWAVES: {pulseCount}
      </div>

      <div className="absolute top-2 left-3 text-[10px] font-mono text-neutral-400 bg-black/60 px-2 py-0.5 border border-orange-500/20 rounded backdrop-blur-sm pointer-events-none">
        DRAG // ROTATE 3D CORE
      </div>
    </div>
  );
};
