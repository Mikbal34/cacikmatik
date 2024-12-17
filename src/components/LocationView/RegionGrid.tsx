import React from 'react';
import { MapPin } from 'lucide-react';
import { regions } from './regions';
import { CityStats } from '../../types';

interface RegionGridProps {
  selectedRegion: string;
  onRegionSelect: (region: string) => void;
  cityStats: Record<string, CityStats>;
}

export default function RegionGrid({ selectedRegion, onRegionSelect, cityStats }: RegionGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {regions.map((region) => (
        <button
          key={region.id}
          onClick={() => onRegionSelect(region.id)}
          className={`p-4 rounded-xl transition-all duration-300 ${
            selectedRegion === region.id
              ? 'bg-green-500 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 hover:bg-green-50'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="font-semibold">{region.name}</span>
          </div>
          <div className="text-sm opacity-80">
            {region.cities.reduce((sum, city) => 
              sum + (cityStats[city]?.activeCaciks || 0), 0
            )} aktif cacıkçı
          </div>
        </button>
      ))}
    </div>
  );
}