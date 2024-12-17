export interface CityPosition {
  x: number;
  y: number;
}

export interface CityPositions {
  [key: number]: CityPosition;
}

export interface TurkeyMapProps {
  selectedCity: string;
  onCitySelect: (city: string) => void;
  cityStats: Record<string, CityStats>;
}

export interface CityStats {
  activeCaciks: number;
  averageDuration: number;
  totalCaciks: number;
}