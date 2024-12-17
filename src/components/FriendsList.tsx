import React, { useState } from 'react';
import { Users, Bell, UserPlus } from 'lucide-react';
import { useFriendships } from '../hooks/useFriendships';
import AddFriend from './FriendsList/AddFriend';
import FriendRequests from './FriendsList/FriendRequests';
import FriendGrid from './FriendsList/FriendGrid';

type View = 'friends' | 'requests' | 'add';

export default function FriendsList() {
  const { friends, pendingRequests, sendFriendRequest, acceptRequest, rejectRequest, isLoading } = useFriendships();
  const [currentView, setCurrentView] = useState<View>('friends');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Navigation Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentView('friends')}
            className={`p-2 rounded-lg transition-colors ${
              currentView === 'friends' ? 'bg-green-500 text-white' : 'bg-white text-gray-600'
            }`}
          >
            <Users className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentView('requests')}
            className={`p-2 rounded-lg transition-colors relative ${
              currentView === 'requests' ? 'bg-green-500 text-white' : 'bg-white text-gray-600'
            }`}
          >
            <Bell className="w-5 h-5" />
            {pendingRequests.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                {pendingRequests.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setCurrentView('add')}
            className={`p-2 rounded-lg transition-colors ${
              currentView === 'add' ? 'bg-green-500 text-white' : 'bg-white text-gray-600'
            }`}
          >
            <UserPlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      {currentView === 'add' && (
        <AddFriend onSendRequest={sendFriendRequest} />
      )}

      {currentView === 'requests' && (
        <FriendRequests
          requests={pendingRequests}
          onAccept={acceptRequest}
          onReject={rejectRequest}
        />
      )}

      {currentView === 'friends' && (
        <FriendGrid friends={friends} />
      )}
    </div>
  );
}