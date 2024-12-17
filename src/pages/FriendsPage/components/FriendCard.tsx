import React from 'react';
import { Clock, Award, Timer, Circle } from 'lucide-react';
import { Profile } from '../../../types/supabase';
import { Badge } from '../../../utils/badges';
import Avatar from '../../../components/Avatar';
import BadgeDisplay from '../../../components/BadgeDisplay';
import { formatTime } from '../../../utils/formatTime';

interface FriendCardProps {
  friend: Profile;
  badges: {
    weekly: Badge[];
    special: Badge[];
    regular: Badge[];
  };
  isOnline: boolean;
}

export default function FriendCard({ friend, badges, isOnline }: FriendCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
      {/* Profile Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar username={friend.username} size={48} />
            <Circle
              className={`absolute bottom-0 right-0 w-3 h-3 ${
                isOnline ? 'text-green-500' : 'text-gray-300'
              }`}
              fill="currentColor"
            />
          </div>
          <div>
            <div className="font-medium text-gray-800 text-lg">{friend.username}</div>
            <div className="text-sm text-gray-500">{friend.city}</div>
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same */}
    </div>
  );
}