import { useMemo } from 'react';
import { cities } from '../../../data/cities';
import { regions } from '../constants/regions';

export function useRegionCities(selectedRegion: string) {
  return useMemo(() => {
    const regionCities = regions.find(r => r.id === selectedRegion)?.cities || [];
    return cities.filter(city => regionCities.includes(city.name));
  }, [selectedRegion]);
}