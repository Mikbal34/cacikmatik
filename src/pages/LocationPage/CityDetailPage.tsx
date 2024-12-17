import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ChevronLeft, MapPin } from 'lucide-react';
import { useLocationStats } from '../../hooks/useLocationStats';
import CityStats from './components/CityStats';
import ActiveUsers from './components/ActiveUsers';

export default function CityDetailPage() {
  const { regionId, cityName } = useParams();
  const navigate = useNavigate();
  const { cityStats, isLoading } = useLocationStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent" />
      </div>
    );
  }

  if (!cityName || !cityStats[cityName]) {
    return <Navigate to={`/location/${regionId}`} replace />;
  }

  const stats = cityStats[cityName];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
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

      {/* Stats */}
      <CityStats stats={stats} />

      {/* Active Users */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          Aktif Cacıkçılar
        </h3>
        <ActiveUsers users={stats.activeUsers} />
      </div>
    </div>
  );
}