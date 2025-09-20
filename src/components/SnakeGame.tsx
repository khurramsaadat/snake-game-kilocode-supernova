'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

import { useSnakeGame } from '@/hooks/use-snake-game';
import { useGameControls } from '@/hooks/use-game-controls';
import { useAudio } from '@/hooks/use-audio';

import { GameBoard } from '@/components/game/GameBoard';
import { Snake } from '@/components/game/Snake';
import { Food } from '@/components/game/Food';
import { StartScreen } from '@/components/ui/StartScreen';
import { GameOverDialog } from '@/components/ui/GameOverDialog';
import { ArrowControls } from '@/components/ui/ArrowControls';
import { FullscreenControls } from '@/components/ui/FullscreenControls';

import { Button } from '@/components/ui/button';

export function SnakeGame() {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);
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
  } = useSnakeGame();

  const { playEatSound, playGameOverSound } = useAudio();
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col p-4">
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
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full pt-8">
        {/* Fullscreen Controls */}
        <FullscreenControls isMobile={isMobile} gameState={gameState} />

        {/* Game Container - Moved up slightly */}
        <div className="relative mb-8">
          <GameBoard isMobile={isMobile}>
            <AnimatePresence>
              {gameState === 'playing' && (
                <motion.div
                  key="game"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  onTouchMove={handleTouchMove}
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

        {/* Arrow Controls - Only show during gameplay */}
        {gameState === 'playing' && (
          <ArrowControls
            onDirectionChange={setDirection}
            disabled={false}
          />
        )}
      </div>

      {/* Game Over Dialog */}
      <GameOverDialog
        isOpen={gameState === 'gameOver'}
        score={score}
        highScore={highScore}
        onPlayAgain={handlePlayAgain}
      />

      {/* Instructions */}
      <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400 max-w-md">
        <p className="mb-2">
          <span className="font-semibold">Desktop:</span> Use arrow keys or buttons
        </p>
        <p>
          <span className="font-semibold">Mobile:</span> Swipe or use buttons
        </p>
      </div>
    </div>
  );
}