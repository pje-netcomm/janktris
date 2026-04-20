import { getVersion } from './version.js';

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
      function gameTick() {
        const now = Date.now();
        if (now - lastTick >= 1000) {
          lastTick = now;
          if (!moveBlock('down')) {
            fixBlock();
            spawnBlock();
          }
        }
        requestAnimationFrame(gameTick);
      }
      gameTick();
      renderLoop(() => gameState.arena);
    });
  });
});
