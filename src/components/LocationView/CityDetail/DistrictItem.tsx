import React from 'react';
import { Users } from 'lucide-react';
import { DistrictItemProps } from '../types';

export default function DistrictItem({ district, activeSessions }: DistrictItemProps) {
  const isActive = activeSessions.length > 0;
  
  return (
    <div className={`p-4 rounded-xl ${isActive ? 'bg-green-50' : 'bg-white'}`}>
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
}