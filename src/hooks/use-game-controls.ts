import { useEffect, useCallback, useRef } from 'react';
import { Direction } from '@/lib/game-constants';

interface UseGameControlsProps {
  onDirectionChange: (direction: Direction) => void;
  isGameActive: boolean;
}

export function useGameControls({ onDirectionChange, isGameActive }: UseGameControlsProps) {
  const touchStartRef = useRef<{ x: number; y: number; timestamp?: number } | null>(null);

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

    // Prevent scrolling and other default behaviors
    event.preventDefault();
    event.stopPropagation();

    const touch = event.touches[0];
    if (touch) {
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now(),
      };
    }
  }, [isGameActive]);

  const handleTouchMove = useCallback((event: React.TouchEvent) => {
    if (!isGameActive || !touchStartRef.current) return;

    // Prevent scrolling during touch move
    event.preventDefault();
    event.stopPropagation();

    // Optional: Add visual feedback during swipe
    const touch = event.touches[0];
    if (touch) {
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      // Provide immediate feedback for better UX
      const minSwipeDistance = 30; // Less sensitive for better control
      if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
        // Visual feedback could be added here if needed
      }
    }
  }, [isGameActive]);

  const handleTouchEnd = useCallback((event: React.TouchEvent) => {
    if (!isGameActive || !touchStartRef.current) return;

    // Prevent scrolling and other default behaviors
    event.preventDefault();
    event.stopPropagation();

    const touch = event.changedTouches[0];
    if (touch) {
      const touchEnd = {
        x: touch.clientX,
        y: touch.clientY,
      };

      const deltaX = touchEnd.x - touchStartRef.current.x;
      const deltaY = touchEnd.y - touchStartRef.current.y;

      const minSwipeDistance = 30; // Less sensitive for better control
      const maxSwipeTime = 500; // Maximum time for swipe (ms)
      const swipeTime = Date.now() - (touchStartRef.current.timestamp || Date.now());

      // Only register swipe if it's quick enough and long enough
      if (swipeTime < maxSwipeTime) {
        // Determine swipe direction with priority
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
      }
    }

    touchStartRef.current = null;
  }, [onDirectionChange, isGameActive]);

  return {
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
  };
}