import { getVersion } from './version.js';

document.addEventListener('DOMContentLoaded', () => {
  // Display version
  getVersion().then(version => {
    document.getElementById('version').textContent = `Version: ${version}`;
  });
  // Initialize renderer and start render loop
  import('./renderer.js').then(({ initRenderer, renderLoop }) => {
    initRenderer();
    renderLoop();
  });
});
