import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Profile, CacikSession } from '../types/supabase';
import { getBadges } from '../utils/badges';

export type Period = 'daily' | 'weekly' | 'all-time';

interface LeaderboardEntry extends Profile {
  sessions: CacikSession[];
  score: number;
}

export function useLeaderboard(period: Period) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();

    // Realtime subscription for profile updates
    const subscription = supabase
      .channel('leaderboard-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        () => {
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [period]);

  async function fetchLeaderboard() {
    try {
      // Get date range based on period
      const now = new Date();
      let startDate = new Date();
      
      switch (period) {
        case 'daily':
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'weekly':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'all-time':
          startDate = new Date(0); // Beginning of time
          break;
      }

      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('total_caciks', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch sessions for the period
      const { data: sessions, error: sessionsError } = await supabase
        .from('cacik_sessions')
        .select('*')
        .gte('date', startDate.toISOString());

      if (sessionsError) throw sessionsError;

      // Group sessions by profile
      const sessionsByProfile = sessions.reduce((acc, session) => {
        if (!acc[session.profile_id]) {
          acc[session.profile_id] = [];
        }
        acc[session.profile_id].push(session);
        return acc;
      }, {} as Record<string, CacikSession[]>);

      // Calculate scores and create entries
      const leaderboardEntries = profiles.map(profile => {
        const profileSessions = sessionsByProfile[profile.id] || [];
        const totalTime = profileSessions.reduce((sum, s) => sum + s.duration, 0);
        const score = profileSessions.length * 1000 + (totalTime / profileSessions.length || 0);

        return {
          ...profile,
          sessions: profileSessions,
          score
        };
      });

      // Sort by score and filter out users with no sessions in the period
      setEntries(
        leaderboardEntries
          .filter(entry => entry.sessions.length > 0)
          .sort((a, b) => b.score - a.score)
      );
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return { entries, isLoading };
}