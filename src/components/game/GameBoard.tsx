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
      className={`relative bg-gradient-to-br from-emerald-50 via-slate-50 to-cyan-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 border-4 border-emerald-200 dark:border-emerald-700 rounded-3xl shadow-2xl ${isMobile ? 'mx-6' : 'mx-4'} backdrop-blur-sm`}
      style={{
        width: boardSize,
        height: boardSize,
      }}
      initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Enhanced grid pattern with subtle animation */}
      <div
        className="absolute inset-0 opacity-20 rounded-3xl"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0),
            radial-gradient(circle at ${cellSize/2}px ${cellSize/2}px, #06b6d4 0.5px, transparent 0)
          `,
          backgroundSize: `${cellSize}px ${cellSize}px, ${cellSize}px ${cellSize}px`,
          animation: 'gridPulse 4s ease-in-out infinite',
        }}
      />

      {/* Multiple glow layers for depth */}
      <div className="absolute inset-1 rounded-2xl bg-gradient-to-br from-emerald-100/30 via-white/20 to-cyan-100/30 dark:from-emerald-900/20 dark:via-white/5 dark:to-cyan-900/20" />
      <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-white/40 to-transparent dark:from-white/10 dark:to-transparent" />

      {/* Subtle inner border */}
      <div className="absolute inset-3 rounded-xl border border-emerald-200/50 dark:border-emerald-700/30" />

      {children}
    </motion.div>
  );
}