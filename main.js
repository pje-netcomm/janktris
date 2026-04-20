import { getVersion } from './version.js';

document.addEventListener('DOMContentLoaded', () => {
  // Display version
  getVersion().then(version => {
    document.getElementById('version').textContent = `Version: ${version}`;
  });
  // Initialize renderer and start render loop
  import('./renderer.js').then(({ initRenderer, renderLoop, setTestBlocks }) => {
    import('./engine.js').then(({ Block }) => {
      initRenderer();
      // Test: render all block shapes at fixed positions
      setTestBlocks([
        new Block('S', {x:2, y:2}),
        new Block('LINE', {x:8, y:2}),
        new Block('T', {x:2, y:8}),
        new Block('Z', {x:8, y:8}),
        new Block('L', {x:14, y:2})
      ]);
      renderLoop();
    });
  });
});
