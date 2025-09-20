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
      className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg p-4 shadow-lg border border-slate-200 dark:border-slate-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-sm text-slate-600 dark:text-slate-400 mb-3 font-medium">
        Arrow Controls
      </div>

      {/* Up button */}
      <Button
        onClick={() => handleDirectionClick('UP')}
        disabled={disabled}
        variant="outline"
        size="sm"
        className="w-12 h-12 p-0 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-50"
      >
        <ChevronUp size={20} />
      </Button>

      <div className="flex gap-2 mt-2">
        {/* Left button */}
        <Button
          onClick={() => handleDirectionClick('LEFT')}
          disabled={disabled}
          variant="outline"
          size="sm"
          className="w-12 h-12 p-0 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-50"
        >
          <ChevronLeft size={20} />
        </Button>

        {/* Down button */}
        <Button
          onClick={() => handleDirectionClick('DOWN')}
          disabled={disabled}
          variant="outline"
          size="sm"
          className="w-12 h-12 p-0 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-50"
        >
          <ChevronDown size={20} />
        </Button>

        {/* Right button */}
        <Button
          onClick={() => handleDirectionClick('RIGHT')}
          disabled={disabled}
          variant="outline"
          size="sm"
          className="w-12 h-12 p-0 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-50"
        >
          <ChevronRight size={20} />
        </Button>
      </div>
    </motion.div>
  );
}