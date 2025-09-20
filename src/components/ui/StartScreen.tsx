import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface StartScreenProps {
  highScore: number;
  onStartGame: () => void;
  isMobile?: boolean;
}

export function StartScreen({ highScore, onStartGame, isMobile = false }: StartScreenProps) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center space-y-8 p-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Snake
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Modern Snake Game
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {highScore > 0 && (
            <div className="text-lg text-slate-700 dark:text-slate-300">
              High Score: <span className="font-bold text-emerald-600">{highScore}</span>
            </div>
          )}

          <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <p>🎮 Desktop: Use arrow keys</p>
            <p>📱 Mobile: Swipe to control</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            onClick={onStartGame}
            size="lg"
            className="px-8 py-4 text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Start Game
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}