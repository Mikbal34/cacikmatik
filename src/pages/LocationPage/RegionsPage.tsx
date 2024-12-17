import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Award, Clock } from 'lucide-react';
import { regions } from '../../components/LocationView/constants/regions';
import { LocationStats } from '../../hooks/useLocationStats';
import { formatTime } from '../../utils/formatTime';

interface RegionsPageProps {
  cityStats: Record<string, LocationStats>;
}

export default function RegionsPage({ cityStats }: RegionsPageProps) {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
        <MapPin className="w-6 h-6" />
        Bölgeler
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {regions.map((region) => {
          const activeCaciks = region.cities.reduce(
            (sum, city) => sum + (cityStats[city]?.activeCaciks || 0),
            0
          );
          const totalCaciks = region.cities.reduce(
            (sum, city) => sum + (cityStats[city]?.totalCaciks || 0),
            0
          );
          const averageDuration = region.cities.reduce(
            (sum, city) => sum + (cityStats[city]?.averageDuration || 0),
            0
          ) / region.cities.length;

          return (
            <button
              key={region.id}
              onClick={() => navigate(region.id)}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {region.name}
                    </h3>
                    <div className="text-sm text-gray-500 mt-1">
                      {region.cities.length} şehir
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6 mt-4 sm:mt-0">
                  <div className="flex flex-col items-center">
                    <Users className="w-5 h-5 text-blue-500 mb-1" />
                    <span className="text-sm font-medium">{activeCaciks}</span>
                    <span className="text-xs text-gray-500">Aktif</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Award className="w-5 h-5 text-yellow-500 mb-1" />
                    <span className="text-sm font-medium">{totalCaciks}</span>
                    <span className="text-xs text-gray-500">Toplam</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Clock className="w-5 h-5 text-green-500 mb-1" />
                    <span className="text-sm font-medium">
                      {formatTime(Math.round(averageDuration))}
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