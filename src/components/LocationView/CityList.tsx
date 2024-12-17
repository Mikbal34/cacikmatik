import React from 'react';
import { MapPin, Clock, Award } from 'lucide-react';
import { cities } from '../../data/cities';
import { regions } from './regions';
import { CityStats } from '../../types';

interface CityListProps {
  selectedRegion: string;
  selectedCity: string;
  onCitySelect: (city: string) => void;
  cityStats: Record<string, CityStats>;
}

export default function CityList({ selectedRegion, selectedCity, onCitySelect, cityStats }: CityListProps) {
  const regionCities = regions.find(r => r.id === selectedRegion)?.cities || [];
  const filteredCities = cities.filter(city => regionCities.includes(city.name));

  return (
    <div className="grid grid-cols-1 gap-4">
      {filteredCities.map((city) => {
        const stats = cityStats[city.name] || { activeCaciks: 0, totalCaciks: 0, averageDuration: 0 };
        const isActive = stats.activeCaciks > 0;
        
        return (
          <button
            key={city.id}
            onClick={() => onCitySelect(city.name)}
            className={`p-4 rounded-xl transition-all duration-300 text-left ${
              selectedCity === city.name
                ? 'bg-green-500 text-white'
                : isActive
                ? 'bg-green-50 hover:bg-green-100'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {city.name}
                </div>
                <div className="text-sm mt-1 opacity-80">
                  {stats.totalCaciks} toplam cacık
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                {isActive && (
                  <span className="text-sm font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {stats.activeCaciks} aktif
                  </span>
                )}
                {stats.totalCaciks > 0 && (
                  <span className="text-sm flex items-center gap-1 mt-1">
                    <Award className="w-3 h-3" />
                    {Math.round(stats.averageDuration / 60)}dk ort.
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}