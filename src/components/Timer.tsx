import React from 'react';

interface TimerProps {
  seconds: number;
}

export default function Timer({ seconds }: TimerProps) {
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-4xl font-mono font-bold text-green-600">
      {formatTime(seconds)}
    </div>
  );
}