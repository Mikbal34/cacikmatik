export interface Profile {
  id: string;
  username: string;
  city: string;
  district?: string;
  totalCaciks: number;
  averageTime: number;
  bestTime: number;
  lastCacikDate: Date;
}

export interface CacikSession {
  id: string;
  profileId: string;
  duration: number;
  date: Date;
}

export interface ActiveSession {
  profileId: string;
  username: string;
  city: string;
  district?: string;
  startTime: Date;
  lastUpdate: Date;
}

export interface ActiveSessionsState {
  sessions: ActiveSession[];
  lastUpdate: Date;
}

export interface CityStats {
  activeCaciks: number;
  averageDuration: number;
  totalCaciks: number;
}

export interface FriendStats {
  id: string;
  username: string;
  city: string;
  district?: string;
  isOnline: boolean;
  lastActive: Date;
  totalCaciks: number;
  averageTime: number;
  bestTime?: number;
  sessions: CacikSession[]; // Sessions eklendi
}

export interface FriendRequest {
  id: string;
  username: string;
  city: string;
  district?: string;
}