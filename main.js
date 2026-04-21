import { getVersion } from './version.js';

// --- Modal and Arena Shade helpers ---
function showModal(title, body, buttons) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').textContent = body;
  const btns = document.getElementById('modal-buttons');
  btns.innerHTML = '';
  buttons.forEach(({ label, onClick, style }) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    if (style) btn.className = style;
    btn.onclick = () => { hideModal(); onClick && onClick(); };
    btns.appendChild(btn);
  });
  modal.classList.remove('hidden');
}
function hideModal() {
  document.getElementById('modal').classList.add('hidden');
}
function setArenaShade(active) {
  const shade = document.getElementById('arena-shade');
  if (shade) shade.classList.toggle('active', !!active);
}
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
    // Remove hash and -dirty, keep up to commit count (e.g. v0.2.0-3)
    // Extract vA.B.C-D (drop hash and -dirty)
    const match = version.match(/janktris-(v?\d+\.\d+\.\d+)(?:-(\d+))?(?:-g[0-9a-f]+)?(?:-dirty)?/);
    let cleanVersion = '';
    if (match) {
      cleanVersion = (match[1].startsWith('v') ? '' : 'v') + match[1];
      if (match[2]) cleanVersion += '-' + match[2];
    }
    document.getElementById('version').textContent = cleanVersion;
  });
  // Initialize renderer and start render loop
  import('./engine.js').then(({ gameState, spawnBlock, createArena: createArenaFn }) => {
    const createArena = createArenaFn;
    import('./renderer.js').then(({ initRenderer, renderLoop }) => {
      spawnBlock();
      initRenderer(() => gameState.activeBlock);
      // High score UI
      document.getElementById('highscore').textContent = getHighScore();
      document.getElementById('score').textContent = 0;
      // Game tick for falling
      let lastTick = Date.now();
      let gameStartTime = null;
      let fastDrop = false;
      let paused = false;
      let gameOver = false;
      let started = false;
      let escapePending = false;
      const messages = document.getElementById('messages');
      function setMessage(msg) {
        messages.textContent = msg;
      }
      function clearMessage() {
        messages.textContent = '';
      }
      function formatTime(ms) {
        const s = Math.floor(ms / 1000);
        const m = Math.floor(s / 60);
        return `${m}m ${s % 60}s`;
      }
      function formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}m ${secs}s`;
      }
      function gameTick() {
        setArenaShade(paused || gameOver);
        if (!started) {
          setArenaShade(false);
          setMessage('Press Space to Start');
          requestAnimationFrame(gameTick);
          return;
        }
        if (paused) {
          setArenaShade(true);
          setMessage('PAUSED');
          requestAnimationFrame(gameTick);
          return;
        }
        if (gameOver) {
          setArenaShade(true);
          const timeSurvived = gameStartTime ? Date.now() - gameStartTime : 0;
          setMessage(`GAME OVER - Score: ${gameState.score} - Time: ${formatTime(timeSurvived)} - Press Space to Restart`);
          showModal('Game Over', `Score: ${gameState.score}\nTime: ${formatTime(timeSurvived)}`, [
            { label: 'Restart', onClick: () => { started = true; gameOver = false; paused = false; gameState.score = 0; gameState.lines = 0; gameState.arena = createArena(); gameStartTime = Date.now(); spawnBlock(); playSound('start'); clearMessage(); hideModal(); } }
          ]);
          requestAnimationFrame(gameTick);
          return;
        }
        setArenaShade(false);
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
            // Game over check 1: Fixed blocks in top 2 rows
            if (gameState.arena[0].some(cell => cell) || gameState.arena[1].some(cell => cell)) {
              playSound('gameover');
              gameOver = true;
              const timeSurvived = gameStartTime ? Date.now() - gameStartTime : 0;
              setMessage(`GAME OVER - Score: ${gameState.score} - Time: ${formatTime(timeSurvived)} - Press Space to Restart`);
              requestAnimationFrame(gameTick);
              return;
            }
            spawnBlock();
            playSound('spawn');
            fastDrop = false;
            // Game over check 2: New block collides with existing blocks in playable area
            if (gameState.activeBlock.getCells().some(cell => cell.y >= 0 && cell.y < 2 && gameState.arena[cell.y][cell.x])) {
              playSound('gameover');
              gameOver = true;
              const timeSurvived = gameStartTime ? Date.now() - gameStartTime : 0;
              setMessage(`GAME OVER - Score: ${gameState.score} - Time: ${formatTime(timeSurvived)} - Press Space to Restart`);
              requestAnimationFrame(gameTick);
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
        // Block Space and Enter repeat (prevent accidental multiple triggers)
        if (e.repeat && (e.code === 'Space' || e.code === 'Enter')) return;
        
        if (e.code === 'Escape') {
          if (!started || paused || gameOver || escapePending) return;
          escapePending = true;
          showModal('End Game?', 'Are you sure you want to end the current game?', [
            { label: 'Yes', onClick: () => { gameOver = true; escapePending = false; } },
            { label: 'No', onClick: () => { escapePending = false; } }
          ]);
          e.preventDefault();
          return;
        }
        if (e.code === 'Space') {
          if (!started) {
            started = true;
            paused = false;
            gameOver = false;
            gameState.score = 0;
            gameState.lines = 0;
            gameState.arena = createArena();
            gameStartTime = Date.now();
            spawnBlock();
            playSound('start');
            clearMessage();
            return;
          }
          if (gameOver) {
            // Reset game completely
            started = true;
            gameOver = false;
            paused = false;
            gameState.score = 0;
            gameState.lines = 0;
            gameState.arena = createArena(); // FIX: Properly clear arena
            gameStartTime = Date.now();
            spawnBlock();
            playSound('start');
            clearMessage();
            return;
          }

          paused = !paused;
          e.preventDefault();
        }
        if (e.code === 'Enter') {
          if (!started || paused || gameOver) return;
          // Hard drop: Move block down until it can't move anymore
          while (moveBlock('down')) {
            // Keep moving down
          }
          // Block has hit bottom, fix it
          const prevScore = gameState.score;
          fixBlock();
          playSound('fix');
          if (gameState.score > getHighScore()) {
            setHighScore(gameState.score);
            document.getElementById('highscore').textContent = gameState.score;
          }
          document.getElementById('score').textContent = gameState.score;
          // Game over check 1: Fixed blocks in top 2 rows
          if (gameState.arena[0].some(cell => cell) || gameState.arena[1].some(cell => cell)) {
            playSound('gameover');
            gameOver = true;
            setMessage(`GAME OVER - Score: ${gameState.score} - Press Space to Start New Game`);
            requestAnimationFrame(gameTick);
            return;
          }
          spawnBlock();
          playSound('spawn');
          // Game over check 2: New block collides with existing blocks in playable area
          if (gameState.activeBlock.getCells().some(cell => cell.y >= 0 && cell.y < 2 && gameState.arena[cell.y][cell.x])) {
            playSound('gameover');
            gameOver = true;
            setMessage(`GAME OVER - Score: ${gameState.score} - Press Space to Start New Game`);
            requestAnimationFrame(gameTick);
            return;
          }
          e.preventDefault();
        }
        if (!started || paused || gameOver) return;
        if (e.code === 'ArrowLeft') {
          if (moveBlock('left')) playSound('move');
          e.preventDefault();
        }
        if (e.code === 'ArrowRight') {
          if (moveBlock('right')) playSound('move');
          e.preventDefault();
        }
        if (e.code === 'ArrowUp') {
          if (!fastDrop && rotateBlock('cw')) playSound('rotate');
          e.preventDefault();
        }
        if (e.code === 'ArrowDown') {
          fastDrop = true;
          e.preventDefault();
        }
        if (e.code === 'KeyA') {
          if (!fastDrop && rotateBlock('ccw')) playSound('rotate');
          e.preventDefault();
        }
        if (e.code === 'KeyD') {
          if (!fastDrop && rotateBlock('cw')) playSound('rotate');
          e.preventDefault();
        }
      });
      window.addEventListener('keyup', (e) => {
        if (e.code === 'ArrowDown') fastDrop = false;
      });
    });
  });
});
