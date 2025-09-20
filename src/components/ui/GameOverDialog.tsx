import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="sm:max-w-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl font-bold">
              {isNewHighScore ? '🎉 New High Score!' : '💀 Game Over'}
            </AlertDialogTitle>
            <div className="text-center space-y-4">
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
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-col gap-2">
            <AlertDialogAction asChild>
              <Button
                onClick={onPlayAgain}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Play Again
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
}