import { useState, useEffect, useCallback } from 'react';

export function useTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    setSeconds(0);
    setShowCompletion(false);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    setShowCompletion(true);
  }, []);

  return {
    seconds,
    isRunning,
    showCompletion,
    startTimer,
    stopTimer
  };
}