import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ActiveSession } from '../types/supabase';

const TIMEOUT_DURATION = 5 * 60 * 1000; // 5 dakika

export function useOnlineStatus(profileIds: string[]) {
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!profileIds.length) return;

    // İlk yükleme
    fetchOnlineStatus();

    // Realtime subscription
    const subscription = supabase
      .channel('online-status')
      .on<ActiveSession>(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'active_sessions',
          filter: `profile_id=in.(${profileIds.join(',')})`
        },
        () => {
          fetchOnlineStatus();
        }
      )
      .subscribe();

    // 10 saniyede bir güncelle
    const interval = setInterval(fetchOnlineStatus, 10000);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  }, [profileIds.join(',')]);

  async function fetchOnlineStatus() {
    try {
      const { data: activeSessions } = await supabase
        .from('active_sessions')
        .select('profile_id, last_update')
        .in('profile_id', profileIds);

      const now = Date.now();
      const online = new Set<string>();

      activeSessions?.forEach(session => {
        const lastUpdate = new Date(session.last_update).getTime();
        if (now - lastUpdate < TIMEOUT_DURATION) {
          online.add(session.profile_id);
        }
      });

      setOnlineUsers(online);
    } catch (error) {
      console.error('Error fetching online status:', error);
    }
  }

  return onlineUsers;
}