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
  constructor(shapeId, origin = {x: 5, y: 2}, rotation = 0) {
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
