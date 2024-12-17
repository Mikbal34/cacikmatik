import React from 'react';
import { ChevronLeft, MapPin } from 'lucide-react';

interface CityHeaderProps {
  cityName: string;
  onBack: () => void;
}

export default function CityHeader({ cityName, onBack }: CityHeaderProps) {
  return (
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
      <div className="w-20"></div>
    </div>
  );
}