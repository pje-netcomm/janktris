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
    const cleanVersion = version.replace('janktris-', '').replace(/-[a-f0-9]+.*$/, '');
    document.getElementById('version').textContent = `v${cleanVersion}`;
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
      const messages = document.getElementById('messages');
      function setMessage(msg) {
        messages.textContent = msg;
      }
      function clearMessage() {
        messages.textContent = '';
      }
      function formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}m ${secs}s`;
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
          const timeSurvived = gameStartTime ? Date.now() - gameStartTime : 0;
          setMessage(`GAME OVER - Score: ${gameState.score} - Time: ${formatTime(timeSurvived)} - Press Space to Restart`);
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
