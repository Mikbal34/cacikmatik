import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useLocationStats } from '../../hooks/useLocationStats';
import RegionsPage from './RegionsPage';
import RegionDetailPage from './RegionDetailPage';
import CityDetailPage from './CityDetailPage';
import BottomNavigation from '../../components/BottomNavigation';

export default function LocationPage() {
  const { cityStats, isLoading } = useLocationStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pb-16">
      <Routes>
        <Route index element={<RegionsPage cityStats={cityStats} />} />
        <Route path=":regionId" element={<RegionDetailPage cityStats={cityStats} />} />
        <Route path=":regionId/:cityName" element={<CityDetailPage cityStats={cityStats} />} />
        <Route path="*" element={<Navigate to="/location" replace />} />
      </Routes>
      <BottomNavigation />
    </div>
  );
}