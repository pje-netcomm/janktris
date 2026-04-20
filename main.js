import { getVersion } from './version.js';

import { rotateBlock, moveBlock, fixBlock } from './engine.js';

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
            fixBlock();
            // Game over check: block fixed in top row
            if (gameState.activeBlock.getCells().some(cell => cell.y < 2)) {
              gameOver = true;
              return;
            }
            spawnBlock();
            fastDrop = false;
            // Game over check: new block can't spawn
            if (gameState.activeBlock.getCells().some(cell => cell.y < 2 && gameState.arena[cell.y][cell.x])) {
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
            clearMessage();
            return;
          }
          paused = !paused;
          e.preventDefault();
        }
        if (!started || paused || gameOver) return;
        if (e.code === 'ArrowLeft') {
          if (!fastDrop) rotateBlock('ccw');
          e.preventDefault();
        }
        if (e.code === 'ArrowRight') {
          if (!fastDrop) rotateBlock('cw');
          e.preventDefault();
        }
        if (e.code === 'ArrowDown') {
          fastDrop = true;
          e.preventDefault();
        }
        if (e.code === 'KeyA') moveBlock('left');
        if (e.code === 'KeyD') moveBlock('right');
      });
      window.addEventListener('keyup', (e) => {
        if (e.code === 'ArrowDown') fastDrop = false;
      });
    });
  });
});
