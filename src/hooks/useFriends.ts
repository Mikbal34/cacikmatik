import { useState, useEffect, useCallback } from 'react';
import { FriendStats, FriendRequest } from '../types';
import { useAuth } from './useAuth';
import { useActiveSessions } from './useActiveSessions';
import { sampleFriends, sampleRequests } from '../utils/sampleData';

export function useFriends() {
  const { profile } = useAuth();
  const { activeSessions } = useActiveSessions();
  const [friendStats, setFriendStats] = useState<FriendStats[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    // Örnek verileri yükle
    setFriendStats(sampleFriends);
    setFriendRequests(sampleRequests);

    // Her 10 saniyede bir çevrimiçi durumunu güncelle
    const interval = setInterval(() => {
      setFriendStats(prev => prev.map(friend => ({
        ...friend,
        isOnline: Math.random() > 0.3 // Rastgele çevrimiçi durumu
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const sendFriendRequest = useCallback((username: string) => {
    // Simüle edilmiş arkadaşlık isteği gönderme
    console.log(`Arkadaşlık isteği gönderildi: ${username}`);
    // Gerçek uygulamada burada API çağrısı yapılacak
  }, []);

  const acceptFriendRequest = useCallback((friendId: string) => {
    setFriendRequests(prev => prev.filter(req => req.id !== friendId));
    const acceptedFriend = sampleRequests.find(req => req.id === friendId);
    if (acceptedFriend) {
      setFriendStats(prev => [...prev, {
        ...acceptedFriend,
        isOnline: true,
        lastActive: new Date(),
        totalCaciks: Math.floor(Math.random() * 100),
        averageTime: 300 + Math.floor(Math.random() * 300)
      }]);
    }
  }, []);

  const rejectFriendRequest = useCallback((friendId: string) => {
    setFriendRequests(prev => prev.filter(req => req.id !== friendId));
  }, []);

  return {
    friendStats,
    friendRequests,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest
  };
}