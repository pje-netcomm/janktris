// renderer.js
// Canvas rendering for Janktris
import { ARENA_COLS, ARENA_ROWS, CELL_SIZE, BLOCK_COLORS } from './engine.js';

let ctx, canvas;
let testBlocks = [];
let getActiveBlock = null;

export function initRenderer(getActiveBlockFn) {
  canvas = document.getElementById('arena');
  ctx = canvas.getContext('2d');
  getActiveBlock = getActiveBlockFn;
  drawArena();
}

export function drawArena() {
  // Arena background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Arena border
  ctx.strokeStyle = '#0066FF';
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Grid lines
  ctx.save();
  ctx.strokeStyle = '#23234b';
  ctx.lineWidth = 1;
  for (let x = 0; x <= ARENA_COLS; x++) {
    ctx.beginPath();
    ctx.moveTo(x * CELL_SIZE, 0);
    ctx.lineTo(x * CELL_SIZE, ARENA_ROWS * CELL_SIZE);
    ctx.stroke();
  }
  for (let y = 0; y <= ARENA_ROWS; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * CELL_SIZE);
    ctx.lineTo(ARENA_COLS * CELL_SIZE, y * CELL_SIZE);
    ctx.stroke();
  }
  ctx.restore();
}

export function drawBlock(block) {
  const color = BLOCK_COLORS[block.shapeId];
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  for (const cell of block.getCells()) {
    ctx.fillRect(cell.x * CELL_SIZE, cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    ctx.strokeRect(cell.x * CELL_SIZE, cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
  ctx.restore();
}

export function renderLoop() {
  drawArena();
  // Draw active block if present
  if (getActiveBlock) {
    const block = getActiveBlock();
    if (block) drawBlock(block);
  }
  requestAnimationFrame(renderLoop);
}

export function setTestBlocks(blocks) {
  testBlocks = blocks;
}
