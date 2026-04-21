// audio.js
// Audio system for Janktris

// Note: Audio files are placeholders (0 bytes). 
// For functional audio, replace files in assets/ with actual sound files.

const sounds = {
  row: new Audio('assets/row.wav'),
  multirow: new Audio('assets/multirow.wav'),
  gameover: new Audio('assets/gameover.wav'),
  start: new Audio('assets/start.wav'),
  spawn: new Audio('assets/spawn.wav'),
  move: new Audio('assets/move.wav'),
  rotate: new Audio('assets/rotate.wav'),
  fix: new Audio('assets/fix.wav'),
};

// Muted by default for subtle events
['spawn','move','rotate','fix'].forEach(k => { sounds[k].volume = 0.2; });

// Error handling for audio loading
Object.keys(sounds).forEach(key => {
  sounds[key].addEventListener('error', () => {
    console.warn(`Audio file ${key}.wav failed to load or is empty`);
  });
});

export function playSound(event, multi = false) {
  try {
    if (event === 'row') {
      if (multi) {
        sounds.multirow.currentTime = 0;
        sounds.multirow.play().catch(() => {}); // Ignore autoplay restrictions
      } else {
        sounds.row.currentTime = 0;
        sounds.row.play().catch(() => {});
      }
    } else if (sounds[event]) {
      sounds[event].currentTime = 0;
      sounds[event].play().catch(() => {}); // Ignore autoplay restrictions
    }
  } catch (e) {
    // Silently fail if audio doesn't work
  }
}

export default sounds;
