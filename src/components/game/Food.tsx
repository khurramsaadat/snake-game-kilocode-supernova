import React from 'react';
import { motion } from 'framer-motion';
import { CELL_SIZE } from '@/lib/game-constants';
import { Position } from '@/hooks/use-snake-game';

interface FoodProps {
  position: Position;
}

export function Food({ position }: FoodProps) {
  // Calculate proper centering within cell
  const foodSize = Math.max(CELL_SIZE - 6, 8); // Ensure minimum size of 8px
  const offset = (CELL_SIZE - foodSize) / 2;

  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg border-2 border-red-300"
      style={{
        width: foodSize,
        height: foodSize,
        left: position.x * CELL_SIZE + offset,
        top: position.y * CELL_SIZE + offset,
      }}
      initial={{ scale: 0, rotate: 0 }}
      animate={{
        scale: [0, 1.2, 1],
        rotate: [0, 180, 360],
        boxShadow: [
          "0 0 0 0 rgba(239, 68, 68, 0.7)",
          "0 0 0 8px rgba(239, 68, 68, 0)",
          "0 0 0 0 rgba(239, 68, 68, 0)"
        ]
      }}
      transition={{
        scale: { duration: 0.5, ease: "easeOut" },
        rotate: { duration: 0.5, ease: "easeOut" },
        boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
      }}
    />
  );
}