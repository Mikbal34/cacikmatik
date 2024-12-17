import { useState, useEffect, useCallback } from 'react';
import { Profile, CacikSession } from '../types';
import { getBadges, Badge } from '../utils/badges';

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [sessions, setSessions] = useState<CacikSession[]>([]);
  const [newBadge, setNewBadge] = useState<Badge | null>(null);
  const [earnedBadges, setEarnedBadges] = useState<Set<string>>(new Set());

  // Profil ve oturum verilerini yükle
  useEffect(() => {
    const loadData = () => {
      try {
        const storedProfile = localStorage.getItem('cacikmatik_profile');
        const storedSessions = localStorage.getItem('cacikmatik_sessions');
        const storedBadges = localStorage.getItem('earned_badges');
        
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }
        
        if (storedSessions) {
          setSessions(JSON.parse(storedSessions));
        }

        if (storedBadges) {
          setEarnedBadges(new Set(JSON.parse(storedBadges)));
        }
      } catch (error) {
        console.error('Veri yükleme hatası:', error);
      }
    };

    loadData();
  }, []);

  const checkNewBadges = useCallback((currentSessions: CacikSession[]) => {
    const currentBadges = getBadges(currentSessions);
    const newEarnedBadges = currentBadges.filter(badge => 
      badge.earned && !earnedBadges.has(badge.id)
    );

    if (newEarnedBadges.length > 0) {
      // En son kazanılan rozeti göster
      const latestBadge = {
        ...newEarnedBadges[newEarnedBadges.length - 1],
        earnedDate: new Date()
      };

      // Yeni rozetleri kaydet
      const updatedEarnedBadges = new Set(earnedBadges);
      newEarnedBadges.forEach(badge => updatedEarnedBadges.add(badge.id));
      setEarnedBadges(updatedEarnedBadges);
      localStorage.setItem('earned_badges', JSON.stringify([...updatedEarnedBadges]));

      // Rozet bildirimini göster
      setNewBadge(latestBadge);
    }
  }, [earnedBadges]);

  const updateProfile = useCallback((newSession: CacikSession) => {
    if (!profile) return;

    const updatedSessions = [...sessions, newSession];
    localStorage.setItem('cacikmatik_sessions', JSON.stringify(updatedSessions));
    
    const totalTime = updatedSessions.reduce((sum, s) => sum + s.duration, 0);
    const averageTime = Math.round(totalTime / updatedSessions.length);
    const bestTime = Math.max(...updatedSessions.map(s => s.duration));

    const updatedProfile: Profile = {
      ...profile,
      totalCaciks: updatedSessions.length,
      averageTime,
      bestTime,
      lastCacikDate: new Date()
    };

    setProfile(updatedProfile);
    localStorage.setItem('cacikmatik_profile', JSON.stringify(updatedProfile));
    setSessions(updatedSessions);
    
    // Rozet kontrolünü hemen yap
    checkNewBadges(updatedSessions);
  }, [profile, sessions, checkNewBadges]);

  const clearNewBadge = useCallback(() => {
    setNewBadge(null);
  }, []);

  return {
    profile,
    sessions,
    updateProfile,
    newBadge,
    clearNewBadge,
    earnedBadges: [...earnedBadges]
  };
}