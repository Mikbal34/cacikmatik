import React, { useState } from 'react';
import { Users, Bell, UserPlus } from 'lucide-react';
import { useFriendships } from '../../hooks/useFriendships';
import BottomNavigation from '../../components/BottomNavigation';
import AddFriend from './components/AddFriend';
import FriendRequests from './components/FriendRequests';
import FriendsList from './components/FriendsList';

type View = 'friends' | 'requests' | 'add';

export default function FriendsPage() {
  const { friends, pendingRequests, sendFriendRequest, acceptRequest, rejectRequest, isLoading } = useFriendships();
  const [currentView, setCurrentView] = useState<View>('friends');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pb-16">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-green-600 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Arkadaşlarım
          </h2>
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
          <FriendsList friends={friends} />
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
}