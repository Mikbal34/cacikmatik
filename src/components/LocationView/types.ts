import { CityStats } from '../../types';

export interface RegionGridProps {
  selectedRegion: string;
  onRegionSelect: (region: string) => void;
  cityStats: Record<string, CityStats>;
}

export interface CityListProps {
  selectedRegion: string;
  selectedCity: string;
  onCitySelect: (city: string) => void;
  cityStats: Record<string, CityStats>;
}

export interface CityDetailProps {
  cityName: string;
  onBack: () => void;
  cityStats: Record<string, CityStats>;
  activeSessions: Array<{
    username: string;
    startTime: Date;
  }>;
}

export interface CityStatsCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
}