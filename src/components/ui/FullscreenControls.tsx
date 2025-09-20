import React from 'react';
import { motion } from 'framer-motion';
import { Maximize, Minimize, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFullscreen } from '@/hooks/use-fullscreen';

interface FullscreenControlsProps {
  isMobile: boolean;
  gameState: 'start' | 'playing' | 'gameOver';
}

export function FullscreenControls({ isMobile, gameState }: FullscreenControlsProps) {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  // Always show fullscreen controls, but only enable during gameplay
  const isDisabled = gameState !== 'playing';

  return (
    <motion.div
      className="flex justify-center mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={toggleFullscreen}
          disabled={isDisabled}
          variant="outline"
          size="sm"
          className={`
            bg-gradient-to-r from-emerald-50 to-cyan-50 hover:from-emerald-100 hover:to-cyan-100
            dark:from-emerald-900/30 dark:to-cyan-900/30 dark:hover:from-emerald-800/40 dark:hover:to-cyan-800/40
            border-2 border-emerald-200 dark:border-emerald-700
            shadow-lg hover:shadow-xl transition-all duration-300
            ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-emerald-300 dark:hover:border-emerald-600'}
          `}
        >
          {isFullscreen ? (
            <>
              <Minimize size={18} className="mr-2 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">Exit Fullscreen</span>
            </>
          ) : (
            <>
              <Maximize size={18} className="mr-2 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">Go Fullscreen</span>
            </>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}