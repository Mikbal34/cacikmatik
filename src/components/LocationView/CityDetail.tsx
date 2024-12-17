import React from 'react';
import { ChevronLeft, MapPin, Users, Clock, Award } from 'lucide-react';
import { cities } from '../../data/cities';
import { CityStats } from '../../types';

interface CityDetailProps {
  cityName: string;
  onBack: () => void;
  cityStats: Record<string, CityStats>;
  activeSessions: Array<{
    username: string;
    district: string;
    startTime: Date;
  }>;
}

export default function CityDetail({ cityName, onBack, cityStats, activeSessions }: CityDetailProps) {
  const city = cities.find(c => c.name === cityName);
  const stats = cityStats[cityName] || { activeCaciks: 0, totalCaciks: 0, averageDuration: 0 };

  if (!city) return null;

  // İlçelere göre aktif kullanıcıları grupla
  const districtSessions = city.districts.reduce((acc, district) => {
    acc[district] = activeSessions.filter(session => session.district === district);
    return acc;
  }, {} as Record<string, typeof activeSessions>);

  return (
    <div className="space-y-4">
      {/* Üst Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Geri</span>
        </button>
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-600" />
          {cityName}
        </h3>
        <div className="w-20"></div> {/* Dengeleme için boş alan */}
      </div>

      {/* Şehir İstatistikleri */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl">
          <div className="text-sm text-gray-600">Aktif Cacıkçı</div>
          <div className="text-xl font-bold text-green-600 mt-1 flex items-center gap-1">
            <Users className="w-4 h-4" />
            {stats.activeCaciks}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl">
          <div className="text-sm text-gray-600">Toplam Cacık</div>
          <div className="text-xl font-bold text-green-600 mt-1 flex items-center gap-1">
            <Award className="w-4 h-4" />
            {stats.totalCaciks}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl">
          <div className="text-sm text-gray-600">Ort. Süre</div>
          <div className="text-xl font-bold text-green-600 mt-1 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {Math.round(stats.averageDuration / 60)}dk
          </div>
        </div>
      </div>

      {/* İlçe Listesi */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-700">İlçeler</h4>
        <div className="grid grid-cols-1 gap-3">
          {city.districts.map((district) => {
            const activeSessions = districtSessions[district] || [];
            const isActive = activeSessions.length > 0;
            
            return (
              <div 
                key={district}
                className={`p-4 rounded-xl ${
                  isActive ? 'bg-green-50' : 'bg-white'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{district}</div>
                    {isActive && (
                      <div className="text-sm text-green-600 mt-1">
                        {activeSessions.length} aktif cacıkçı
                      </div>
                    )}
                  </div>
                  {isActive && (
                    <div className="flex flex-col gap-1">
                      {activeSessions.map((session, idx) => (
                        <div 
                          key={idx}
                          className="text-sm text-gray-600 flex items-center gap-1"
                        >
                          <Users className="w-3 h-3" />
                          {session.username}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}