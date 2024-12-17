import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import RegionsPage from './location/RegionsPage';
import RegionDetailPage from './location/RegionDetailPage';
import CityDetailPage from './location/CityDetailPage';

export default function LocationPage() {
  return (
    <Layout>
      <Routes>
        <Route index element={<RegionsPage />} />
        <Route path=":regionId" element={<RegionDetailPage />} />
        <Route path=":regionId/:cityName" element={<CityDetailPage />} />
        <Route path="*" element={<Navigate to="/location" replace />} />
      </Routes>
    </Layout>
  );
}