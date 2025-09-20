import React from 'react';
import { motion } from 'framer-motion';
import { CELL_SIZE } from '@/lib/game-constants';
import { Position } from '@/hooks/use-snake-game';

interface SnakeProps {
  snake: Position[];
}

export function Snake({ snake }: SnakeProps) {
  return (
    <>
      {snake.map((segment, index) => (
        <motion.div
          key={`${segment.x}-${segment.y}`}
          className={`absolute rounded-sm ${
            index === 0
              ? 'bg-emerald-600 dark:bg-emerald-500 shadow-lg'
              : 'bg-emerald-500 dark:bg-emerald-400'
          }`}
          style={{
            width: CELL_SIZE - 4,
            height: CELL_SIZE - 4,
            left: segment.x * CELL_SIZE + 2,
            top: segment.y * CELL_SIZE + 2,
          }}
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{
            scale: 1,
            opacity: 1,
            x: 0,
            y: 0
          }}
          transition={{
            duration: 0.15,
            ease: "easeOut"
          }}
          // Add a subtle glow to the head
          {...(index === 0 && {
            animate: {
              boxShadow: [
                "0 0 0 0 rgba(16, 185, 129, 0.7)",
                "0 0 0 4px rgba(16, 185, 129, 0)",
                "0 0 0 0 rgba(16, 185, 129, 0)"
              ]
            },
            transition: {
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut"
            }
          })}
        />
      ))}
    </>
  );
}