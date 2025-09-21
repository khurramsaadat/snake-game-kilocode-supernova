import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface GameOverDialogProps {
  isOpen: boolean;
  score: number;
  highScore: number;
  onPlayAgain: () => void;
}

export function GameOverDialog({ isOpen, score, highScore, onPlayAgain }: GameOverDialogProps) {
  const isNewHighScore = score === highScore && score > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-md mx-auto mt-6 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-emerald-200 dark:border-emerald-700"
        >
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {isNewHighScore ? '🎉 New High Score!' : '💀 Game Over'}
            </div>

            <p className="text-slate-600 dark:text-slate-400">
              {isNewHighScore
                ? 'Congratulations! You achieved a new high score.'
                : 'Game has ended.'
              }
            </p>

            <div className="text-4xl font-bold text-slate-900 dark:text-slate-100">
              {score}
            </div>

            <div className="space-y-2">
              <p className="text-slate-600 dark:text-slate-400">
                {isNewHighScore
                  ? 'Congratulations! You set a new record!'
                  : `Your score: ${score}`
                }
              </p>
              {highScore > 0 && (
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  High Score: {highScore}
                </p>
              )}
            </div>

            <Button
              onClick={onPlayAgain}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Play Again
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}