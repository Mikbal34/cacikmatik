import React, { useState } from 'react';
import { Trophy, Calendar } from 'lucide-react';
import { useLeaderboard, Period } from '../../hooks/useLeaderboard';
import LeaderboardEntry from './components/LeaderboardEntry';
import BottomNavigation from '../../components/BottomNavigation';

export default function LeaderboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('daily');
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const { entries, isLoading } = useLeaderboard(selectedPeriod);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pb-16">
      <div className="p-4">
        <div className="text-4xl font-bold text-green-600 mb-8 flex items-center gap-3">
          <Trophy className="w-8 h-8" />
          <span>Liderlik Tablosu</span>
        </div>

        {/* Period Selector */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { id: 'daily', label: 'Günlük', icon: Calendar },
            { id: 'weekly', label: 'Haftalık', icon: Calendar },
            { id: 'all-time', label: 'Tüm Zamanlar', icon: Trophy }
          ].map(period => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id as Period)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                selectedPeriod === period.id
                  ? 'bg-green-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-green-50'
              }`}
            >
              <period.icon className="w-5 h-5 mb-1" />
              <span className="text-sm font-medium">{period.label}</span>
            </button>
          ))}
        </div>

        {/* Leaderboard List */}
        <div className="space-y-3">
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <LeaderboardEntry
                key={entry.id}
                entry={entry}
                rank={index}
                isExpanded={expandedUser === entry.id}
                onToggle={() => setExpandedUser(
                  expandedUser === entry.id ? null : entry.id
                )}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p>Henüz veri bulunmuyor</p>
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
}