import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button'; // Import Button

interface GameOverDialogProps {
  isOpen: boolean;
  onPlayAgain: () => void; // Reintroduce onPlayAgain prop
}

export function GameOverDialog({ isOpen, onPlayAgain }: GameOverDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center text-black text-4xl font-bold mt-8 flex flex-col items-center" // Added flex and items-center
        >
          Game Over
          <Button
            onClick={onPlayAgain}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Play Again
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
