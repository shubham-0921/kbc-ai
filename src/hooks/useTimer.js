import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(duration, onExpire, autoStart = false) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef(null);
  const onExpireRef = useRef(onExpire);

  // Keep onExpire ref up to date
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = Math.max(0, prev - 0.1);
          return Number(newTime.toFixed(1));
        });
      }, 100);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else if (timeLeft <= 0 && isRunning) {
      setIsRunning(false);
      if (onExpireRef.current) {
        onExpireRef.current();
      }
    }
  }, [isRunning, timeLeft]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback((newDuration = duration) => {
    setTimeLeft(newDuration);
    setIsRunning(false);
  }, [duration]);

  const restart = useCallback((newDuration = duration) => {
    setTimeLeft(newDuration);
    setIsRunning(true);
  }, [duration]);

  // Get progress percentage (0-100)
  const progress = ((duration - timeLeft) / duration) * 100;

  // Get color based on time left
  const getColor = () => {
    const percentage = (timeLeft / duration) * 100;
    if (percentage > 66) return 'green';
    if (percentage > 33) return 'yellow';
    return 'red';
  };

  return {
    timeLeft,
    isRunning,
    progress,
    color: getColor(),
    start,
    pause,
    reset,
    restart
  };
}
