import React from 'react';
import { MapPin } from 'lucide-react';
import { CityStats } from '../../types';

interface CityInfoProps {
  city: string;
  stats: CityStats;
}

export default function CityInfo({ city, stats }: CityInfoProps) {
  return (
    <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4">
      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-green-600" />
        {city} İstatistikleri
      </h3>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-gray-600">Aktif Cacıkçı</div>
          <div className="font-semibold text-green-600">
            {stats.activeCaciks}
          </div>
        </div>
        <div>
          <div className="text-gray-600">Toplam Cacık</div>
          <div className="font-semibold text-green-600">
            {stats.totalCaciks}
          </div>
        </div>
        <div>
          <div className="text-gray-600">Ort. Süre</div>
          <div className="font-semibold text-green-600">
            {Math.round(stats.averageDuration / 60)}dk
          </div>
        </div>
      </div>
    </div>
  );
}