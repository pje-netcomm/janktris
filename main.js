import { getVersion } from './version.js';

document.addEventListener('DOMContentLoaded', () => {
  // Display version
  getVersion().then(version => {
    document.getElementById('version').textContent = `Version: ${version}`;
  });
  // Placeholder for module initialization
  // Future: initialize engine, renderer, input, etc.
});
