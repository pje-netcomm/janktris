import { getVersion } from './version.js';

// --- Modal and Arena Shade helpers ---
let modalKeyHandler = null;
function showModal(title, body, buttons, options = {}) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').textContent = body;
  const btns = document.getElementById('modal-buttons');
  btns.innerHTML = '';
  
  const buttonElements = [];
  buttons.forEach(({ label, onClick, style }, index) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    if (style) btn.className = style;
    btn.onclick = () => { hideModal(); onClick && onClick(); };
    btns.appendChild(btn);
    buttonElements.push(btn);
  });
  
  // Focus first button by default
  if (buttonElements.length > 0) {
    setTimeout(() => buttonElements[0].focus(), 100);
  }
  
  // Set up keyboard handler for modal if enabled
  if (options.enableKeyboard) {
    modalKeyHandler = (e) => {
      if (e.code === 'Escape' && options.onEscape) {
        e.preventDefault();
        hideModal();
        options.onEscape();
        return;
      }
      if (e.code === 'Enter') {
        e.preventDefault();
        // Click the focused button or first button
        const focusedBtn = document.activeElement;
        if (focusedBtn && focusedBtn.tagName === 'BUTTON' && btns.contains(focusedBtn)) {
          focusedBtn.click();
        } else if (buttonElements.length > 0) {
          buttonElements[0].click();
        }
        return;
      }
      // Handle Tab to cycle through buttons within modal
      if (e.code === 'Tab' && buttonElements.length > 1) {
        e.preventDefault();
        const focusedBtn = document.activeElement;
        const currentIndex = buttonElements.indexOf(focusedBtn);
        
        if (currentIndex === -1) {
          // Nothing focused or not a button, focus first
          buttonElements[0].focus();
        } else if (e.shiftKey) {
          // Shift+Tab: go backward
          const prevIndex = (currentIndex - 1 + buttonElements.length) % buttonElements.length;
          buttonElements[prevIndex].focus();
        } else {
          // Tab: go forward
          const nextIndex = (currentIndex + 1) % buttonElements.length;
          buttonElements[nextIndex].focus();
        }
        return;
      }
    };
    window.addEventListener('keydown', modalKeyHandler);
  }
  
  modal.classList.remove('hidden');
}
function hideModal() {
  // Remove keyboard handler if it exists
  if (modalKeyHandler) {
    window.removeEventListener('keydown', modalKeyHandler);
    modalKeyHandler = null;
  }
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
      let gameEndTime = null; // Track when game ended
      let fastDrop = false;
      let paused = false;
      let gameOver = false;
      let started = false;
      let escapePending = false;
      let gameOverModalShown = false; // Track if modal was already shown
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
          const timeSurvived = gameStartTime && gameEndTime ? gameEndTime - gameStartTime : 0;
          setMessage(`GAME OVER - Score: ${gameState.score} - Time: ${formatTime(timeSurvived)} - Press Space to Restart`);
          // Show modal once, then just keep showing the message
          if (!gameOverModalShown) {
            gameOverModalShown = true;
            showModal('Game Over', `Score: ${gameState.score}\nTime: ${formatTime(timeSurvived)}`, [
              { label: 'Close', onClick: () => { hideModal(); } }
            ]);
          }
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
              gameEndTime = Date.now(); // Capture end time
              const timeSurvived = gameStartTime ? gameEndTime - gameStartTime : 0;
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
              gameEndTime = Date.now(); // Capture end time
              const timeSurvived = gameStartTime ? gameEndTime - gameStartTime : 0;
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
        // If game over and modal is visible, any key dismisses it
        if (gameOver && !document.getElementById('modal').classList.contains('hidden')) {
          hideModal();
          e.preventDefault();
          return;
        }
        
        // Block Space and Enter repeat (prevent accidental multiple triggers)
        if (e.repeat && (e.code === 'Space' || e.code === 'Enter')) return;
        
        if (e.code === 'Escape') {
          if (!started || paused || gameOver || escapePending) return;
          
          // Pause the game while showing the dialog
          const wasPaused = paused;
          paused = true;
          escapePending = true;
          setArenaShade(true);
          
          showModal('End Game?', 'Are you sure you want to end the current game?', [
            { label: 'Yes', onClick: () => { 
              gameOver = true; 
              gameEndTime = Date.now(); 
              escapePending = false;
              paused = false;
            } },
            { label: 'No', onClick: () => { 
              escapePending = false;
              paused = wasPaused; // Restore previous pause state
            } }
          ], {
            enableKeyboard: true,
            onEscape: () => {
              // Esc key cancels dialog
              escapePending = false;
              paused = wasPaused; // Restore previous pause state
            }
          });
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
            gameEndTime = null;
            gameOverModalShown = false;
            spawnBlock();
            playSound('start');
            clearMessage();
            hideModal(); // Close any open modal
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
            gameEndTime = null;
            gameOverModalShown = false;
            spawnBlock();
            playSound('start');
            clearMessage();
            hideModal(); // Close any open modal
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
            gameEndTime = Date.now(); // Capture end time
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
            gameEndTime = Date.now(); // Capture end time
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
