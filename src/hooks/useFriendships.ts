import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Profile, Friendship } from '../types/supabase';

interface FriendProfile extends Profile {
  friendship?: Friendship;
}

export function useFriendships() {
  const { user } = useAuth();
  const [friends, setFriends] = useState<FriendProfile[]>([]);
  const [pendingRequests, setPendingRequests] = useState<FriendProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch friends and requests
  const fetchFriendships = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('friendships')
        .select(`
          *,
          requester:profiles!friendships_requester_id_fkey(*),
          addressee:profiles!friendships_addressee_id_fkey(*)
        `)
        .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`);

      if (error) throw error;

      const acceptedFriends: FriendProfile[] = [];
      const pending: FriendProfile[] = [];

      data?.forEach((friendship) => {
        const isSender = friendship.requester_id === user.id;
        const profile = isSender ? friendship.addressee : friendship.requester;
        const friendProfile: FriendProfile = { ...profile, friendship };

        if (friendship.status === 'accepted') {
          acceptedFriends.push(friendProfile);
        } else if (friendship.status === 'pending' && !isSender) {
          pending.push(friendProfile);
        }
      });

      setFriends(acceptedFriends);
      setPendingRequests(pending);
    } catch (error) {
      console.error('Error fetching friendships:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFriendships();
  }, [fetchFriendships]);

  return {
    friends,
    pendingRequests,
    isLoading,
    fetchFriendships
  };
}