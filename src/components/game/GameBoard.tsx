import React from 'react';
import { motion } from 'framer-motion';
import { getBoardSize, getCellSize } from '@/lib/game-constants';

interface GameBoardProps {
  children: React.ReactNode;
  isMobile?: boolean;
}

export function GameBoard({ children, isMobile = false }: GameBoardProps) {
  const boardSize = getBoardSize(isMobile);
  const cellSize = getCellSize(isMobile);

  return (
    <motion.div
      className="relative bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg shadow-lg"
      style={{
        width: boardSize,
        height: boardSize,
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
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
      />
      {children}
    </motion.div>
  );
}