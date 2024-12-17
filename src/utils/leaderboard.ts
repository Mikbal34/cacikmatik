import { Profile, CacikSession } from '../types';

export interface LeaderboardEntry extends Profile {
  score: number;
  sessions: CacikSession[];
}

export function getLeaderboardData(period: 'daily' | 'weekly' | 'all-time'): LeaderboardEntry[] {
  // Get current profile and sessions from localStorage
  const currentProfile = localStorage.getItem('cacikmatik_profile');
  const storedSessions = localStorage.getItem('cacikmatik_sessions');
  
  if (!currentProfile || !storedSessions) return [];

  const profile: Profile = JSON.parse(currentProfile);
  const sessions: CacikSession[] = JSON.parse(storedSessions);

  // Filter sessions based on period
  const now = new Date();
  const filteredSessions = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    switch (period) {
      case 'daily':
        return sessionDate.toDateString() === now.toDateString();
      case 'weekly':
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return sessionDate >= weekAgo;
      default:
        return true;
    }
  });

  // Calculate stats for the profile
  const userSessions = filteredSessions.filter(s => s.profileId === profile.id);
  const totalCaciks = userSessions.length;
  const averageTime = totalCaciks > 0
    ? userSessions.reduce((sum, s) => sum + s.duration, 0) / totalCaciks
    : 0;

  // Create leaderboard entry
  const entry: LeaderboardEntry = {
    ...profile,
    totalCaciks,
    averageTime,
    score: totalCaciks * 1000 + (averageTime / 60),
    sessions: userSessions
  };

  return totalCaciks > 0 ? [entry] : [];
}