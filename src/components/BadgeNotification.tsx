import React, { useEffect } from 'react';
import { Badge } from '../utils/badges';
import BadgeDisplay from './BadgeDisplay';
import Confetti from 'react-confetti';

interface BadgeNotificationProps {
  badge: Badge;
  onClose: () => void;
}

export default function BadgeNotification({ badge, onClose }: BadgeNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // 5 saniye sonra otomatik kapanır

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={200}
        gravity={0.3}
      />
      <div className="fixed top-4 right-4 left-4 sm:left-auto sm:w-96 bg-white rounded-xl shadow-lg p-4 z-50 animate-slide-in">
        <div className="flex items-center gap-4">
          <BadgeDisplay badge={badge} size="lg" showTooltip={false} />
          <div className="flex-grow">
            <div className="text-lg font-bold text-gray-800">
              Yeni Rozet Kazandın!
            </div>
            <div className="text-sm font-medium text-green-600 mb-1">
              {badge.name}
            </div>
            <div className="text-sm text-gray-500">
              {badge.description}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}