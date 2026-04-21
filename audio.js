// audio.js - Sound system using Web Audio API
// Generates simple tones for game events

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Sound definitions with frequency and duration
const soundDefs = {
  start: { freq: 523, duration: 0.15, type: 'sine' },      // C5 - Game start
  spawn: { freq: 392, duration: 0.08, type: 'sine' },      // G4 - Block spawn
  move: { freq: 440, duration: 0.03, type: 'sine' },       // A4 - Move
  rotate: { freq: 494, duration: 0.04, type: 'sine' },     // B4 - Rotate
  fix: { freq: 330, duration: 0.1, type: 'sine' },         // E4 - Block fixed
  row: { freq: 659, duration: 0.2, type: 'square' },       // E5 - Line clear
  multirow: { freq: 784, duration: 0.3, type: 'square' },  // G5 - Multi-line
  gameover: { freq: 196, duration: 0.5, type: 'sawtooth' } // G3 - Game over
};

// Volume levels
const volumes = {
  start: 0.3,
  spawn: 0.15,
  move: 0.1,
  rotate: 0.1,
  fix: 0.15,
  row: 0.25,
  multirow: 0.3,
  gameover: 0.2
};

// Generate and play a tone
function playTone(freq, duration, type, volume) {
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = type;
    oscillator.frequency.value = freq;
    
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
}

export function playSound(event, multi = false) {
  // Resume audio context if suspended (browser autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  let soundKey = event;
  if (event === 'row' && multi) {
    soundKey = 'multirow';
  }
  
  const sound = soundDefs[soundKey];
  if (sound) {
    const volume = volumes[soundKey] || 0.2;
    playTone(sound.freq, sound.duration, sound.type, volume);
  }
}

// Export for testing
export const getSoundDefs = () => soundDefs;
export const getVolumes = () => volumes;

export default { playSound, getSoundDefs, getVolumes };
