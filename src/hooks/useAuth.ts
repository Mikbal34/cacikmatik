import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Profile } from '../types';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfile = localStorage.getItem('cacikmatik_profile');
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(parsedProfile);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Profile loading error:', error);
        localStorage.removeItem('cacikmatik_profile');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((username: string, city: string, district?: string) => {
    const newProfile: Profile = {
      id: uuidv4(),
      username,
      city,
      district,
      totalCaciks: 0,
      averageTime: 0,
      bestTime: 0,
      lastCacikDate: new Date()
    };
    
    localStorage.setItem('cacikmatik_profile', JSON.stringify(newProfile));
    setProfile(newProfile);
    setIsAuthenticated(true);
    navigate('/', { replace: true });
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('cacikmatik_profile');
    localStorage.removeItem('cacikmatik_sessions');
    localStorage.removeItem('cacikmatik_active_sessions');
    localStorage.removeItem('earned_badges');
    setProfile(null);
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  }, [navigate]);

  return {
    isAuthenticated,
    isLoading,
    profile,
    login,
    logout
  };
}