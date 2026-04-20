import { getVersion } from './version.js';

// High score storage
function getHighScore() {
  return Number(localStorage.getItem('janktris_highscore') || 0);
}
function setHighScore(score) {
  localStorage.setItem('janktris_highscore', score);
}


import { rotateBlock, moveBlock, fixBlock } from './engine.js';
import { playSound } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
  // Display version
  getVersion().then(version => {
    document.getElementById('version').textContent = `Version: ${version}`;
  });
  // Initialize renderer and start render loop
  import('./engine.js').then(({ gameState, spawnBlock }) => {
    import('./renderer.js').then(({ initRenderer, renderLoop }) => {
      spawnBlock();
      initRenderer(() => gameState.activeBlock);
      // High score UI
      document.getElementById('highscore').textContent = getHighScore();
      document.getElementById('score').textContent = 0;
      // Game tick for falling
      let lastTick = Date.now();
      let fastDrop = false;
      let paused = false;
      let gameOver = false;
      let started = false;
      const messages = document.getElementById('messages');
      function setMessage(msg) {
        messages.textContent = msg;
      }
      function clearMessage() {
        messages.textContent = '';
      }
      function gameTick() {
        if (!started) {
          setMessage('Press Space to Start');
          requestAnimationFrame(gameTick);
          return;
        }
        if (paused) {
          setMessage('PAUSED');
          requestAnimationFrame(gameTick);
          return;
        }
        if (gameOver) {
          setMessage('GAME OVER - Press Space');
          requestAnimationFrame(gameTick);
          return;
        }
        clearMessage();
        const now = Date.now();
        const interval = fastDrop ? 100 : 1000;
        if (now - lastTick >= interval) {
          lastTick = now;
          if (!moveBlock('down')) {
            const prevScore = gameState.score;
            fixBlock();
            playSound('fix');
            if (gameState.score > getHighScore()) {
              setHighScore(gameState.score);
              document.getElementById('highscore').textContent = gameState.score;
            }
            document.getElementById('score').textContent = gameState.score;
            // Game over check: block fixed in top row
            if (gameState.activeBlock.getCells().some(cell => cell.y < 2)) {
              playSound('gameover');
              gameOver = true;
              return;
            }
            spawnBlock();
            playSound('spawn');
            fastDrop = false;
            // Game over check: new block can't spawn
            if (gameState.activeBlock.getCells().some(cell => cell.y < 2 && gameState.arena[cell.y][cell.x])) {
              playSound('gameover');
              gameOver = true;
              return;
            }
          }
        }
        requestAnimationFrame(gameTick);
      }
      gameTick();
      renderLoop(() => gameState.arena);

      // Keyboard controls
      window.addEventListener('keydown', (e) => {
        if (e.repeat) return;
        if (e.code === 'Space') {
          if (!started) {
            started = true;
            paused = false;
            gameOver = false;
            gameState.score = 0;
            gameState.lines = 0;
            gameState.arena = createArena();
            spawnBlock();
            playSound('start');
            clearMessage();
            return;
          }
          if (gameOver) {
            started = false;
            gameOver = false;
            paused = false;
            gameState.score = 0;
            gameState.lines = 0;
            gameState.arena = createArena();
            spawnBlock();
            playSound('start');
            clearMessage();
            return;
          }
          paused = !paused;
          e.preventDefault();
        }
        if (!started || paused || gameOver) return;
        if (e.code === 'ArrowLeft') {
          if (!fastDrop && rotateBlock('ccw')) playSound('rotate');
          e.preventDefault();
        }
        if (e.code === 'ArrowRight') {
          if (!fastDrop && rotateBlock('cw')) playSound('rotate');
          e.preventDefault();
        }
        if (e.code === 'ArrowDown') {
          fastDrop = true;
          e.preventDefault();
        }
        if (e.code === 'KeyA' && moveBlock('left')) playSound('move');
        if (e.code === 'KeyD' && moveBlock('right')) playSound('move');
      });
      window.addEventListener('keyup', (e) => {
        if (e.code === 'ArrowDown') fastDrop = false;
      });
    });
  });
});
