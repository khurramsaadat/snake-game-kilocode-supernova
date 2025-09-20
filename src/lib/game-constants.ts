// Game configuration constants
export const GRID_SIZE = 25;
export const CELL_SIZE = 16;
export const BOARD_SIZE = GRID_SIZE * CELL_SIZE;

// Game timing
export const INITIAL_TICK_RATE = 150; // milliseconds
export const MIN_TICK_RATE = 50; // minimum speed
export const SPEED_INCREASE_FACTOR = 0.95; // how much faster per food eaten

// Scoring
export const POINTS_PER_FOOD = 10;

// Directions
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
} as const;

// Initial snake position (center of board, moving right)
export const INITIAL_SNAKE_POSITION = [
  { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) },
  { x: Math.floor(GRID_SIZE / 2) - 1, y: Math.floor(GRID_SIZE / 2) },
  { x: Math.floor(GRID_SIZE / 2) - 2, y: Math.floor(GRID_SIZE / 2) },
];

// Game states
export type GameState = 'start' | 'playing' | 'gameOver';