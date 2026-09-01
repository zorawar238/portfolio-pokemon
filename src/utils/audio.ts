'use client';

// Singleton AudioContext to avoid creating multiple contexts
let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

// Simple retro beep (high pitch, short duration) for hovers
export const playHoverSound = () => {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = 'triangle'; // Smooth but synthetic
  oscillator.frequency.setValueAtTime(880, ctx.currentTime); // A5

  gainNode.gain.setValueAtTime(0.05, ctx.currentTime); // Very quiet
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.05);
};

// Satisfying square wave blip for clicks
export const playClickSound = () => {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = 'square'; // Classic retro sound
  oscillator.frequency.setValueAtTime(440, ctx.currentTime); // A4
  oscillator.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); // Quick pitch up

  gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.1);
};

// Soft, low-volume tick for each footstep while walking around the map
export const playFootstepSound = () => {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(150, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.06);

  gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.06);
};

// Cheerful ascending chime for entering a building
export const playDoorChimeSound = () => {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
  notes.forEach((freq, i) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const startTime = ctx.currentTime + i * 0.07;

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(freq, startTime);

    gainNode.gain.setValueAtTime(0.08, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.15);
  });
};

// Small triumphant fanfare for opening the Trophy Case / Trainer Card
export const playAchievementSound = () => {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const startTime = ctx.currentTime + i * 0.09;

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(freq, startTime);

    gainNode.gain.setValueAtTime(0.07, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.22);
  });
};

// Background Music State
let bgmGainNode: GainNode | null = null;
let bgmInterval: ReturnType<typeof setInterval> | null = null;
export let isPlayingBgm = false;
let nextNoteTime = 0;
let currentNote = 0;

export const toggleBackgroundMusic = () => {
  if (isPlayingBgm) {
    stopBackgroundMusic();
  } else {
    playBackgroundMusic();
  }
};

export const stopBackgroundMusic = () => {
  isPlayingBgm = false;
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
  
  if (bgmGainNode) {
    // Fade out
    const ctx = getAudioContext();
    if (ctx) {
      bgmGainNode.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
      setTimeout(() => {
        if (bgmGainNode) {
          bgmGainNode.disconnect();
          bgmGainNode = null;
        }
      }, 200);
    }
  }
};

export const playBackgroundMusic = () => {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running' || isPlayingBgm) return;
  isPlayingBgm = true;

  bgmGainNode = ctx.createGain();
  bgmGainNode.gain.value = 0.05; // Master BGM volume
  bgmGainNode.connect(ctx.destination);

  // Pokemon-style high-energy 8-bit battle/route track (BPM 150)
  const bpm = 150;
  const tickLength = (60 / bpm) / 4; // 16th note duration = 0.1s
  
  // Melody track
  const melody = [
    // Measure 1
    523.25, 0, 523.25, 659.25, 783.99, 0, 1046.50, 0,
    783.99, 0, 659.25, 0, 523.25, 0, 0, 0,
    // Measure 2
    587.33, 0, 587.33, 698.46, 880.00, 0, 1174.66, 0,
    880.00, 0, 698.46, 0, 587.33, 0, 0, 0,
    // Measure 3
    659.25, 0, 783.99, 0, 1046.50, 0, 1318.51, 0,
    1046.50, 0, 783.99, 0, 659.25, 0, 0, 0,
    // Measure 4
    698.46, 783.99, 880.00, 1046.50, 1174.66, 0, 0, 0,
    1046.50, 1174.66, 1318.51, 1567.98, 0, 0, 0, 0
  ];
  
  // Bass track
  const bass = [
    130.81, 130.81, 130.81, 130.81, 130.81, 130.81, 130.81, 130.81,
    130.81, 130.81, 130.81, 130.81, 130.81, 130.81, 130.81, 130.81,
    
    146.83, 146.83, 146.83, 146.83, 146.83, 146.83, 146.83, 146.83,
    146.83, 146.83, 146.83, 146.83, 146.83, 146.83, 146.83, 146.83,
    
    164.81, 164.81, 164.81, 164.81, 164.81, 164.81, 164.81, 164.81,
    164.81, 164.81, 164.81, 164.81, 164.81, 164.81, 164.81, 164.81,
    
    174.61, 0, 174.61, 0, 196.00, 0, 196.00, 0,
    130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0
  ];

  currentNote = 0;
  nextNoteTime = ctx.currentTime + 0.1;

  const playNote = (time: number, freq: number, type: OscillatorType, dur: number, vol: number) => {
    if (freq === 0) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + dur * 0.9);
    
    osc.connect(gain);
    gain.connect(bgmGainNode!);
    
    osc.start(time);
    osc.stop(time + dur);
  };

  const scheduler = () => {
    if (!isPlayingBgm) return;
    while (nextNoteTime < ctx.currentTime + 0.1) {
      const melNote = melody[currentNote];
      const bassNote = bass[currentNote];

      // Play melody
      playNote(nextNoteTime, melNote, 'square', tickLength, 0.4);
      // Play bass
      playNote(nextNoteTime, bassNote, 'triangle', tickLength, 0.6);

      nextNoteTime += tickLength;
      currentNote = (currentNote + 1) % melody.length;
    }
  };

  bgmInterval = setInterval(scheduler, 25);
};

// Resume AudioContext on first user interaction
export const initAudio = () => {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume();
  }
};
