// Pure Web Audio API synthesizer simulating authentic vinyl needle drop crackle,
// warm 1986 analog viola caipira harmonic progression, and compressed MP3 comparison.

class AnalogAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private stopTimeout: number | null = null;
  private activeNodes: AudioNode[] = [];
  private currentMode: 'vinyl' | 'mp3' = 'vinyl';

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public startNeedleDrop(mode: 'vinyl' | 'mp3' = 'vinyl', onEnd?: () => void): void {
    this.stop();
    this.currentMode = mode;

    try {
      const ctx = this.ensureContext();
      this.isPlaying = true;
      const now = ctx.currentTime;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, now);
      masterGain.gain.exponentialRampToValueAtTime(0.32, now + 0.25);
      masterGain.gain.setValueAtTime(0.32, now + 11.0);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 12.5);

      // Filter stage to differentiate full-range warm analog vinyl vs pinched MP3 compression
      const toneFilter = ctx.createBiquadFilter();
      if (mode === 'vinyl') {
        toneFilter.type = 'lowshelf';
        toneFilter.frequency.setValueAtTime(240, now);
        toneFilter.gain.setValueAtTime(4.5, now); // Warm tube bass body
      } else {
        toneFilter.type = 'bandpass';
        toneFilter.frequency.setValueAtTime(1100, now);
        toneFilter.Q.setValueAtTime(1.8, now); // Thin compressed MP3 bandwidth
      }

      toneFilter.connect(masterGain);
      masterGain.connect(ctx.destination);
      this.activeNodes.push(masterGain, toneFilter);

      // 1. Initial needle drop thump + organic vinyl surface crackle (only in vinyl mode)
      if (mode === 'vinyl') {
        const bufferSize = ctx.sampleRate * 12.5;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
          // Gentle analog tape hiss + sparse microscopic dust pops
          const baseHiss = (Math.random() * 2 - 1) * 0.014;
          const randomPop = Math.random() > 0.9991 ? (Math.random() * 2 - 1) * 0.26 : 0;
          // Initial needle contact thump in first 120ms
          const needleDropImpulse = i < ctx.sampleRate * 0.08 ? Math.sin(i * 0.04) * 0.28 * Math.exp(-i / 1200) : 0;
          output[i] = baseHiss + randomPop + needleDropImpulse;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const crackleFilter = ctx.createBiquadFilter();
        crackleFilter.type = 'bandpass';
        crackleFilter.frequency.setValueAtTime(2800, now);
        crackleFilter.Q.setValueAtTime(0.7, now);

        whiteNoise.connect(crackleFilter);
        crackleFilter.connect(masterGain);
        whiteNoise.start(now);
        whiteNoise.stop(now + 12.5);
        this.activeNodes.push(whiteNoise, crackleFilter);
      }

      // 2. Nostalgic Viola Caipira & Warm Accordion Arpeggio (in D Major / B Minor Sertanejo progression)
      // Notes: F#3, A3, D4, F#4, E4, C#4, A3, B3, D4, G3, B3, E4, A3, C#4, F#4, D4
      const sequence = [
        { freq: 185.0, time: 0.65, dur: 1.6 },  // F#3
        { freq: 293.66, time: 0.95, dur: 1.5 }, // D4
        { freq: 369.99, time: 1.25, dur: 1.8 }, // F#4
        { freq: 440.0, time: 1.65, dur: 2.1 },  // A4
        { freq: 329.63, time: 2.55, dur: 1.7 }, // E4
        { freq: 277.18, time: 2.95, dur: 1.8 }, // C#4
        { freq: 220.0, time: 3.35, dur: 2.2 },  // A3
        { freq: 246.94, time: 4.35, dur: 1.6 }, // B3
        { freq: 293.66, time: 4.7, dur: 1.6 },  // D4
        { freq: 392.0, time: 5.05, dur: 2.1 },  // G4
        { freq: 369.99, time: 5.95, dur: 1.8 }, // F#4
        { freq: 329.63, time: 6.45, dur: 1.9 }, // E4
        { freq: 293.66, time: 7.4, dur: 3.8 },  // D4 warm final chord
        { freq: 369.99, time: 7.45, dur: 3.8 }, // F#4
        { freq: 440.0, time: 7.5, dur: 3.8 },   // A4
      ];

      sequence.forEach((note) => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const noteGain = ctx.createGain();

        // Viola caipira has paired courses (octave / unison with slight natural detune)
        osc1.type = 'triangle';
        osc2.type = mode === 'vinyl' ? 'sine' : 'sawtooth';
        osc1.frequency.setValueAtTime(note.freq, now + note.time);
        osc2.frequency.setValueAtTime(mode === 'vinyl' ? note.freq * 2 : note.freq * 1.003, now + note.time);
        osc2.detune.setValueAtTime(mode === 'vinyl' ? 4 : -15, now + note.time);

        const peak = mode === 'vinyl' ? 0.16 : 0.08;
        noteGain.gain.setValueAtTime(0.0001, now + note.time);
        noteGain.gain.linearRampToValueAtTime(peak, now + note.time + 0.03);
        noteGain.gain.exponentialRampToValueAtTime(0.0008, now + note.time + note.dur);

        osc1.connect(noteGain);
        osc2.connect(noteGain);
        noteGain.connect(toneFilter);

        osc1.start(now + note.time);
        osc2.start(now + note.time);
        osc1.stop(now + note.time + note.dur + 0.05);
        osc2.stop(now + note.time + note.dur + 0.05);

        this.activeNodes.push(osc1, osc2, noteGain);
      });

      this.stopTimeout = window.setTimeout(() => {
        this.isPlaying = false;
        if (onEnd) onEnd();
      }, 12500);
    } catch {
      this.isPlaying = false;
      if (onEnd) onEnd();
    }
  }

  public stop(): void {
    if (this.stopTimeout !== null) {
      clearTimeout(this.stopTimeout);
      this.stopTimeout = null;
    }
    this.activeNodes.forEach((node) => {
      try {
        node.disconnect();
      } catch {
        // Ignore already disconnected nodes
      }
    });
    this.activeNodes = [];
    this.isPlaying = false;
  }

  public getPlayingState(): { isPlaying: boolean; mode: 'vinyl' | 'mp3' } {
    return { isPlaying: this.isPlaying, mode: this.currentMode };
  }
}

export const analogAudio = new AnalogAudioEngine();
