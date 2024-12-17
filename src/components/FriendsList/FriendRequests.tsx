import React from 'react';
import { Bell } from 'lucide-react';
import { Profile, Friendship } from '../../types/supabase';
import Avatar from '../Avatar';

interface FriendRequestsProps {
  requests: Array<Profile & { friendship?: Friendship }>;
  onAccept: (friendshipId: string) => Promise<void>;
  onReject: (friendshipId: string) => Promise<void>;
}

export default function FriendRequests({ requests, onAccept, onReject }: FriendRequestsProps) {
  if (requests.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
        <p>Bekleyen istek yok</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {requests.map(request => (
        <div
          key={request.id}
          className="bg-white p-4 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar username={request.username} size={40} />
              <div>
                <div className="font-medium text-gray-800">{request.username}</div>
                <div className="text-sm text-gray-500">{request.city}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => request.friendship && onAccept(request.friendship.id)}
                className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
              >
                Kabul Et
              </button>
              <button
                onClick={() => request.friendship && onReject(request.friendship.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
              >
                Reddet
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}