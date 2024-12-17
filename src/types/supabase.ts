export interface Profile {
  id: string;
  username: string;
  city: string;
  district?: string;
  total_caciks: number;
  average_time: number;
  best_time: number;
  last_cacik_date?: string;
  created_at: string;
  updated_at: string;
}

export interface CacikSession {
  id: string;
  profile_id: string;
  duration: number;
  date: string;
}

export interface Friendship {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface ActiveSession {
  id: string;
  profile_id: string;
  start_time: string;
  last_update: string;
}

export interface EarnedBadge {
  id: string;
  profile_id: string;
  badge_id: string;
  earned_date: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
      };
      cacik_sessions: {
        Row: CacikSession;
        Insert: Omit<CacikSession, 'id'>;
        Update: Partial<Omit<CacikSession, 'id'>>;
      };
      friendships: {
        Row: Friendship;
        Insert: Omit<Friendship, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Friendship, 'id' | 'created_at' | 'updated_at'>>;
      };
      active_sessions: {
        Row: ActiveSession;
        Insert: Omit<ActiveSession, 'id'>;
        Update: Partial<Omit<ActiveSession, 'id'>>;
      };
      earned_badges: {
        Row: EarnedBadge;
        Insert: Omit<EarnedBadge, 'id'>;
        Update: Partial<Omit<EarnedBadge, 'id'>>;
      };
    };
  };
}