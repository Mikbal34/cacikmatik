import React from 'react';
import { MapPin } from 'lucide-react';

interface CityStats {
  activeCaciks: number;
  averageDuration: number;
  totalCaciks: number;
}

interface TurkeyMapProps {
  selectedCity: string;
  onCitySelect: (city: string) => void;
  cityStats: Record<string, CityStats>;
}

export default function TurkeyMap({ selectedCity, onCitySelect, cityStats }: TurkeyMapProps) {
  const getCityColor = (cityName: string) => {
    if (!cityStats[cityName]) return '#e5e7eb';
    const stats = cityStats[cityName];
    
    if (stats.activeCaciks > 0) return '#22c55e';
    if (stats.totalCaciks > 0) return '#86efac';
    return '#e5e7eb';
  };

  return (
    <div className="relative w-full aspect-[16/9] bg-white rounded-xl shadow-md p-4 mb-4">
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/3/3d/Turkey_provinces_blank_gray.svg"
        alt="Türkiye Haritası"
        className="w-full h-full"
        useMap="#turkey-map"
      />
      
      <map name="turkey-map">
        {cities.map(city => (
          <area
            key={city.id}
            alt={city.name}
            title={city.name}
            onClick={() => onCitySelect(city.name)}
            style={{ cursor: 'pointer' }}
            shape="poly"
            coords={getCityCoords(city.id)} // Bu fonksiyon her şehir için koordinatları döndürecek
          />
        ))}
      </map>

      {/* Lejant */}
      <div className="absolute top-2 right-2 bg-white rounded-lg shadow-sm p-2 text-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
          <span>Aktif Cacık</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-[#86efac]"></div>
          <span>Cacık Yapılmış</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#e5e7eb]"></div>
          <span>Pasif</span>
        </div>
      </div>

      {selectedCity && cityStats[selectedCity] && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            {selectedCity} İstatistikleri
          </h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Aktif Cacıkçı</div>
              <div className="font-semibold text-green-600">
                {cityStats[selectedCity].activeCaciks}
              </div>
            </div>
            <div>
              <div className="text-gray-600">Toplam Cacık</div>
              <div className="font-semibold text-green-600">
                {cityStats[selectedCity].totalCaciks}
              </div>
            </div>
            <div>
              <div className="text-gray-600">Ort. Süre</div>
              <div className="font-semibold text-green-600">
                {Math.round(cityStats[selectedCity].averageDuration / 60)}dk
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Bu fonksiyon her şehir için koordinatları döndürecek
function getCityCoords(cityId: number): string {
  // Her şehir için koordinatları tanımlayın
  const coords: Record<number, string> = {
    34: "295,125,320,140", // İstanbul
    6: "250,180,280,200",  // Ankara
    35: "180,220,210,240", // İzmir
    16: "220,160,250,180", // Bursa
    1: "420,280,450,300",  // Adana
    // Diğer şehirler için koordinatları ekleyin
  };
  
  return coords[cityId] || "0,0,0,0";
}