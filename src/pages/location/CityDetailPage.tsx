import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Users, Clock, Award } from 'lucide-react';
import { useActiveSessions } from '../../hooks/useActiveSessions';
import { useCityStats } from '../../hooks/useCityStats';
import { formatTime } from '../../utils/formatTime';

export default function CityDetailPage() {
  const { regionId, cityName } = useParams();
  const navigate = useNavigate();
  const { activeSessions } = useActiveSessions();
  const cityStats = useCityStats();

  if (!cityName) return <Navigate to={`/location/${regionId}`} replace />;

  const stats = cityStats[cityName] || { activeCaciks: 0, totalCaciks: 0, averageDuration: 0 };
  const cityActiveSessions = activeSessions.filter(s => s.city === cityName);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm mb-6">
        <button
          onClick={() => navigate(`/location/${regionId}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Geri</span>
        </button>
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-600" />
          {cityName}
        </h2>
        <div className="w-20"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex flex-col items-center">
            <Users className="w-8 h-8 text-blue-500 mb-2" />
            <span className="text-2xl font-bold text-gray-800">{stats.activeCaciks}</span>
            <span className="text-sm text-gray-600 mt-1">Aktif Cacıkçı</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex flex-col items-center">
            <Award className="w-8 h-8 text-yellow-500 mb-2" />
            <span className="text-2xl font-bold text-gray-800">{stats.totalCaciks}</span>
            <span className="text-sm text-gray-600 mt-1">Toplam Cacık</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex flex-col items-center">
            <Clock className="w-8 h-8 text-green-500 mb-2" />
            <span className="text-2xl font-bold text-gray-800">
              {Math.round(stats.averageDuration / 60)}
            </span>
            <span className="text-sm text-gray-600 mt-1">Ort. Dakika</span>
          </div>
        </div>
      </div>

      {/* Active Users */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          Aktif Cacıkçılar
        </h3>
        
        <div className="space-y-3">
          {cityActiveSessions.length > 0 ? (
            cityActiveSessions.map((session, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="font-medium text-gray-700">{session.username}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(session.startTime).toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p>Şu an aktif cacık yapan yok</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}