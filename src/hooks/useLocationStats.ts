import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Profile, ActiveSession } from '../types/supabase';

export interface LocationStats {
  activeCaciks: number;
  totalCaciks: number;
  averageDuration: number;
  activeUsers: Array<{
    username: string;
    startTime: string;
  }>;
}

export function useLocationStats() {
  const [cityStats, setCityStats] = useState<Record<string, LocationStats>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();

    // Realtime subscriptions
    const subscription = supabase
      .channel('location-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'active_sessions'
        },
        () => fetchStats()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        () => fetchStats()
      )
      .subscribe();

    // Polling for active sessions
    const interval = setInterval(fetchStats, 10000);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  async function fetchStats() {
    try {
      // Fetch profiles with their total stats
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      // Fetch active sessions with profile info
      const { data: activeSessions, error: sessionsError } = await supabase
        .from('active_sessions')
        .select(`
          *,
          profile:profiles (
            id,
            username,
            city,
            district
          )
        `);

      if (sessionsError) throw sessionsError;

      // Calculate stats by city
      const stats: Record<string, LocationStats> = {};

      // Process profiles for total stats
      profiles.forEach((profile: Profile) => {
        if (!stats[profile.city]) {
          stats[profile.city] = {
            activeCaciks: 0,
            totalCaciks: profile.total_caciks,
            averageDuration: profile.average_time,
            activeUsers: []
          };
        } else {
          stats[profile.city].totalCaciks += profile.total_caciks;
          stats[profile.city].averageDuration = Math.round(
            (stats[profile.city].averageDuration + profile.average_time) / 2
          );
        }
      });

      // Process active sessions
      const now = Date.now();
      const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes

      activeSessions.forEach((session: ActiveSession & { profile: Profile }) => {
        const lastUpdate = new Date(session.last_update).getTime();
        if (now - lastUpdate < SESSION_TIMEOUT) {
          const city = session.profile.city;
          if (stats[city]) {
            stats[city].activeCaciks++;
            stats[city].activeUsers.push({
              username: session.profile.username,
              startTime: session.start_time
            });
          }
        }
      });

      setCityStats(stats);
    } catch (error) {
      console.error('Error fetching location stats:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return { cityStats, isLoading };
}