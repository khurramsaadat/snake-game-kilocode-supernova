import React from 'react';
import { motion } from 'framer-motion';
import { BOARD_SIZE, CELL_SIZE } from '@/lib/game-constants';

interface GameBoardProps {
  children: React.ReactNode;
}

export function GameBoard({ children }: GameBoardProps) {
  return (
    <motion.div
      className="relative bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg shadow-lg"
      style={{
        width: BOARD_SIZE,
        height: BOARD_SIZE,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #64748b 1px, transparent 1px),
            linear-gradient(to bottom, #64748b 1px, transparent 1px)
          `,
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
        }}
      />
      {children}
    </motion.div>
  );
}