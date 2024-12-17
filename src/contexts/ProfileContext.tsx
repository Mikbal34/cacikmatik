import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { CacikSession, ActiveSession } from '../types/supabase';
import { Badge, getBadges } from '../utils/badges';

interface ProfileContextType {
  sessions: CacikSession[];
  activeSessions: ActiveSession[];
  newBadge: Badge | null;
  earnedBadges: string[];
  isLoading: boolean;
  updateProfile: (newSession: Omit<CacikSession, 'id'>) => Promise<void>;
  clearNewBadge: () => void;
  addActiveSession: () => Promise<void>;
  removeActiveSession: () => Promise<void>;
  updateSessionTime: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user, profile } = useAuth();
  const [sessions, setSessions] = useState<CacikSession[]>([]);
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([]);
  const [newBadge, setNewBadge] = useState<Badge | null>(null);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    if (user) {
      Promise.all([
        fetchSessions(),
        fetchActiveSessions(),
        fetchEarnedBadges()
      ]).finally(() => setIsLoading(false));
    }
  }, [user]);

  // Active sessions polling
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(fetchActiveSessions, 10000);
    return () => clearInterval(interval);
  }, [user]);

  async function fetchSessions() {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('cacik_sessions')
        .select('*')
        .eq('profile_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  }

  async function fetchActiveSessions() {
    try {
      const { data, error } = await supabase
        .from('active_sessions')
        .select('*')
        .gt('last_update', new Date(Date.now() - 5 * 60 * 1000).toISOString());

      if (error) throw error;
      setActiveSessions(data || []);
    } catch (error) {
      console.error('Error fetching active sessions:', error);
    }
  }

  async function fetchEarnedBadges() {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('earned_badges')
        .select('badge_id')
        .eq('profile_id', user.id);

      if (error) throw error;
      setEarnedBadges(data.map(row => row.badge_id));
    } catch (error) {
      console.error('Error fetching earned badges:', error);
    }
  }

  async function checkNewBadges() {
    if (!user) return;

    const currentBadges = getBadges(sessions);
    const newEarnedBadges = currentBadges.filter(badge => 
      badge.earned && !earnedBadges.includes(badge.id)
    );

    if (newEarnedBadges.length > 0) {
      const latestBadge = newEarnedBadges[newEarnedBadges.length - 1];
      
      try {
        const { error } = await supabase
          .from('earned_badges')
          .insert(newEarnedBadges.map(badge => ({
            profile_id: user.id,
            badge_id: badge.id,
            earned_date: new Date().toISOString()
          })));

        if (error) throw error;

        setNewBadge(latestBadge);
        setEarnedBadges(prev => [...prev, ...newEarnedBadges.map(b => b.id)]);
      } catch (error) {
        console.error('Error saving earned badges:', error);
      }
    }
  }

  async function updateProfile(newSession: Omit<CacikSession, 'id'>) {
    if (!user || !profile) return;

    try {
      // Add new session
      const { error: sessionError } = await supabase
        .from('cacik_sessions')
        .insert([newSession]);

      if (sessionError) throw sessionError;

      // Update profile stats
      const updatedSessions = [...sessions, newSession as CacikSession];
      const totalTime = updatedSessions.reduce((sum, s) => sum + s.duration, 0);
      const averageTime = Math.round(totalTime / updatedSessions.length);
      const bestTime = Math.max(...updatedSessions.map(s => s.duration));

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          total_caciks: updatedSessions.length,
          average_time: averageTime,
          best_time: bestTime,
          last_cacik_date: new Date().toISOString()
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Refresh data
      await Promise.all([
        fetchSessions(),
        checkNewBadges()
      ]);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  async function addActiveSession() {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('active_sessions')
        .insert([{
          profile_id: user.id,
          start_time: new Date().toISOString(),
          last_update: new Date().toISOString()
        }]);

      if (error) throw error;
      await fetchActiveSessions();
    } catch (error) {
      console.error('Error adding active session:', error);
    }
  }

  async function removeActiveSession() {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('active_sessions')
        .delete()
        .eq('profile_id', user.id);

      if (error) throw error;
      await fetchActiveSessions();
    } catch (error) {
      console.error('Error removing active session:', error);
    }
  }

  async function updateSessionTime() {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('active_sessions')
        .update({ last_update: new Date().toISOString() })
        .eq('profile_id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating session time:', error);
    }
  }

  const clearNewBadge = () => setNewBadge(null);

  const value = {
    sessions,
    activeSessions,
    newBadge,
    earnedBadges,
    isLoading,
    updateProfile,
    clearNewBadge,
    addActiveSession,
    removeActiveSession,
    updateSessionTime
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}