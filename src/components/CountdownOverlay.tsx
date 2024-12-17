import React from 'react';

interface CountdownOverlayProps {
  message: string;
  isVisible: boolean;
}

export default function CountdownOverlay({ message, isVisible }: CountdownOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="text-white text-3xl font-bold animate-bounce">
        {message}
      </div>
    </div>
  );
}