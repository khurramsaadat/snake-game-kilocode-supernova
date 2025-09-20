import React from 'react';
import { motion } from 'framer-motion';
import { CELL_SIZE } from '@/lib/game-constants';
import { Position } from '@/hooks/use-snake-game';

interface FoodProps {
  position: Position;
}

export function Food({ position }: FoodProps) {
  return (
    <motion.div
      className="absolute rounded-full bg-red-500 shadow-lg"
      style={{
        width: CELL_SIZE - 4,
        height: CELL_SIZE - 4,
        left: position.x * CELL_SIZE + 2,
        top: position.y * CELL_SIZE + 2,
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