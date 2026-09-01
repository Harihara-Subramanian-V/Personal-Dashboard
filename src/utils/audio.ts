// Cyber & 90s Nostalgia Web Audio Synthesizer - Pure Web Audio API & Authentic Windows XP Audio Engine

type AudioPlayListener = (isPlaying: boolean, frequencyData?: number[]) => void;

class CyberSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private listeners: Set<AudioPlayListener> = new Set();
  private hasPlayedStartupThisSession: boolean = false;
  private startupAudio: HTMLAudioElement | null = null;

  constructor() {
    const savedMute = localStorage.getItem('cyber_audio_muted');
    if (savedMute !== null) {
      this.isMuted = savedMute === 'true';
    }

    if (typeof window !== 'undefined') {
      try {
        this.startupAudio = new Audio('/sounds/windows-xp-startup.mp3');
        this.startupAudio.volume = 0.6;
      } catch {
        // Fallback
      }

      // Try playing immediately upon script load / DOM ready
      const triggerImmediateBoot = () => {
        if (!this.isMuted && !this.hasPlayedStartupThisSession) {
          this.playWindowsXpStartup();
        }
      };

      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        triggerImmediateBoot();
      } else {
        window.addEventListener('DOMContentLoaded', triggerImmediateBoot, { once: true });
        window.addEventListener('load', triggerImmediateBoot, { once: true });
      }

      // Browser Autoplay Policy fallback: If browser blocked unmuted autoplay, trigger on first gesture
      const handleFirstInteraction = () => {
        if (!this.hasPlayedStartupThisSession) {
          this.initContext();
          if (!this.isMuted) {
            this.playWindowsXpStartup();
          }
        }
      };

      ['pointerdown', 'keydown', 'scroll', 'touchstart', 'click', 'mousemove'].forEach((evt) =>
        window.addEventListener(evt, handleFirstInteraction, { once: true })
      );
    }
  }

  public subscribe(listener: AudioPlayListener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(active: boolean) {
    this.listeners.forEach((l) => l(active));
  }

  public initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.isMuted ? 0 : 0.22;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('cyber_audio_muted', String(this.isMuted));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.22, this.ctx.currentTime);
    }
    if (this.startupAudio) {
      this.startupAudio.muted = this.isMuted;
    }
    if (!this.isMuted) {
      this.playWindowsXpStartup();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    localStorage.setItem('cyber_audio_muted', String(this.isMuted));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.22, this.ctx.currentTime);
    }
    if (this.startupAudio) {
      this.startupAudio.muted = this.isMuted;
    }
  }

  // Authentic Windows XP Startup Sound (Plays upon each reload / refresh & on demand)
  public playWindowsXpStartup() {
    if (this.isMuted) return;
    this.hasPlayedStartupThisSession = true;
    this.notifyListeners(true);

    try {
      if (!this.startupAudio) {
        this.startupAudio = new Audio('/sounds/windows-xp-startup.mp3');
      }
      this.startupAudio.currentTime = 0;
      this.startupAudio.volume = 0.6;
      const playPromise = this.startupAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setTimeout(() => this.notifyListeners(false), 4500);
          })
          .catch(() => {
            // If browser policy blocked it, set flag back to false so the very next gesture starts it immediately!
            this.hasPlayedStartupThisSession = false;
          });
      }
    } catch {
      // Fallback
    }
  }

  // Alias for backwards compatibility
  public play90sStartup() {
    this.playWindowsXpStartup();
  }

  // Realistic Blood-Curdling Ghost Scream & Supernatural Wail
  public playJumpscareScreech() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.notifyListeners(true);
    const now = this.ctx.currentTime;

    try {
      // 1. Wraith Cavernous Sub-Bass Thud Impact
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(140, now);
      bassOsc.frequency.exponentialRampToValueAtTime(28, now + 0.6);
      bassGain.gain.setValueAtTime(1.0, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
      bassOsc.connect(bassGain);
      bassGain.connect(this.masterGain);
      bassOsc.start(now);
      bassOsc.stop(now + 0.65);

      // 2. Chilling Ghost Vocal Tract Formant Synthesizer
      const bufferSize = this.ctx.sampleRate * 1.6;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = noiseBuffer;

      const f1 = this.ctx.createBiquadFilter();
      f1.type = 'bandpass';
      f1.frequency.setValueAtTime(850, now);
      f1.frequency.exponentialRampToValueAtTime(1400, now + 0.35);
      f1.frequency.exponentialRampToValueAtTime(600, now + 1.4);
      f1.Q.value = 14;

      const f2 = this.ctx.createBiquadFilter();
      f2.type = 'bandpass';
      f2.frequency.setValueAtTime(1450, now);
      f2.frequency.exponentialRampToValueAtTime(2900, now + 0.4);
      f2.frequency.exponentialRampToValueAtTime(900, now + 1.4);
      f2.Q.value = 16;

      const screamGain = this.ctx.createGain();
      screamGain.gain.setValueAtTime(0.01, now);
      screamGain.gain.exponentialRampToValueAtTime(0.9, now + 0.05);
      screamGain.gain.exponentialRampToValueAtTime(0.7, now + 0.45);
      screamGain.gain.exponentialRampToValueAtTime(0.001, now + 1.55);

      noiseNode.connect(f1);
      noiseNode.connect(f2);
      f1.connect(screamGain);
      f2.connect(screamGain);
      screamGain.connect(this.masterGain);

      noiseNode.start(now);
      noiseNode.stop(now + 1.6);

      // 3. Shivering banshee vibrato osc
      const screamOsc = this.ctx.createOscillator();
      const screamOscGain = this.ctx.createGain();
      screamOsc.type = 'sawtooth';
      screamOsc.frequency.setValueAtTime(980, now);
      screamOsc.frequency.exponentialRampToValueAtTime(2400, now + 0.25);
      screamOsc.frequency.exponentialRampToValueAtTime(320, now + 1.45);

      screamOscGain.gain.setValueAtTime(0.01, now);
      screamOscGain.gain.exponentialRampToValueAtTime(0.45, now + 0.06);
      screamOscGain.gain.exponentialRampToValueAtTime(0.001, now + 1.45);

      screamOsc.connect(screamOscGain);
      screamOscGain.connect(this.masterGain);

      screamOsc.start(now);
      screamOsc.stop(now + 1.5);

      setTimeout(() => this.notifyListeners(false), 1600);
    } catch {
      // Ignore
    }
  }

  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      this.notifyListeners(true);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
      setTimeout(() => this.notifyListeners(false), 80);
    } catch {
      // Ignore
    }
  }

  public playKeypadBeep(digitIndex: number = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      this.notifyListeners(true);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const dtmfFreqs = [941, 1209, 1336, 1477, 1633];
      const freq = dtmfFreqs[digitIndex % dtmfFreqs.length];

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
      setTimeout(() => this.notifyListeners(false), 100);
    } catch {
      // Ignore
    }
  }

  public playKeypress() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      this.notifyListeners(true);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freqs = [650, 720, 840, 920, 1050];
      const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];

      osc.type = 'sine';
      osc.frequency.setValueAtTime(randomFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(randomFreq * 0.5, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
      setTimeout(() => this.notifyListeners(false), 50);
    } catch {
      // Ignore
    }
  }

  public playHover() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {
      // Ignore
    }
  }

  public playAccessGranted() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      this.notifyListeners(true);
      const now = this.ctx.currentTime;
      const notes = [587.33, 739.99, 880.00, 1174.66];

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        const startTime = now + idx * 0.06;
        const duration = 0.16;

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
      setTimeout(() => this.notifyListeners(false), 450);
    } catch {
      // Ignore
    }
  }

  public playAlert() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      this.notifyListeners(true);
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.setValueAtTime(260, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.22);
      setTimeout(() => this.notifyListeners(false), 250);
    } catch {
      // Ignore
    }
  }

  public playScanSweep() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      this.notifyListeners(true);
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(2200, now + 0.25);
      osc.frequency.linearRampToValueAtTime(600, now + 0.45);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.45);
      setTimeout(() => this.notifyListeners(false), 500);
    } catch {
      // Ignore
    }
  }
}

export const cyberAudio = new CyberSoundEngine();
