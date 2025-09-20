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
      className="flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 shadow-2xl border-2 border-emerald-200 dark:border-emerald-700"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="text-lg text-emerald-700 dark:text-emerald-300 mb-6 font-semibold">
        Touch Controls
      </div>

      {/* Up button */}
      <motion.div
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="mb-4"
      >
        <Button
          onClick={() => handleDirectionClick('UP')}
          disabled={disabled}
          variant="outline"
          size="lg"
          className="w-20 h-20 p-0 bg-gradient-to-br from-emerald-100 to-emerald-200 hover:from-emerald-300 hover:to-emerald-400 dark:from-emerald-800 dark:to-emerald-700 dark:hover:from-emerald-600 dark:hover:to-emerald-500 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-emerald-300 dark:border-emerald-600"
        >
          <ChevronUp size={32} className="text-emerald-700 dark:text-emerald-300" />
        </Button>
      </motion.div>

      <div className="flex gap-6">
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
            className="w-20 h-20 p-0 bg-gradient-to-br from-emerald-100 to-emerald-200 hover:from-emerald-300 hover:to-emerald-400 dark:from-emerald-800 dark:to-emerald-700 dark:hover:from-emerald-600 dark:hover:to-emerald-500 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-emerald-300 dark:border-emerald-600"
          >
            <ChevronLeft size={32} className="text-emerald-700 dark:text-emerald-300" />
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
            className="w-20 h-20 p-0 bg-gradient-to-br from-emerald-100 to-emerald-200 hover:from-emerald-300 hover:to-emerald-400 dark:from-emerald-800 dark:to-emerald-700 dark:hover:from-emerald-600 dark:hover:to-emerald-500 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-emerald-300 dark:border-emerald-600"
          >
            <ChevronDown size={32} className="text-emerald-700 dark:text-emerald-300" />
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
            className="w-20 h-20 p-0 bg-gradient-to-br from-emerald-100 to-emerald-200 hover:from-emerald-300 hover:to-emerald-400 dark:from-emerald-800 dark:to-emerald-700 dark:hover:from-emerald-600 dark:hover:to-emerald-500 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-emerald-300 dark:border-emerald-600"
          >
            <ChevronRight size={32} className="text-emerald-700 dark:text-emerald-300" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}