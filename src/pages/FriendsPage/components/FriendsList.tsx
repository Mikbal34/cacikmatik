import React from 'react';
import { Users } from 'lucide-react';
import { Profile, CacikSession, EarnedBadge } from '../../../types/supabase';
import { getBadges } from '../../../utils/badges';
import { useOnlineStatus } from '../../../hooks/useOnlineStatus';
import FriendCard from './FriendCard';

interface FriendProfile extends Profile {
  sessions?: CacikSession[];
  earnedBadges?: EarnedBadge[];
}

interface FriendsListProps {
  friends: FriendProfile[];
}

export default function FriendsList({ friends }: FriendsListProps) {
  const onlineUsers = useOnlineStatus(friends.map(f => f.id));

  if (friends.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
        <p>Henüz arkadaşınız yok</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {friends.map(friend => {
        const badges = getBadges(friend.sessions || []);
        const badgesByType = {
          weekly: badges.filter(b => b.type === 'weekly' && b.earned),
          special: badges.filter(b => b.type === 'special' && b.earned),
          regular: badges.filter(b => b.type === 'regular' && b.earned)
        };

        // Filter earned badges
        if (friend.earnedBadges?.length) {
          const earnedBadgeIds = new Set(friend.earnedBadges.map(b => b.badge_id));
          Object.keys(badgesByType).forEach(type => {
            badgesByType[type as keyof typeof badgesByType] = 
              badgesByType[type as keyof typeof badgesByType].filter(b => earnedBadgeIds.has(b.id));
          });
        }

        return (
          <FriendCard
            key={friend.id}
            friend={friend}
            badges={badgesByType}
            isOnline={onlineUsers.has(friend.id)}
          />
        );
      })}
    </div>
  );
}