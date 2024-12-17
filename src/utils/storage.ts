import { Profile, CacikSession } from '../types';

const PROFILE_KEY = 'cacikmatik_profile';
const SESSIONS_KEY = 'cacikmatik_sessions';

export function loadProfile(): Profile | null {
  const stored = localStorage.getItem(PROFILE_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function saveProfile(profile: Profile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function addCacikSession(session: CacikSession): void {
  const stored = localStorage.getItem(SESSIONS_KEY);
  const sessions = stored ? JSON.parse(stored) : [];
  sessions.push(session);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function loadSessions(): CacikSession[] {
  const stored = localStorage.getItem(SESSIONS_KEY);
  return stored ? JSON.parse(stored) : [];
}