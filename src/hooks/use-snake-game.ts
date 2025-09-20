import { useState, useEffect, useCallback, useRef } from 'react';
import {
  GRID_SIZE,
  INITIAL_SNAKE_POSITION,
  INITIAL_TICK_RATE,
  MIN_TICK_RATE,
  SPEED_INCREASE_FACTOR,
  POINTS_PER_FOOD,
  DIRECTIONS,
  Direction,
  type GameState
} from '@/lib/game-constants';

export interface Position {
  x: number;
  y: number;
}

export interface GameStateReturn {
  // Game state
  snakePosition: Position[];
  foodPosition: Position;
  direction: Direction;
  score: number;
  gameState: GameState;
  highScore: number;
  isMuted: boolean;

  // Actions
  startGame: () => void;
  resetGame: () => void;
  setDirection: (newDirection: Direction) => void;
  toggleMute: () => void;
  playEatSound: () => void;
}

export function useSnakeGame(playEatSound?: () => void): GameStateReturn {
  // Game state
  const [snakePosition, setSnakePosition] = useState<Position[]>(INITIAL_SNAKE_POSITION);
  const [foodPosition, setFoodPosition] = useState<Position>({ x: 12, y: 12 }); // Better initial position
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [nextDirection, setNextDirection] = useState<Direction>('RIGHT');
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('start');
  const [highScore, setHighScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Refs for game loop
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const tickRateRef = useRef(INITIAL_TICK_RATE);

  // Load high score from localStorage on mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('snake-high-score');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Generate random food position
  const generateFoodPosition = useCallback((currentSnake: Position[]): Position => {
    let newPosition: Position;
    do {
      newPosition = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(segment => segment.x === newPosition.x && segment.y === newPosition.y));
    return newPosition;
  }, []);

  // Generate food position with better positioning
  const generateFoodPositionAligned = useCallback((currentSnake: Position[]): Position => {
    let newPosition: Position;
    const minPos = 2; // Keep food away from edges
    const maxPos = GRID_SIZE - 3; // Keep food away from edges

    do {
      // Ensure food is properly positioned within safe bounds
      newPosition = {
        x: Math.floor(Math.random() * (maxPos - minPos + 1)) + minPos,
        y: Math.floor(Math.random() * (maxPos - minPos + 1)) + minPos,
      };

      // Double-check bounds to be absolutely sure
      newPosition.x = Math.max(minPos, Math.min(maxPos, newPosition.x));
      newPosition.y = Math.max(minPos, Math.min(maxPos, newPosition.y));

    } while (currentSnake.some(segment => segment.x === newPosition.x && segment.y === newPosition.y));

    return newPosition;
  }, []);

  // Check collision with walls or self
  const checkCollision = useCallback((head: Position, body: Position[]): boolean => {
    // Wall collision - check if head is outside the grid boundaries
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      console.log('Wall collision detected:', head, 'Grid size:', GRID_SIZE);
      return true;
    }

    // Self collision - check if head hits any part of the body
    const selfCollision = body.some(segment => segment.x === head.x && segment.y === head.y);
    if (selfCollision) {
      console.log('Self collision detected:', head);
      return true;
    }

    return false;
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return;

    setSnakePosition(currentSnake => {
      setDirection(nextDirection);

      const head = currentSnake[0];
      const directionVector = DIRECTIONS[nextDirection];
      const newHead: Position = {
        x: head.x + directionVector.x,
        y: head.y + directionVector.y,
      };

      // Check collision
      if (checkCollision(newHead, currentSnake)) {
        setGameState('gameOver');
        return currentSnake;
      }

      const newSnake = [newHead, ...currentSnake];

      // Check if food is eaten
      if (newHead.x === foodPosition.x && newHead.y === foodPosition.y) {
        setScore(prev => prev + POINTS_PER_FOOD);
        setFoodPosition(generateFoodPositionAligned(newSnake));
        // Play eat sound effect
        if (playEatSound) {
          playEatSound();
        }
        // Increase speed
        tickRateRef.current = Math.max(
          MIN_TICK_RATE,
          Math.floor(tickRateRef.current * SPEED_INCREASE_FACTOR)
        );
        // Update game loop speed
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
          gameLoopRef.current = setInterval(gameLoop, tickRateRef.current);
        }
      } else {
        // Remove tail if no food eaten
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameState, nextDirection, foodPosition, checkCollision, generateFoodPosition]);

  // Start game loop
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(gameLoop, tickRateRef.current);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop]);

  // Handle game over
  useEffect(() => {
    if (gameState === 'gameOver') {
      // Update high score
      if (score > highScore) {
        const newHighScore = score;
        setHighScore(newHighScore);
        localStorage.setItem('snake-high-score', newHighScore.toString());
      }
    }
  }, [gameState, score, highScore]);

  // Actions
  const startGame = useCallback(() => {
    setGameState('playing');
    setSnakePosition(INITIAL_SNAKE_POSITION);
    setFoodPosition(generateFoodPositionAligned(INITIAL_SNAKE_POSITION));
    setDirection('RIGHT');
    setNextDirection('RIGHT');
    setScore(0);
    tickRateRef.current = INITIAL_TICK_RATE;
  }, [generateFoodPositionAligned]);

  const resetGame = useCallback(() => {
    setGameState('start');
    setSnakePosition(INITIAL_SNAKE_POSITION);
    setFoodPosition(generateFoodPositionAligned(INITIAL_SNAKE_POSITION));
    setDirection('RIGHT');
    setNextDirection('RIGHT');
    setScore(0);
    tickRateRef.current = INITIAL_TICK_RATE;
  }, [generateFoodPositionAligned]);

  const setDirectionHandler = useCallback((newDirection: Direction) => {
    // Prevent reversing into self
    const opposites: Record<Direction, Direction> = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };

    if (opposites[newDirection] !== direction) {
      setNextDirection(newDirection);
    }
  }, [direction]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const handlePlayEatSound = () => {
    if (playEatSound) {
      playEatSound();
    }
  };

  return {
    snakePosition,
    foodPosition,
    direction,
    score,
    gameState,
    highScore,
    isMuted,
    startGame,
    resetGame,
    setDirection: setDirectionHandler,
    toggleMute,
    playEatSound: handlePlayEatSound,
  };
}