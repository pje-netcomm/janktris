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
    // For now, no rotation logic (added in milestone 6)
    const shape = BLOCK_SHAPES[this.shapeId];
    return shape.map(([dx, dy]) => ({
      x: this.origin.x + dx,
      y: this.origin.y + dy
    }));
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
}

export function startGame() {
  gameState.arena = createArena();
  spawnBlock();
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
