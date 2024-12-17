import React, { useState } from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Avatar from './Avatar';

export default function ProfileButton() {
  const [showMenu, setShowMenu] = useState(false);
  const { profile, signOut } = useAuth();

  if (!profile) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-shadow"
      >
        <Avatar username={profile.username} size={24} />
        <span className="text-gray-700">{profile.username}</span>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
          <button
            onClick={signOut}
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      )}
    </div>
  );
}