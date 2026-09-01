import React, { useState } from 'react';
import { Camera, Image, Upload } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  date: string;
  location: string;
  description: string;
  imageUrl?: string;
}

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'frame-1',
    title: 'IIT MADRAS ROBOTICS LAB & ROBO SOCCER',
    tag: 'ROBOTICS KINEMATICS',
    date: '2024 - 2025',
    location: 'IIT Madras, Chennai',
    description: 'Semi-finalist robotics kinematics testing, soccer robot chassis alignment, and real-time microcontroller tuning.',
  },
  {
    id: 'frame-2',
    title: 'VIT VELLORE EMBEDDED IoT & SENSOR BENCH',
    tag: 'HARDWARE LAB',
    date: '2024',
    location: 'VIT Vellore Campus',
    description: 'ESP32-S3 and STM32 sensor hardware bench, multi-sensor serial bus telemetry, and real-time UART/I2C monitoring.',
  },
  {
    id: 'frame-3',
    title: 'ECHO PROMETHEUS 1ST PLACE WINNER STAGE',
    tag: 'CHAMPIONSHIP',
    date: '2024',
    location: 'IIT Madras',
    description: '1st place championship presentation and deployment showcase for Echo Prometheus autonomous engineering system.',
  },
  {
    id: 'frame-4',
    title: 'WHITE HATS CYBER DEFENSE & CTF OPERATIONS',
    tag: 'CYBER DEFENSE',
    date: '2023 - 2025',
    location: 'VIT Vellore / Online',
    description: 'Defensive cybersecurity drills, network packet capture analysis, reverse engineering, and CTF challenge environments.',
  },
  {
    id: 'frame-5',
    title: 'DATA SCIENCE & COMPUTATIONAL LABS',
    tag: 'IITM DUAL BS',
    date: '2024 - 2025',
    location: 'IIT Madras Online / Research',
    description: 'Statistical ML computational experiments, data augmentation pipelines, and algorithm benchmarking.',
  },
  {
    id: 'frame-6',
    title: 'VORTEX 2.0 IEEE ROBOTICS DEMO',
    tag: 'IEEE SSN',
    date: '2024',
    location: 'SSN College of Engineering',
    description: 'Finalist robotics prototype presentation and live obstacle course autonomous navigation run.',
  },
];

export const PhotoGallerySection: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>(DEFAULT_GALLERY);

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setGallery((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, imageUrl: reader.result as string } : item
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="gallery" className="py-4 sm:py-6 relative font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-orange-500/30 pb-3">
          <div>
            <div className="text-xs text-emerald-400 font-bold tracking-widest uppercase flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-400" /> [SECTION 05] // OPERATIONAL PHOTO GALLERY
            </div>
            <h2 className="font-orbitron font-black text-2xl sm:text-3xl text-white mt-0.5">
              FIELD OPERATIONS & LAB GALLERY
            </h2>
          </div>

          <div className="text-[10px] text-neutral-400 bg-black px-3 py-1.5 border border-neutral-800">
            TOTAL FRAMES: {gallery.length} SLOTS READY
          </div>
        </div>

        {/* Gallery Grid (1.0s gap between consecutive frames) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {gallery.map((item, idx) => (
            <div
              key={item.id}
              style={{ animation: `slowFlowFadeUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 1.0 + 0.6}s both` }}
              className="cyber-card p-4 flex flex-col justify-between border border-neutral-800 hover:border-orange-500/80 transition-all space-y-3"
            >
              {/* Photo Frame / Image Display */}
              <div className="relative w-full h-[210px] bg-black border border-neutral-800 flex flex-col items-center justify-center overflow-hidden group">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                    <div className="w-12 h-12 bg-neutral-950 border border-neutral-800 flex items-center justify-center text-orange-400">
                      <Image className="w-6 h-6" />
                    </div>
                    <div className="font-orbitron font-bold text-[11px] text-neutral-300">
                      [FRAME {idx + 1}: PHOTO SLOT]
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      Ready for photo upload ({item.tag})
                    </div>
                  </div>
                )}

                {/* Upload Button Overlay */}
                <label className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/90 hover:bg-orange-500 hover:text-black border border-orange-500/50 text-orange-300 text-[10px] font-bold cursor-pointer transition-all flex items-center gap-1">
                  <Upload className="w-3 h-3" />
                  <span>{item.imageUrl ? 'REPLACE PHOTO' : 'UPLOAD PHOTO'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(item.id, e)}
                  />
                </label>
              </div>

              {/* Caption & Metadata */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="px-2 py-0.5 bg-orange-500/15 border border-orange-500/40 text-orange-400 font-bold">
                    {item.tag}
                  </span>
                  <span className="text-neutral-400">{item.date}</span>
                </div>

                <h3 className="font-orbitron font-bold text-white text-xs leading-snug">
                  {item.title}
                </h3>

                <div className="text-[10px] text-emerald-400">
                  📍 {item.location}
                </div>

                <p className="text-[11px] text-neutral-400 font-sans leading-relaxed pt-1 border-t border-neutral-900">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
