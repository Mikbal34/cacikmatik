import React from 'react';
import { Users, Award, Clock } from 'lucide-react';
import { LocationStats } from '../../../hooks/useLocationStats';
import { formatTime } from '../../../utils/formatTime';

interface CityStatsProps {
  stats: LocationStats;
}

export default function CityStats({ stats }: CityStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col items-center">
          <Users className="w-6 h-6 text-blue-500 mb-2" />
          <span className="text-xl font-bold text-gray-800">{stats.activeCaciks}</span>
          <span className="text-sm text-gray-600">Aktif Cacıkçı</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col items-center">
          <Award className="w-6 h-6 text-yellow-500 mb-2" />
          <span className="text-xl font-bold text-gray-800">{stats.totalCaciks}</span>
          <span className="text-sm text-gray-600">Toplam Cacık</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col items-center">
          <Clock className="w-6 h-6 text-green-500 mb-2" />
          <span className="text-xl font-bold text-gray-800">
            {formatTime(stats.averageDuration)}
          </span>
          <span className="text-sm text-gray-600">Ort. Süre</span>
        </div>
      </div>
    </div>
  );
}