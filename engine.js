// engine.js
// Arena and game constants for Janktris

export const ARENA_COLS = 20;
export const ARENA_ROWS = 40;
export const CELL_SIZE = 20; // px

// Block shapes (S, Line-6, T, Z, L)
export const BLOCK_SHAPES = {
  S: [ [0,1], [1,1], [1,0], [2,0], [2,-1] ], // S shape
  LINE: [ [0,0], [1,0], [2,0], [3,0], [4,0], [5,0] ], // 6-wide line
  T: [ [0,0], [1,0], [2,0], [1,1], [1,-1] ], // T shape
  Z: [ [0,0], [1,0], [1,1], [2,1], [2,2] ], // Z shape
  L: [ [0,0], [1,0], [2,0], [2,1], [2,2] ] // L shape
};

export const BLOCK_COLORS = {
  S: '#00ff99',
  LINE: '#00ccff',
  T: '#ff00cc',
  Z: '#ff4444',
  L: '#ffaa00'
};

export class Block {
  constructor(shapeId, origin = {x: 10, y: 0}, rotation = 0) {
    this.shapeId = shapeId;
    this.origin = origin;
    this.rotation = rotation;
  }
  getCells() {
    // Rotation logic (milestone 6)
    const shape = BLOCK_SHAPES[this.shapeId];
    const angle = (this.rotation || 0) % 360;
    // Convert angle to radians
    const rad = angle * Math.PI / 180;
    // Precompute sin/cos for 90-degree steps
    let sin = 0, cos = 1;
    if (angle === 90 || angle === -270) { sin = 1; cos = 0; }
    else if (angle === 180 || angle === -180) { sin = 0; cos = -1; }
    else if (angle === 270 || angle === -90) { sin = -1; cos = 0; }
    // Center of rotation is the first cell (pivot)
    const [pivotX, pivotY] = shape[0];
    return shape.map(([dx, dy]) => {
      // Translate to pivot
      let x = dx - pivotX;
      let y = dy - pivotY;
      // Rotate
      let rx = Math.round(x * cos - y * sin);
      let ry = Math.round(x * sin + y * cos);
      // Translate back
      return {
        x: this.origin.x + rx + pivotX,
        y: this.origin.y + ry + pivotY
      };
    });
  }
}

function blockCollides(block, arena) {
  for (const cell of block.getCells()) {
    if (
      cell.x < 0 || cell.x >= ARENA_COLS ||
      cell.y < 0 || cell.y >= ARENA_ROWS ||
      (arena[cell.y] && arena[cell.y][cell.x])
    ) {
      return true;
    }
  }
  return false;
}

export function moveBlock(dir) {
  if (!gameState.activeBlock) return false;
  const { activeBlock, arena } = gameState;
  let newOrigin = { ...activeBlock.origin };
  if (dir === 'down') newOrigin.y += 1;
  if (dir === 'left') newOrigin.x -= 1;
  if (dir === 'right') newOrigin.x += 1;
  const moved = new Block(activeBlock.shapeId, newOrigin, activeBlock.rotation);
  if (!blockCollides(moved, arena)) {
    activeBlock.origin = newOrigin;
    return true;
  }
  return false;
}

export function fixBlock() {
  const { activeBlock, arena } = gameState;
  for (const cell of activeBlock.getCells()) {
    if (cell.y >= 0 && cell.y < ARENA_ROWS && cell.x >= 0 && cell.x < ARENA_COLS) {
      arena[cell.y][cell.x] = activeBlock.shapeId;
    }
  }
  clearFullRows(arena);
}

// Row clearing logic
export function clearFullRows(arena) {
  let rowsCleared = 0;
  for (let y = ARENA_ROWS - 1; y >= 0; y--) {
    if (arena[y].every(cell => cell)) {
      arena.splice(y, 1);
      arena.unshift(Array(ARENA_COLS).fill(null));
      rowsCleared++;
      y++; // recheck this row index after shifting
    }
  }
  return rowsCleared;
}

export function startGame() {
  gameState.arena = createArena();
  spawnBlock();
}

// Rotation for active block
export function rotateBlock(direction) {
  if (!gameState.activeBlock) return false;
  const { activeBlock, arena } = gameState;
  let newRotation = activeBlock.rotation;
  if (direction === 'cw') newRotation = (activeBlock.rotation + 90) % 360;
  if (direction === 'ccw') newRotation = (activeBlock.rotation + 270) % 360;
  const rotated = new Block(activeBlock.shapeId, activeBlock.origin, newRotation);
  if (!blockCollides(rotated, arena)) {
    activeBlock.rotation = newRotation;
    return true;
  }
  return false;
}

// Arena data structure (2D array)
export function createArena() {
  return Array.from({ length: ARENA_ROWS }, () => Array(ARENA_COLS).fill(null));
}

// Game state
export const gameState = {
  arena: createArena(),
  activeBlock: null
};

// Random block spawning
export function spawnBlock() {
  const shapeIds = Object.keys(BLOCK_SHAPES);
  const shapeId = shapeIds[Math.floor(Math.random() * shapeIds.length)];
  const rotation = Math.floor(Math.random() * 4) * 90;
  gameState.activeBlock = new Block(shapeId, {x: 10, y: 0}, rotation);
  return gameState.activeBlock;
}
