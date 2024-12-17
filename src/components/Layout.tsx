import React from 'react';
import ProfileButton from './ProfileButton';
import BottomNavigation from './BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showProfile?: boolean;
}

export default function Layout({ children, title, showProfile = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pb-16">
      {showProfile && (
        <div className="fixed top-0 right-0 p-4 z-50">
          <ProfileButton />
        </div>
      )}
      
      <div className="p-4">
        {title && (
          <h2 className="text-2xl font-bold text-green-600 mb-6">
            {title}
          </h2>
        )}
        {children}
      </div>
      
      <BottomNavigation />
    </div>
  );
}