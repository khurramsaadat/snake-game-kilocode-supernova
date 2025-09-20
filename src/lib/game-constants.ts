// Game configuration constants - responsive sizing
export const GRID_SIZE_DESKTOP = 30;
export const GRID_SIZE_MOBILE = 20;
export const CELL_SIZE_DESKTOP = 16;
export const CELL_SIZE_MOBILE = 20;

// Default constants (desktop size for backward compatibility)
export const GRID_SIZE = GRID_SIZE_DESKTOP;
export const CELL_SIZE = CELL_SIZE_DESKTOP;
export const BOARD_SIZE = GRID_SIZE * CELL_SIZE;

// Helper functions for responsive sizing
export const getGridSize = (isMobile: boolean) => isMobile ? GRID_SIZE_MOBILE : GRID_SIZE_DESKTOP;
export const getCellSize = (isMobile: boolean) => isMobile ? CELL_SIZE_MOBILE : CELL_SIZE_DESKTOP;
export const getBoardSize = (isMobile: boolean) => getGridSize(isMobile) * getCellSize(isMobile);

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