import { useEffect, useCallback, useRef } from 'react';
import { Direction } from '@/lib/game-constants';

interface UseGameControlsProps {
  onDirectionChange: (direction: Direction) => void;
  isGameActive: boolean;
}

export function useGameControls({ onDirectionChange, isGameActive }: UseGameControlsProps) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Desktop controls
  useEffect(() => {
    if (!isGameActive) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      event.preventDefault();

      switch (event.key) {
        case 'ArrowUp':
          onDirectionChange('UP');
          break;
        case 'ArrowDown':
          onDirectionChange('DOWN');
          break;
        case 'ArrowLeft':
          onDirectionChange('LEFT');
          break;
        case 'ArrowRight':
          onDirectionChange('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onDirectionChange, isGameActive]);

  // Mobile touch controls
  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    if (!isGameActive) return;

    const touch = event.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  }, [isGameActive]);

  const handleTouchEnd = useCallback((event: React.TouchEvent) => {
    if (!isGameActive || !touchStartRef.current) return;

    const touch = event.changedTouches[0];
    const touchEnd = {
      x: touch.clientX,
      y: touch.clientY,
    };

    const deltaX = touchEnd.x - touchStartRef.current.x;
    const deltaY = touchEnd.y - touchStartRef.current.y;

    const minSwipeDistance = 30;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          onDirectionChange('RIGHT');
        } else {
          onDirectionChange('LEFT');
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0) {
          onDirectionChange('DOWN');
        } else {
          onDirectionChange('UP');
        }
      }
    }

    touchStartRef.current = null;
  }, [onDirectionChange, isGameActive]);

  return {
    handleTouchStart,
    handleTouchEnd,
  };
}