import React from 'react';
import { getCityColor } from './utils';
import { getCityPosition } from './cityPositions';
import { CityStats } from './types';

interface CityMarkerProps {
  cityId: number;
  cityName: string;
  onClick: () => void;
  cityStats: Record<string, CityStats>;
}

export default function CityMarker({ cityId, cityName, onClick, cityStats }: CityMarkerProps) {
  const position = getCityPosition(cityId);
  
  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}>
      <rect
        x={position.x}
        y={position.y}
        width="40"
        height="30"
        fill={getCityColor(cityName, cityStats)}
        rx="5"
        className="transition-colors duration-200 hover:opacity-80"
      />
      <text
        x={position.x + 20}
        y={position.y + 18}
        textAnchor="middle"
        className="text-[8px] font-medium fill-gray-700"
      >
        {cityName}
      </text>
    </g>
  );
}