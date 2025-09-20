import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Direction } from '@/lib/game-constants';

interface ArrowControlsProps {
  onDirectionChange: (direction: Direction) => void;
  disabled?: boolean;
}

export function ArrowControls({ onDirectionChange, disabled = false }: ArrowControlsProps) {
  const handleDirectionClick = (direction: Direction) => {
    if (!disabled) {
      onDirectionChange(direction);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-4 shadow-xl border-2 border-emerald-200 dark:border-emerald-700"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="text-sm text-emerald-700 dark:text-emerald-300 mb-3 font-medium">
        Touch Controls
      </div>

      {/* Up button */}
      <motion.div
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="mb-2"
      >
        <Button
          onClick={() => handleDirectionClick('UP')}
          disabled={disabled}
          variant="outline"
          size="lg"
          className="w-14 h-14 p-0 bg-gradient-to-br from-emerald-100 to-emerald-200 hover:from-emerald-300 hover:to-emerald-400 dark:from-emerald-800 dark:to-emerald-700 dark:hover:from-emerald-600 dark:hover:to-emerald-500 disabled:opacity-50 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-emerald-300 dark:border-emerald-600"
        >
          <ChevronUp size={24} className="text-emerald-700 dark:text-emerald-300" />
        </Button>
      </motion.div>

      <div className="flex gap-3">
        {/* Left button */}
        <motion.div
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1, rotate: -5 }}
        >
          <Button
            onClick={() => handleDirectionClick('LEFT')}
            disabled={disabled}
            variant="outline"
            size="lg"
            className="w-14 h-14 p-0 bg-gradient-to-br from-emerald-100 to-emerald-200 hover:from-emerald-300 hover:to-emerald-400 dark:from-emerald-800 dark:to-emerald-700 dark:hover:from-emerald-600 dark:hover:to-emerald-500 disabled:opacity-50 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-emerald-300 dark:border-emerald-600"
          >
            <ChevronLeft size={24} className="text-emerald-700 dark:text-emerald-300" />
          </Button>
        </motion.div>

        {/* Down button */}
        <motion.div
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Button
            onClick={() => handleDirectionClick('DOWN')}
            disabled={disabled}
            variant="outline"
            size="lg"
            className="w-14 h-14 p-0 bg-gradient-to-br from-emerald-100 to-emerald-200 hover:from-emerald-300 hover:to-emerald-400 dark:from-emerald-800 dark:to-emerald-700 dark:hover:from-emerald-600 dark:hover:to-emerald-500 disabled:opacity-50 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-emerald-300 dark:border-emerald-600"
          >
            <ChevronDown size={24} className="text-emerald-700 dark:text-emerald-300" />
          </Button>
        </motion.div>

        {/* Right button */}
        <motion.div
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Button
            onClick={() => handleDirectionClick('RIGHT')}
            disabled={disabled}
            variant="outline"
            size="lg"
            className="w-14 h-14 p-0 bg-gradient-to-br from-emerald-100 to-emerald-200 hover:from-emerald-300 hover:to-emerald-400 dark:from-emerald-800 dark:to-emerald-700 dark:hover:from-emerald-600 dark:hover:to-emerald-500 disabled:opacity-50 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-emerald-300 dark:border-emerald-600"
          >
            <ChevronRight size={24} className="text-emerald-700 dark:text-emerald-300" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}