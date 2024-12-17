import React from 'react';
import { Users, Clock, Award } from 'lucide-react';
import { Profile } from '../../types/supabase';
import Avatar from '../Avatar';
import { formatTime } from '../../utils/formatTime';

interface FriendGridProps {
  friends: Profile[];
}

export default function FriendGrid({ friends }: FriendGridProps) {
  if (friends.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
        <p>Henüz arkadaşınız yok</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {friends.map((friend) => (
        <div
          key={friend.id}
          className="bg-white p-4 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar username={friend.username} size={40} />
              <div>
                <div className="font-medium text-gray-800">{friend.username}</div>
                <div className="text-sm text-gray-500">{friend.city}</div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 text-green-600">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">{friend.total_caciks} cacık</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{formatTime(friend.average_time)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}