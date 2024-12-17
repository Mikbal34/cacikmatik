import React, { useEffect, useState } from 'react';
import { Crown, Star } from 'lucide-react';

interface CompletionAnimationProps {
  isVisible: boolean;
  time: number;
}

export default function CompletionAnimation({ isVisible, time }: CompletionAnimationProps) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldShow(true);
      const timer = setTimeout(() => {
        setShouldShow(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldShow) return null;

  const isPatient = time >= 300; // 5 dakika veya üzeri

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="text-center space-y-4">
        {isPatient ? (
          <>
            <div className="flex justify-center gap-4 animate-pulse">
              <Crown className="w-16 h-16 text-yellow-500" />
              <Star className="w-16 h-16 text-yellow-400" />
            </div>
            <div className="text-white text-3xl font-bold">
              Kral, bu nasıl kondisyon böyle! 👑
            </div>
          </>
        ) : (
          <>
            <div className="text-white text-3xl font-bold">
              Hayırdır birader baskın mı yedin! 🤔
            </div>
          </>
        )}
      </div>
    </div>
  );
}