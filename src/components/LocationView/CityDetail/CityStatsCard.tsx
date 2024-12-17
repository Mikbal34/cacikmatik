import React from 'react';
import { CityStatsCardProps } from '../types';

export default function CityStatsCard({ label, value, icon }: CityStatsCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-xl font-bold text-green-600 mt-1 flex items-center gap-1">
        {icon}
        {value}
      </div>
    </div>
  );
}