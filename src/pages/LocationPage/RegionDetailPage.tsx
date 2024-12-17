import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Users, Award, Clock } from 'lucide-react';
import { regions } from '../../components/LocationView/constants/regions';
import { LocationStats } from '../../hooks/useLocationStats';
import { formatTime } from '../../utils/formatTime';

interface RegionDetailPageProps {
  cityStats: Record<string, LocationStats>;
}

export default function RegionDetailPage({ cityStats }: RegionDetailPageProps) {
  const { regionId } = useParams();
  const navigate = useNavigate();

  const region = regions.find(r => r.id === regionId);
  if (!region) return <Navigate to="/location" replace />;

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/location')}
          className="text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-green-600 flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          {region.name}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {region.cities.map((cityName) => {
          const stats = cityStats[cityName] || {
            activeCaciks: 0,
            totalCaciks: 0,
            averageDuration: 0,
            activeUsers: []
          };
          
          return (
            <button
              key={cityName}
              onClick={() => navigate(`/location/${regionId}/${cityName}`)}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {cityName}
                    </h3>
                    {stats.activeUsers.length > 0 && (
                      <div className="text-sm text-green-600 mt-1">
                        {stats.activeUsers.length} aktif cacıkçı
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6 mt-4 sm:mt-0">
                  <div className="flex flex-col items-center">
                    <Users className="w-5 h-5 text-blue-500 mb-1" />
                    <span className="text-sm font-medium">{stats.activeCaciks}</span>
                    <span className="text-xs text-gray-500">Aktif</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Award className="w-5 h-5 text-yellow-500 mb-1" />
                    <span className="text-sm font-medium">{stats.totalCaciks}</span>
                    <span className="text-xs text-gray-500">Toplam</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Clock className="w-5 h-5 text-green-500 mb-1" />
                    <span className="text-sm font-medium">
                      {formatTime(Math.round(stats.averageDuration))}
                    </span>
                    <span className="text-xs text-gray-500">Ort.</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}