import React from 'react';
import { cities } from '../../data/cities';
import { TurkeyMapProps } from './types';
import Legend from './Legend';
import CityInfo from './CityInfo';
import CityMarker from './CityMarker';

export default function TurkeyMap({ selectedCity, onCitySelect, cityStats }: TurkeyMapProps) {
  return (
    <div className="relative w-full aspect-[16/9] bg-white rounded-xl shadow-md p-4 mb-4">
      <div className="relative w-full h-full">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full"
          style={{ backgroundColor: '#f3f4f6' }}
        >
          {cities.map((city) => (
            <CityMarker
              key={city.id}
              cityId={city.id}
              cityName={city.name}
              onClick={() => onCitySelect(city.name)}
              cityStats={cityStats}
            />
          ))}
        </svg>
      </div>

      <Legend />
      
      {selectedCity && cityStats[selectedCity] && (
        <CityInfo city={selectedCity} stats={cityStats[selectedCity]} />
      )}
    </div>
  );
}