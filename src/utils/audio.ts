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

// Resume AudioContext on first user interaction
export const initAudio = () => {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume();
  }
};
