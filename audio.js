// audio.js
// Audio system for Janktris

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

export function playSound(event, multi = false) {
  if (event === 'row') {
    if (multi) sounds.multirow.currentTime = 0, sounds.multirow.play();
    else sounds.row.currentTime = 0, sounds.row.play();
  } else if (sounds[event]) {
    sounds[event].currentTime = 0;
    sounds[event].play();
  }
}

export default sounds;
