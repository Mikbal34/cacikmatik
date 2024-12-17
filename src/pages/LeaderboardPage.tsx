import React from 'react';
import { Trophy } from 'lucide-react';
import Layout from '../components/Layout';
import LeaderboardView from '../components/LeaderboardView';

export default function LeaderboardPage() {
  return (
    <Layout title={
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6" />
        <span>Liderlik Tablosu</span>
      </div>
    }>
      <LeaderboardView />
    </Layout>
  );
}