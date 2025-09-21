import { useState, useEffect, useCallback, useRef } from 'react';
import {
  GRID_SIZE,
  GRID_SIZE_MOBILE,
  GRID_SIZE_DESKTOP,
  getInitialSnakePosition,
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

export function useSnakeGame(playEatSound: () => void, gridWidth: number, gridHeight: number): GameStateReturn {
  // Game state
  const [snakePosition, setSnakePosition] = useState<Position[]>(getInitialSnakePosition(gridWidth));
  const [foodPosition, setFoodPosition] = useState<Position>({ x: 7, y: 7 }); // Better initial position within bounds
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

  // Generate food position with better positioning
  const generateFoodPositionAligned = useCallback((currentSnake: Position[]): Position => {
    let newPosition: Position;
    const minPos = 1; // Keep food away from edges
    const maxX = gridWidth - 2;
    const maxY = gridHeight - 2;

    do {
      // Ensure food is properly positioned within safe bounds
      newPosition = {
        x: Math.floor(Math.random() * (maxX - minPos + 1)) + minPos,
        y: Math.floor(Math.random() * (maxY - minPos + 1)) + minPos,
      };

      // Double-check bounds to be absolutely sure
      newPosition.x = Math.max(minPos, Math.min(maxX, newPosition.x));
      newPosition.y = Math.max(minPos, Math.min(maxY, newPosition.y));

    } while (currentSnake.some(segment => segment.x === newPosition.x && segment.y === newPosition.y));

    console.log('Generated food position:', newPosition, 'within bounds:', {
      x: newPosition.x >= 0 && newPosition.x < gridWidth,
      y: newPosition.y >= 0 && newPosition.y < gridHeight
    });

    return newPosition;
  }, [gridWidth, gridHeight]);

  // Check collision with walls or self
  const checkCollision = useCallback((head: Position, body: Position[]): boolean => {
    // Debug logging to understand collision detection
    console.log('Collision check - Head:', head, 'Grid size:', { width: gridWidth, height: gridHeight });

    if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
      console.log('Wall collision detected:', head, 'Grid size:', { width: gridWidth, height: gridHeight });
      return true;
    }

    // Self collision - check if head hits any part of the body
    const selfCollision = body.some(segment => segment.x === head.x && segment.y === head.y);
    if (selfCollision) {
      console.log('Self collision detected:', head, 'Body segments:', body.length);
      return true;
    }

    console.log('No collision detected');
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
  }, [gameState, nextDirection, foodPosition, checkCollision, generateFoodPositionAligned, playEatSound]);

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
    const initialSnake = getInitialSnakePosition(gridWidth);
    setGameState('playing');
    setSnakePosition(initialSnake);
    setFoodPosition(generateFoodPositionAligned(initialSnake));
    setDirection('RIGHT');
    setNextDirection('RIGHT');
    setScore(0);
    tickRateRef.current = INITIAL_TICK_RATE;
  }, [generateFoodPositionAligned, gridWidth]);

  const resetGame = useCallback(() => {
    const initialSnake = getInitialSnakePosition(gridWidth);
    setGameState('start');
    setSnakePosition(initialSnake);
    setFoodPosition(generateFoodPositionAligned(initialSnake));
    setDirection('RIGHT');
    setNextDirection('RIGHT');
    setScore(0);
    tickRateRef.current = INITIAL_TICK_RATE;
  }, [generateFoodPositionAligned, gridWidth]);

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
