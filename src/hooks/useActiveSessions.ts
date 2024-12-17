import { useState, useEffect, useCallback } from 'react';
import { ActiveSession, ActiveSessionsState } from '../types';

const ACTIVE_SESSIONS_KEY = 'cacikmatik_active_sessions';
const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 dakika

export function useActiveSessions() {
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([]);

  const loadSessions = useCallback(() => {
    const stored = localStorage.getItem(ACTIVE_SESSIONS_KEY);
    if (stored) {
      try {
        const state: ActiveSessionsState = JSON.parse(stored);
        const now = new Date();
        
        const validSessions = state.sessions.filter(session => {
          const lastUpdate = new Date(session.lastUpdate);
          return now.getTime() - lastUpdate.getTime() < SESSION_TIMEOUT;
        });

        setActiveSessions(validSessions);
        
        if (validSessions.length !== state.sessions.length) {
          const newState: ActiveSessionsState = {
            sessions: validSessions,
            lastUpdate: now
          };
          localStorage.setItem(ACTIVE_SESSIONS_KEY, JSON.stringify(newState));
        }
      } catch (error) {
        console.error('Session loading error:', error);
        setActiveSessions([]);
        localStorage.removeItem(ACTIVE_SESSIONS_KEY);
      }
    }
  }, []);

  useEffect(() => {
    loadSessions();
    const interval = setInterval(loadSessions, 10000);
    return () => clearInterval(interval);
  }, [loadSessions]);

  const addActiveSession = useCallback((session: Omit<ActiveSession, 'startTime' | 'lastUpdate'>) => {
    const now = new Date();
    const newSession: ActiveSession = {
      ...session,
      startTime: now,
      lastUpdate: now
    };

    setActiveSessions(prev => {
      const filtered = prev.filter(s => s.profileId !== session.profileId);
      const updated = [...filtered, newSession];
      const state: ActiveSessionsState = {
        sessions: updated,
        lastUpdate: now
      };
      localStorage.setItem(ACTIVE_SESSIONS_KEY, JSON.stringify(state));
      return updated;
    });
  }, []);

  const removeActiveSession = useCallback((profileId: string) => {
    setActiveSessions(prev => {
      const updated = prev.filter(s => s.profileId !== profileId);
      const state: ActiveSessionsState = {
        sessions: updated,
        lastUpdate: new Date()
      };
      localStorage.setItem(ACTIVE_SESSIONS_KEY, JSON.stringify(state));
      return updated;
    });
  }, []);

  const updateSessionTime = useCallback((profileId: string) => {
    const now = new Date();
    setActiveSessions(prev => {
      const updated = prev.map(session =>
        session.profileId === profileId
          ? { ...session, lastUpdate: now }
          : session
      );
      const state: ActiveSessionsState = {
        sessions: updated,
        lastUpdate: now
      };
      localStorage.setItem(ACTIVE_SESSIONS_KEY, JSON.stringify(state));
      return updated;
    });
  }, []);

  return {
    activeSessions,
    addActiveSession,
    removeActiveSession,
    updateSessionTime
  };
}