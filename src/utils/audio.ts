// Audio synthesis utility using Web Audio API to create cute, kid-friendly sounds
// without needing external mp3 files.

let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playPop() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    console.warn('Audio play failed:', e);
  }
}

export function playChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Play a dual note chime (C5 and G5)
    const playNote = (freq: number, startDelay: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + startDelay);
      
      gain.gain.setValueAtTime(0.1, now + startDelay);
      gain.gain.exponentialRampToValueAtTime(0.01, now + startDelay + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + startDelay);
      osc.stop(now + startDelay + 0.3);
    };

    playNote(523.25, 0); // C5
    playNote(659.25, 0.08); // E5
    playNote(783.99, 0.16); // G5
  } catch (e) {
    console.warn('Audio play failed:', e);
  }
}

export function playSuccess() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50]; // C5 to C6 major scale
    notes.forEach((note, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const delay = i * 0.06;
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, now + delay);
      
      gain.gain.setValueAtTime(0.08, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.2);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + delay);
      osc.stop(now + delay + 0.2);
    });
  } catch (e) {
    console.warn('Audio play failed:', e);
  }
}

export function playWater() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Simulate bubble/droplet sounds
    for (let i = 0; i < 6; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const delay = i * 0.08;
      const pitch = 800 + Math.random() * 600;
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now + delay);
      osc.frequency.exponentialRampToValueAtTime(pitch + 300, now + delay + 0.05);
      
      gain.gain.setValueAtTime(0.05, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.06);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + delay);
      osc.stop(now + delay + 0.06);
    }
  } catch (e) {
    console.warn('Audio play failed:', e);
  }
}

export function playWind() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create soft whoosh sound with noise or frequency modulation
    // We can simulate it simply by a low oscillator with frequency sweep and vibrato
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(250, now + 0.4);
    osc.frequency.linearRampToValueAtTime(180, now + 0.8);
    
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(now + 0.8);
  } catch (e) {
    console.warn('Audio play failed:', e);
  }
}

export function playSigh() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    console.warn('Audio play failed:', e);
  }
}
