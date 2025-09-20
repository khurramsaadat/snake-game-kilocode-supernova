import { useCallback, useRef } from 'react';

export function useAudio() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!audioContextRef.current) {
      initAudioContext();
    }

    if (audioContextRef.current) {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration);

      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration);
    }
  }, [initAudioContext]);

  const playEatSound = useCallback(() => {
    // Pleasant ascending chime for eating food
    playSound(523, 0.15, 'sine'); // C5
    setTimeout(() => playSound(659, 0.15, 'sine'), 80); // E5
    setTimeout(() => playSound(784, 0.2, 'sine'), 160); // G5
  }, [playSound]);

  const playGameOverSound = useCallback(() => {
    // Descending sad tone for game over
    playSound(330, 0.3, 'triangle');
    setTimeout(() => playSound(220, 0.3, 'triangle'), 150);
    setTimeout(() => playSound(165, 0.5, 'triangle'), 300);
  }, [playSound]);

  return {
    playEatSound,
    playGameOverSound,
    initAudioContext,
  };
}