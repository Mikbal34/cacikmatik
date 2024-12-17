import React from 'react';

export default function Legend() {
  return (
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
  );
}