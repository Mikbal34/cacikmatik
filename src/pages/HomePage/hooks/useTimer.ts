import { useState, useCallback } from 'react';

export function useTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    setSeconds(0);
    setShowCompletion(false);

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Store interval ID in localStorage to persist across page reloads
    localStorage.setItem('timerInterval', interval.toString());
    localStorage.setItem('timerStartTime', Date.now().toString());
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    setShowCompletion(true);

    // Clear interval and stored data
    const intervalId = localStorage.getItem('timerInterval');
    if (intervalId) {
      clearInterval(parseInt(intervalId));
      localStorage.removeItem('timerInterval');
      localStorage.removeItem('timerStartTime');
    }
  }, []);

  // Restore timer state on component mount
  useState(() => {
    const startTime = localStorage.getItem('timerStartTime');
    const intervalId = localStorage.getItem('timerInterval');

    if (startTime && intervalId) {
      const elapsed = Math.floor((Date.now() - parseInt(startTime)) / 1000);
      setSeconds(elapsed);
      setIsRunning(true);
    }
  });

  return {
    seconds,
    isRunning,
    showCompletion,
    startTimer,
    stopTimer
  };
}