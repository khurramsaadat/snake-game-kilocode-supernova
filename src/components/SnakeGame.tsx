'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

import { useSnakeGame } from '@/hooks/use-snake-game';
import { useGameControls } from '@/hooks/use-game-controls';
import { useAudio } from '@/hooks/use-audio';
import { useFullscreen } from '@/hooks/use-fullscreen'; // Import useFullscreen

import { GameBoard } from '@/components/game/GameBoard';
import { Snake } from '@/components/game/Snake';
import { Food } from '@/components/game/Food';
import { StartScreen } from '@/components/ui/StartScreen';
import { FullscreenControls } from '@/components/ui/FullscreenControls'; // Reintroduce FullscreenControls
import { GameOverDialog } from '@/components/ui/GameOverDialog';

import { Button } from '@/components/ui/button';
import { GRID_SIZE_DESKTOP, CELL_SIZE_DESKTOP, GRID_SIZE_MOBILE, CELL_SIZE_MOBILE } from '@/lib/game-constants';

export function SnakeGame() {
  const [isMobile, setIsMobile] = useState(false);
  const [boardDimensions, setBoardDimensions] = useState({
    boardWidth: GRID_SIZE_DESKTOP * CELL_SIZE_DESKTOP,
    boardHeight: GRID_SIZE_DESKTOP * CELL_SIZE_DESKTOP * 1.5,
    gridWidth: GRID_SIZE_DESKTOP,
    gridHeight: Math.floor(GRID_SIZE_DESKTOP * 1.5),
  });

  // Detect mobile device and set board dimensions
  useEffect(() => {
    const calculateDimensions = () => {
      const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
      setIsMobile(mobile);

      let currentGridWidth;
      let currentCellSize;

      if (mobile) {
        // For mobile, use a percentage of the width to ensure it scales down
        const maxMobileBoardWidth = window.innerWidth * 0.9; // 90% of viewport width
        currentCellSize = CELL_SIZE_MOBILE;
        currentGridWidth = Math.floor(maxMobileBoardWidth / currentCellSize);
        if (currentGridWidth < 10) currentGridWidth = 10; // Minimum grid size
      } else {
        currentGridWidth = GRID_SIZE_DESKTOP;
        currentCellSize = CELL_SIZE_DESKTOP;
      }

      const currentBoardWidth = currentGridWidth * currentCellSize;
      const currentGridHeight = Math.floor(currentGridWidth * 1.5);
      const currentBoardHeight = currentGridHeight * currentCellSize;

      setBoardDimensions({
        boardWidth: currentBoardWidth,
        boardHeight: currentBoardHeight,
        gridWidth: currentGridWidth,
        gridHeight: currentGridHeight,
      });
      console.log('Mobile detection:', { width: window.innerWidth, hasTouch: 'ontouchstart' in window, isMobile: mobile, boardDimensions: { currentBoardWidth, currentBoardHeight, currentGridWidth, currentGridHeight } });
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);

    return () => window.removeEventListener('resize', calculateDimensions);
  }, []);

  const { playEatSound, playGameOverSound } = useAudio();

  const {
    snakePosition,
    foodPosition,
    score,
    gameState,
    highScore,
    isMuted,
    startGame,
    resetGame,
    setDirection,
    toggleMute,
  } = useSnakeGame(playEatSound, boardDimensions.gridWidth, boardDimensions.gridHeight);
  const { handleTouchStart, handleTouchEnd, handleTouchMove } = useGameControls({
    onDirectionChange: setDirection,
    isGameActive: gameState === 'playing',
  });


  // Play sound effects
  useEffect(() => {
    if (gameState === 'gameOver' && !isMuted) {
      playGameOverSound();
    }
  }, [gameState, playGameOverSound, isMuted]);

  const handleStartGame = () => {
    startGame();
  };

  const handlePlayAgain = () => {
    resetGame();
    // Ensure we go back to start screen
    setTimeout(() => {
      // This will trigger the start screen to show
    }, 100);
  };

  const { enterFullscreen } = useFullscreen(); // Use the hook

  // Automatically enter fullscreen on mobile when game starts
  useEffect(() => {
    if (isMobile && gameState === 'playing') {
      enterFullscreen();
    }
  }, [isMobile, gameState, enterFullscreen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col p-2 md:p-4">
      {/* Header with score and controls */}
      <div className="w-full max-w-2xl mb-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Score: <span className="text-emerald-600">{score}</span>
          </div>
          {highScore > 0 && (
            <div className="text-lg text-slate-600 dark:text-slate-400">
              High: <span className="text-amber-600">{highScore}</span>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMute}
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full pt-4 max-w-none px-0 mobile-full-width"> {/* Reduced pt-8 to pt-4 */}
        {/* Fullscreen Controls - only render on mobile */}
        {isMobile && <FullscreenControls isMobile={isMobile} gameState={gameState} />}

        {/* Game Container - Moved up slightly */}
        <div className={`relative mb-4`} style={{ width: boardDimensions.boardWidth }}> {/* Adjusted width */}
          <GameBoard 
            boardWidth={boardDimensions.boardWidth}
            boardHeight={boardDimensions.boardHeight}
            gridWidth={boardDimensions.gridWidth} // Pass gridWidth
            onTouchStart={gameState === 'playing' ? handleTouchStart : undefined}
            onTouchEnd={gameState === 'playing' ? handleTouchEnd : undefined}
            onTouchMove={gameState === 'playing' ? handleTouchMove : undefined}
          >
            <AnimatePresence>
              {(gameState === 'playing' || gameState === 'gameOver') && (
                <motion.div
                  key="game"
                  className="touch-none select-none"
                  style={{ touchAction: 'none' }} // Disable default touch behaviors
                >
                  <Snake snake={snakePosition} />
                  <Food position={foodPosition} />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {gameState === 'start' && (
                <StartScreen
                  highScore={highScore}
                  onStartGame={handleStartGame}
                  isMobile={isMobile}
                />
              )}
            </AnimatePresence>
          </GameBoard>
        </div>
      </div>

      {/* Game Over Dialog */}
      {gameState === 'gameOver' && (
        <GameOverDialog
          isOpen={gameState === 'gameOver'}
          onPlayAgain={handlePlayAgain}
        />
      )}

    </div>
  );
}
