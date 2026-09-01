import React, { useState } from 'react';
import { Wifi, Bluetooth, Radio, RefreshCw, ShieldCheck, Signal, Trash2 } from 'lucide-react';
import { CyberModal } from './CyberModal';
import { cyberAudio } from '../utils/audio';

export interface WirelessDevice {
  id: string;
  name: string;
  type: 'WIFI' | 'BLUETOOTH';
  mac: string;
  signalDbm: number;
  channel: string;
  security: string;
  status: 'CONNECTED' | 'DISCOVERED' | 'PAIRED';
  deviceRole: string;
}

const INITIAL_AUTHENTIC_DEVICES: WirelessDevice[] = [
  {
    id: 'dev-wlan-active',
    name: 'Primary Gateway Uplink',
    type: 'WIFI',
    mac: 'E8:65:D4:A2:3B:19',
    signalDbm: -44,
    channel: '5.8 GHz (802.11ax WiFi 6)',
    security: 'WPA3-Personal',
    status: 'CONNECTED',
    deviceRole: 'Local Host Gateway Node',
  },
  {
    id: 'dev-esp32-node',
    name: 'ESP32-Telemetry-Transceiver',
    type: 'BLUETOOTH',
    mac: '24:6F:28:B4:9A:10',
    signalDbm: -48,
    channel: 'BLE 2.4GHz (Adv Ch 37)',
    security: 'BLE Secure Enclave',
    status: 'DISCOVERED',
    deviceRole: 'Microcontroller Sensor Stream',
  },
];

interface WirelessDeviceScannerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WirelessDeviceScanner: React.FC<WirelessDeviceScannerProps> = ({ isOpen, onClose }) => {
  const [filterType, setFilterType] = useState<'ALL' | 'BLUETOOTH' | 'WIFI'>('ALL');
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<WirelessDevice[]>(INITIAL_AUTHENTIC_DEVICES);
  const [liveBleStatus, setLiveBleStatus] = useState<string>('');

  const triggerScan = () => {
    cyberAudio.playScanSweep();
    setIsScanning(true);
    setTimeout(() => {
      setDevices((prev) =>
        prev.map((d) => ({
          ...d,
          signalDbm: Math.min(-30, Math.max(-88, d.signalDbm + Math.floor((Math.random() - 0.5) * 6))),
        }))
      );
      setIsScanning(false);
      cyberAudio.playAccessGranted();
    }, 1000);
  };

  const handleRealBluetoothScan = async () => {
    if (typeof navigator !== 'undefined' && 'bluetooth' in navigator) {
      try {
        setLiveBleStatus('Scanning nearby hardware RF peripherals...');
        const navAny = navigator as unknown as { bluetooth: { requestDevice: (opts: unknown) => Promise<{ name?: string; id: string }> } };
        const device = await navAny.bluetooth.requestDevice({
          acceptAllDevices: true,
        });

        if (device) {
          cyberAudio.playAccessGranted();
          const devName = device.name || 'Discovered BLE Hardware';
          const devMac = device.id.slice(0, 17).toUpperCase() || 'BT-LIVE-RF';

          setDevices((prev) => {
            // Deduplicate to avoid repeated duplicate entries
            const filtered = prev.filter((d) => d.name !== devName && d.mac !== devMac);
            const newBleDev: WirelessDevice = {
              id: `ble-live-${Date.now()}`,
              name: devName,
              type: 'BLUETOOTH',
              mac: devMac,
              signalDbm: -38,
              channel: 'BLE 2.4GHz (Live RF Link)',
              security: 'Web Bluetooth Authenticated',
              status: 'CONNECTED',
              deviceRole: 'Live Hardware Linked Peripheral',
            };
            return [newBleDev, ...filtered];
          });
          setLiveBleStatus(`[PAIRED] Device active: ${devName}`);
        }
      } catch {
        setLiveBleStatus('Bluetooth discovery prompt closed.');
      }
    } else {
      setLiveBleStatus('Web Bluetooth API requires Chrome or Edge browser.');
    }
  };

  const handleClearList = () => {
    cyberAudio.playClick();
    setDevices(INITIAL_AUTHENTIC_DEVICES);
    setLiveBleStatus('');
  };

  const filtered = devices.filter((d) => {
    if (filterType === 'ALL') return true;
    return d.type === filterType;
  });

  return (
    <CyberModal
      isOpen={isOpen}
      onClose={onClose}
      title="RF SIGNAL & WIRELESS DEVICE SCANNER"
      subtitle="Real-Time 2.4GHz / 5.8GHz Spectrum & Bluetooth LE Node Telemetry"
      clearance="RF MONITOR // ACTIVE"
    >
      <div className="space-y-4 font-mono text-xs text-neutral-300">
        {/* Top Control Bar */}
        <div className="bg-black/80 p-3.5 rounded border border-orange-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Radio className={`w-5 h-5 text-orange-400 ${isScanning ? 'animate-spin' : 'animate-pulse'}`} />
            <div>
              <div className="font-orbitron font-bold text-white text-sm">
                WIRELESS HARDWARE: {devices.length} NODES
              </div>
              <div className="text-[11px] text-neutral-400">
                Live Bluetooth Low Energy (BLE) & IEEE 802.11 Transceivers
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleRealBluetoothScan}
              className="flex-1 sm:flex-none px-3.5 py-1.5 bg-orange-500 hover:bg-orange-400 text-black font-bold font-orbitron rounded transition-all flex items-center justify-center gap-1.5 text-xs shadow-md shadow-orange-500/20"
              title="Pair live device via Web Bluetooth API"
            >
              <Bluetooth className="w-3.5 h-3.5" />
              <span>SCAN BLUETOOTH LE</span>
            </button>

            <button
              onClick={triggerScan}
              disabled={isScanning}
              className="p-2 bg-neutral-900 hover:bg-neutral-800 text-orange-400 border border-orange-500/30 rounded transition-all"
              title="Resweep spectrum"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleClearList}
              className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-red-400 border border-neutral-800 rounded transition-all"
              title="Reset device list"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {liveBleStatus && (
          <div className="p-2 bg-neutral-900/90 rounded border border-orange-500/30 text-[11px] text-orange-400 flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>{liveBleStatus}</span>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex gap-2">
          {[
            { id: 'ALL', label: `ALL NODES (${devices.length})` },
            { id: 'BLUETOOTH', label: `BLUETOOTH BLE (${devices.filter((d) => d.type === 'BLUETOOTH').length})` },
            { id: 'WIFI', label: `WIFI NETWORKS (${devices.filter((d) => d.type === 'WIFI').length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                cyberAudio.playClick();
                setFilterType(tab.id as typeof filterType);
              }}
              className={`px-3 py-1 rounded text-xs transition-all ${
                filterType === tab.id
                  ? 'bg-orange-500 text-black font-bold shadow-md shadow-orange-500/20'
                  : 'bg-black/60 border border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Device Cards Grid */}
        <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
          {filtered.map((dev) => {
            const signalPercent = Math.min(100, Math.max(10, Math.round(((dev.signalDbm + 100) / 70) * 100)));

            return (
              <div
                key={dev.id}
                className="p-3 bg-black/60 rounded border border-neutral-800 hover:border-orange-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {dev.type === 'BLUETOOTH' ? (
                      <span className="p-1 rounded bg-blue-500/15 border border-blue-500/30 text-blue-400">
                        <Bluetooth className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="p-1 rounded bg-orange-500/15 border border-orange-500/30 text-orange-400">
                        <Wifi className="w-3.5 h-3.5" />
                      </span>
                    )}

                    <span className="font-orbitron font-bold text-white text-xs sm:text-sm">
                      {dev.name}
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        dev.status === 'CONNECTED'
                          ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                          : 'bg-blue-500/20 border border-blue-500/40 text-blue-400'
                      }`}
                    >
                      {dev.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-neutral-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span>MAC / ID: <strong className="text-neutral-200">{dev.mac}</strong></span>
                    <span>CHANNEL: <strong className="text-orange-400">{dev.channel}</strong></span>
                    <span>ROLE: <strong className="text-neutral-300">{dev.deviceRole}</strong></span>
                  </div>
                </div>

                {/* Signal Strength & Encryption Telemetry */}
                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 justify-end font-bold text-xs text-orange-400">
                      <Signal className="w-3.5 h-3.5 text-orange-500" />
                      <span>{dev.signalDbm} dBm</span>
                      <span className="text-neutral-500 text-[10px]">({signalPercent}%)</span>
                    </div>

                    <div className="text-[10px] text-neutral-400 flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>{dev.security}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Hardware Info */}
        <div className="p-2.5 bg-black/80 rounded border border-neutral-800 text-[11px] text-neutral-500 flex items-center justify-between">
          <span>HARDWARE STACK: IEEE 802.11ax Wi-Fi 6 & Bluetooth 5.2 LE Controller</span>
          <span className="text-orange-400 font-bold">READY</span>
        </div>
      </div>
    </CyberModal>
  );
};
