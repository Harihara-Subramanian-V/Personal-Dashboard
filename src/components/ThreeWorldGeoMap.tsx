import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MapPin, Radio } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

export const ThreeWorldGeoMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [deviceCoords, setDeviceCoords] = useState<{ lat: number; lon: number; label: string }>({
    lat: 12.9692,
    lon: 79.1559,
    label: 'VIT Vellore / Chennai Node (12.97° N, 79.16° E)',
  });
  const [isLiveGeo, setIsLiveGeo] = useState(false);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setDeviceCoords({
            lat: Number(pos.coords.latitude.toFixed(4)),
            lon: Number(pos.coords.longitude.toFixed(4)),
            label: `Live Device: ${pos.coords.latitude.toFixed(2)}° N, ${pos.coords.longitude.toFixed(2)}° E`,
          });
          setIsLiveGeo(true);
        },
        () => {
          // Default to VIT Vellore
        },
        { timeout: 5000 }
      );
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const R = 2.0;

    const latLonToVector3 = (lat: number, lon: number, radius: number = R) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // A. Deep Obsidian Inner Core
    const innerGeo = new THREE.SphereGeometry(R * 0.99, 48, 48);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x050508,
      transparent: true,
      opacity: 0.96,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // B. Atmospheric Rim Halo
    const haloGeo = new THREE.SphereGeometry(R * 1.12, 32, 32);
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          gl_FragColor = vec4(1.0, 0.42, 0.0, 1.0) * intensity;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const atmosphereHalo = new THREE.Mesh(haloGeo, haloMat);
    scene.add(atmosphereHalo);

    // C. Elegant Lat/Lon Coordinate Wireframe Grid
    const gridGeo = new THREE.SphereGeometry(R, 36, 18);
    const wireframe = new THREE.WireframeGeometry(gridGeo);
    const gridMat = new THREE.LineBasicMaterial({
      color: 0xff6b00,
      transparent: true,
      opacity: 0.16,
    });
    const gridSphere = new THREE.LineSegments(wireframe, gridMat);
    globeGroup.add(gridSphere);

    // D. High-Detail World Coastline Splines (Accurate Continent Paths)
    const coastlineSplines: Array<Array<[number, number]>> = [
      // 1. Indian Subcontinent & Coastal Boundaries
      [
        [35, 74], [34, 76], [31, 78], [28, 80], [27, 88], [26, 92], [24, 94],
        [22, 91], [21, 87], [18, 83], [14, 80], [10, 79], [8, 77], [9, 76],
        [13, 74], [16, 73], [19, 72], [22, 69], [24, 68], [27, 69], [31, 72],
        [34, 73], [35, 74]
      ],
      // Sri Lanka
      [[9.5, 80.2], [8.0, 81.5], [6.0, 80.5], [7.0, 79.8], [9.5, 80.2]],
      // 2. Eurasia & Europe Coastlines
      [
        [71, 28], [68, 44], [67, 75], [72, 120], [70, 170], [60, 160], [54, 140],
        [43, 132], [38, 120], [31, 122], [22, 114], [10, 107], [1, 104], [-8, 115],
        [15, 100], [22, 89], [25, 62], [25, 56], [12, 44], [29, 32], [36, 36],
        [41, 29], [38, 23], [36, -5], [43, -9], [48, -5], [54, 9], [60, 5],
        [69, 15], [71, 28]
      ],
      // British Isles
      [[58, -5], [55, -2], [50, 0], [50, -5], [54, -4], [58, -5]],
      // Japan
      [[44, 145], [40, 140], [35, 136], [32, 130], [34, 132], [38, 141], [44, 145]],
      // 3. Africa Coastline
      [
        [36, -5], [37, 10], [32, 25], [31, 32], [22, 37], [12, 44], [11, 51],
        [0, 42], [-10, 40], [-25, 33], [-34, 18], [-28, 15], [-12, 13], [4, 7],
        [5, 0], [14, -17], [28, -13], [36, -5]
      ],
      // Madagascar
      [[-12, 49], [-16, 50], [-25, 47], [-25, 44], [-16, 44], [-12, 49]],
      // 4. North America Coastlines & Gulf
      [
        [70, -140], [60, -140], [55, -130], [48, -124], [34, -120], [23, -110],
        [18, -100], [15, -92], [20, -87], [29, -89], [25, -80], [35, -75],
        [44, -64], [55, -60], [62, -64], [72, -80], [70, -110], [70, -140]
      ],
      // 5. South America Coastline
      [
        [11, -74], [10, -62], [5, -52], [-5, -35], [-15, -38], [-23, -42],
        [-35, -54], [-45, -64], [-55, -68], [-52, -74], [-38, -73], [-20, -70],
        [-5, -80], [4, -77], [11, -74]
      ],
      // 6. Australia & New Zealand
      [
        [-12, 131], [-15, 124], [-22, 114], [-32, 115], [-35, 118], [-38, 145],
        [-33, 151], [-25, 153], [-16, 145], [-12, 137], [-12, 131]
      ],
      // New Zealand
      [[-35, 174], [-41, 175], [-46, 168], [-42, 172], [-35, 174]],
    ];

    const borderMat = new THREE.LineBasicMaterial({
      color: 0xff7b00,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.9,
    });

    coastlineSplines.forEach((coords) => {
      // Smooth interpolation for smooth continental curves
      const vectors = coords.map(([lat, lon]) => latLonToVector3(lat, lon, R * 1.002));
      const curve = new THREE.CatmullRomCurve3(vectors, true);
      const points = curve.getPoints(coords.length * 5);
      const splineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const splineLine = new THREE.Line(splineGeo, borderMat);
      globeGroup.add(splineLine);
    });

    // E. High-Density Continental Surface Matrix Particles
    const particlesCount = 2200;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const landClusters = [
      { lat: 20, lon: 78, spread: 18 },  // India & South Asia
      { lat: 35, lon: 105, spread: 26 }, // East Asia
      { lat: 50, lon: 15, spread: 20 },  // Europe
      { lat: 8, lon: 22, spread: 25 },   // Africa
      { lat: 40, lon: -98, spread: 28 }, // North America
      { lat: -16, lon: -58, spread: 22 },// South America
      { lat: -25, lon: 135, spread: 16 },// Australia
      { lat: 36, lon: 138, spread: 8 },  // Japan
      { lat: 25, lon: 45, spread: 14 },  // Middle East
    ];

    for (let i = 0; i < particlesCount; i++) {
      const cluster = landClusters[Math.floor(Math.random() * landClusters.length)];
      const lat = cluster.lat + (Math.random() - 0.5) * cluster.spread * 2;
      const lon = cluster.lon + (Math.random() - 0.5) * cluster.spread * 2;

      const vec = latLonToVector3(lat, lon, R * 1.001);

      positions[i * 3] = vec.x;
      positions[i * 3 + 1] = vec.y;
      positions[i * 3 + 2] = vec.z;

      const isIndiaArea = Math.abs(lat - 13) < 16 && Math.abs(lon - 79) < 20;
      if (isIndiaArea) {
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = 0.45;
      } else {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.48;
        colors[i * 3 + 2] = 0.05;
      }
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    dotGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const dotMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const worldDots = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(worldDots);

    // F. Curved Global Data Transmission Arcs with Moving Pulse Particles
    const arcConnections: Array<{ from: [number, number]; to: [number, number] }> = [
      { from: [12.97, 79.16], to: [37.77, -122.41] }, // Chennai/Vellore -> Silicon Valley
      { from: [12.97, 79.16], to: [51.50, -0.12] },   // Chennai/Vellore -> London
      { from: [12.97, 79.16], to: [35.67, 139.65] },  // Chennai/Vellore -> Tokyo
      { from: [12.97, 79.16], to: [-33.86, 151.20] }, // Chennai/Vellore -> Sydney
      { from: [51.50, -0.12], to: [40.71, -74.00] },  // London -> New York
    ];

    const arcLines: THREE.Line[] = [];
    const arcPulses: THREE.Mesh[] = [];

    arcConnections.forEach(({ from, to }) => {
      const vFrom = latLonToVector3(from[0], from[1], R * 1.005);
      const vTo = latLonToVector3(to[0], to[1], R * 1.005);

      // Midpoint elevated outward in parabolic arc
      const mid = vFrom.clone().add(vTo).multiplyScalar(0.5);
      const dist = vFrom.distanceTo(vTo);
      mid.normalize().multiplyScalar(R * (1.0 + dist * 0.15));

      const curve = new THREE.QuadraticBezierCurve3(vFrom, mid, vTo);
      const pts = curve.getPoints(40);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(pts);

      const arcMat = new THREE.LineBasicMaterial({
        color: 0xffa726,
        transparent: true,
        opacity: 0.45,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);
      arcLines.push(arcLine);

      // Traveling glowing pulse photon
      const pulseGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.userData = { curve, progress: Math.random() };
      globeGroup.add(pulseMesh);
      arcPulses.push(pulseMesh);
    });

    // G. Emerald Pinpoint Beacon for Device / VIT Vellore
    const pinVec = latLonToVector3(deviceCoords.lat, deviceCoords.lon, R * 1.006);

    const markerGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0x00ff66 });
    const markerMesh = new THREE.Mesh(markerGeo, markerMat);
    markerMesh.position.copy(pinVec);
    globeGroup.add(markerMesh);

    const ringGeo = new THREE.RingGeometry(0.07, 0.22, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00ff66,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const beaconRing = new THREE.Mesh(ringGeo, ringMat);
    beaconRing.position.copy(pinVec.clone().multiplyScalar(1.01));
    beaconRing.lookAt(pinVec.clone().multiplyScalar(2));
    globeGroup.add(beaconRing);

    // Initial globe orientation to face India/Vellore
    globeGroup.rotation.y = -1.2;
    globeGroup.rotation.x = 0.25;

    // 3. Smooth Interactive 3D Orbit Dragging (Never snaps back!)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let velocityX = 0.0025;
    let velocityY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        globeGroup.rotation.y += deltaX * 0.008;
        globeGroup.rotation.x += deltaY * 0.008;

        velocityX = deltaX * 0.004;
        velocityY = deltaY * 0.004;
      }
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
      cyberAudio.playClick();
    };

    const handlePointerUp = () => {
      isDragging = false;
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

      // Free gentle continuous rotation around current axis
      if (!isDragging) {
        globeGroup.rotation.y += 0.0022;
        globeGroup.rotation.y += velocityX;
        globeGroup.rotation.x += velocityY;
        velocityX *= 0.95;
        velocityY *= 0.95;
      }

      globeGroup.rotation.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, globeGroup.rotation.x));

      // Animate arc transmission data pulses
      arcPulses.forEach((pulse) => {
        const curve = pulse.userData.curve as THREE.QuadraticBezierCurve3;
        pulse.userData.progress = (pulse.userData.progress + 0.008) % 1.0;
        const pt = curve.getPoint(pulse.userData.progress);
        pulse.position.copy(pt);
      });

      // Pulse beacon ring
      const pulse = 1 + (Math.sin(elapsedTime * 4) + 1) * 0.5;
      beaconRing.scale.set(pulse, pulse, pulse);
      beaconRing.material.opacity = 1 - (pulse - 1) * 0.7;

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
  }, [deviceCoords]);

  return (
    <div className="relative w-full max-w-[450px] h-[400px] sm:h-[460px] mx-auto flex items-center justify-center select-none">
      {/* 2D Cyber HUD Reticle Overlays */}
      <div className="absolute inset-2 border border-orange-500/20 rounded-full animate-radar pointer-events-none" />
      <div className="absolute inset-8 border border-dashed border-orange-500/30 rounded-full animate-spin [animation-duration:45s] pointer-events-none" />

      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing z-10"
        title="Interactive 3D Holographic Globe: Drag to freely rotate"
      />

      {/* Location Pinpoint Telemetry Banner */}
      <div className="absolute top-2 left-2 right-2 bg-black/85 backdrop-blur-md px-3 py-1.5 border border-orange-500/40 rounded flex items-center justify-between font-mono text-[10px] sm:text-[11px] pointer-events-none z-20">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <MapPin className="w-3.5 h-3.5 animate-bounce text-emerald-400" />
          <span>GEO_TARGET PINPOINTED</span>
        </div>
        <div className="text-orange-400 font-bold truncate max-w-[210px]">
          {isLiveGeo ? 'DEVICE LIVE NODE' : 'VIT VELLORE NODE (12.97° N, 79.16° E)'}
        </div>
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="absolute bottom-2 left-2 right-2 bg-black/85 backdrop-blur-md px-3 py-1.5 border border-neutral-800 rounded flex items-center justify-between font-mono text-[10px] text-neutral-400 pointer-events-none z-20">
        <div className="flex items-center gap-2">
          <Radio className="w-3 h-3 text-orange-500 animate-pulse" />
          <span>GEO_ARCS: 5 TELEMETRY LINKS</span>
        </div>
        <span className="text-orange-400">FREE DRAG ROTATION</span>
      </div>
    </div>
  );
};
