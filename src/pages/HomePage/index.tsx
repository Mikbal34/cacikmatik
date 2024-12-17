import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ProfileButton from '../../components/ProfileButton';
import CacikTimer from './CacikTimer';
import BadgeNotification from '../../components/BadgeNotification';
import BottomNavigation from '../../components/BottomNavigation';
import { useProfile } from '../../contexts/ProfileContext';

export default function HomePage() {
  const { profile } = useAuth();
  const { newBadge, clearNewBadge } = useProfile();

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="fixed top-0 right-0 p-4 z-50">
        <ProfileButton />
      </div>

      {newBadge && (
        <BadgeNotification
          badge={newBadge}
          onClose={clearNewBadge}
        />
      )}
      
      <div className="flex flex-col items-center justify-center min-h-screen pb-16">
        <div className="text-4xl font-bold text-green-600 mb-8">Cacıkmatik</div>
        <CacikTimer />
      </div>
      
      <BottomNavigation />
    </div>
  );
}