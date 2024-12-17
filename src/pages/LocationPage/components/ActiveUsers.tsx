import React from 'react';
import { Users } from 'lucide-react';
import Avatar from '../../../components/Avatar';

interface ActiveUser {
  username: string;
  startTime: string;
}

interface ActiveUsersProps {
  users: ActiveUser[];
}

export default function ActiveUsers({ users }: ActiveUsersProps) {
  if (users.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
        <p>Şu an aktif cacık yapan yok</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {users.map((user, index) => (
        <div 
          key={index}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-3">
            <Avatar username={user.username} size={32} />
            <span className="font-medium text-gray-700">{user.username}</span>
          </div>
          <div className="text-sm text-gray-500">
            {new Date(user.startTime).toLocaleTimeString('tr-TR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      ))}
    </div>
  );
}