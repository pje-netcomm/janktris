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
      function gameTick() {
        if (paused) {
          requestAnimationFrame(gameTick);
          return;
        }
        const now = Date.now();
        const interval = fastDrop ? 100 : 1000;
        if (now - lastTick >= interval) {
          lastTick = now;
          if (!moveBlock('down')) {
            fixBlock();
            spawnBlock();
            fastDrop = false;
          }
        }
        requestAnimationFrame(gameTick);
      }
      gameTick();
      renderLoop(() => gameState.arena);

      // Keyboard controls
      window.addEventListener('keydown', (e) => {
        if (e.repeat) return;
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
        if (e.code === 'Space') {
          paused = !paused;
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
