import React from 'react';
import { Users, Clock, Award } from 'lucide-react';
import { CityDetailProps } from '../types';
import CityHeader from './CityHeader';
import CityStatsCard from './CityStatsCard';

export default function CityDetail({ cityName, onBack, cityStats, activeSessions }: CityDetailProps) {
  const stats = cityStats[cityName] || { activeCaciks: 0, totalCaciks: 0, averageDuration: 0 };
  const citySessions = activeSessions.filter(session => session.city === cityName);

  return (
    <div className="space-y-4">
      <CityHeader cityName={cityName} onBack={onBack} />

      <div className="grid grid-cols-3 gap-4">
        <CityStatsCard
          label="Aktif Cacıkçı"
          value={stats.activeCaciks}
          icon={<Users className="w-4 h-4" />}
        />
        <CityStatsCard
          label="Toplam Cacık"
          value={stats.totalCaciks}
          icon={<Award className="w-4 h-4" />}
        />
        <CityStatsCard
          label="Ort. Süre"
          value={`${Math.round(stats.averageDuration / 60)}dk`}
          icon={<Clock className="w-4 h-4" />}
        />
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-700">Aktif Cacıkçılar</h4>
        <div className="grid grid-cols-1 gap-3">
          {citySessions.length > 0 ? (
            citySessions.map((session, index) => (
              <div key={index} className="bg-white p-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="font-medium">{session.username}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(session.startTime).toLocaleTimeString('tr-TR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-4 rounded-xl text-center text-gray-500">
              Şu an aktif cacık yapan yok
            </div>
          )}
        </div>
      </div>
    </div>
  );
}