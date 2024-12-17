import { useState, useEffect } from 'react';
import { useActiveSessions } from './useActiveSessions';
import { CityStats } from '../types';

export function useCityStats() {
  const { activeSessions } = useActiveSessions();
  const [cityStats, setCityStats] = useState<Record<string, CityStats>>({});

  useEffect(() => {
    // Load sessions from localStorage
    const storedSessions = localStorage.getItem('cacikmatik_sessions');
    const sessions = storedSessions ? JSON.parse(storedSessions) : [];
    
    // Create stats object
    const stats: Record<string, CityStats> = {};

    // Process historical sessions
    sessions.forEach((session: any) => {
      const profile = JSON.parse(localStorage.getItem('cacikmatik_profile') || '{}');
      if (profile && profile.city) {
        if (!stats[profile.city]) {
          stats[profile.city] = {
            activeCaciks: 0,
            totalCaciks: 0,
            averageDuration: 0
          };
        }
        
        const cityStats = stats[profile.city];
        cityStats.totalCaciks++;
        cityStats.averageDuration = (
          (cityStats.averageDuration * (cityStats.totalCaciks - 1) + session.duration) / 
          cityStats.totalCaciks
        );
      }
    });

    // Add active sessions
    activeSessions.forEach(session => {
      if (!stats[session.city]) {
        stats[session.city] = {
          activeCaciks: 0,
          totalCaciks: 0,
          averageDuration: 0
        };
      }
      stats[session.city].activeCaciks++;
    });

    setCityStats(stats);
  }, [activeSessions]);

  return cityStats;
}