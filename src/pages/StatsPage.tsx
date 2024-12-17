import React from 'react';
import { BarChart2 } from 'lucide-react';
import Layout from '../components/Layout';
import StatsView from '../components/StatsView';

export default function StatsPage() {
  return (
    <Layout title={
      <div className="flex items-center gap-2">
        <BarChart2 className="w-6 h-6" />
        <span>İstatistiklerim</span>
      </div>
    }>
      <StatsView />
    </Layout>
  );
}