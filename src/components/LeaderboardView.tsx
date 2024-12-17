import React, { useState } from 'react';
import { Trophy, Clock, Medal, MapPin, Calendar, ChevronDown } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { formatTime } from '../utils/formatTime';
import { getLeaderboardData, LeaderboardEntry } from '../utils/leaderboard';
import BadgeDisplay from './BadgeDisplay';
import { getBadges } from '../utils/badges';

type Period = 'daily' | 'weekly' | 'all-time';

export default function LeaderboardView() {
  const { profile } = useProfile();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('daily');
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const leaderboardData = getLeaderboardData(selectedPeriod);

  return (
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
      <div className="bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-100">
        {leaderboardData.map((user, index) => {
          const userBadges = getBadges(user.sessions);
          const weeklyBadges = userBadges.filter(b => b.type === 'weekly' && b.earned);
          const specialBadges = userBadges.filter(b => b.type === 'special' && b.earned);
          const regularBadges = userBadges.filter(b => b.type === 'regular' && b.earned);
          const isExpanded = expandedUser === user.id;
          
          return (
            <div
              key={user.id}
              className={`transition-all duration-300 ${
                profile?.id === user.id ? 'bg-green-50' : 'hover:bg-gray-50'
              }`}
            >
              {/* Ana Satır */}
              <div className="p-4 flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  {index < 3 ? (
                    <Medal className={`w-6 h-6 ${
                      index === 0 ? 'text-yellow-400' :
                      index === 1 ? 'text-gray-400' :
                      'text-orange-400'
                    }`} />
                  ) : (
                    <span className="text-gray-500 font-bold">{index + 1}</span>
                  )}
                </div>
                
                <div className="flex-grow">
                  <div className="font-semibold flex items-center gap-2">
                    {user.username}
                    {(weeklyBadges.length > 0 || specialBadges.length > 0) && (
                      <div className="flex -space-x-1">
                        {[...weeklyBadges, ...specialBadges].slice(0, 3).map(badge => (
                          <BadgeDisplay key={badge.id} badge={badge} size="sm" />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {user.city}
                    {user.district && `, ${user.district}`}
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    <Trophy className="w-4 h-4" />
                    <span>{user.totalCaciks} cacık</span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTime(user.averageTime)}
                  </div>
                </div>

                <button
                  onClick={() => setExpandedUser(isExpanded ? null : user.id)}
                  className={`ml-2 p-1 rounded-full hover:bg-gray-100 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Genişletilmiş Detaylar */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-4 bg-gray-50">
                  {/* Haftalık Rozetler */}
                  {weeklyBadges.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Haftalık Başarılar</h4>
                      <div className="flex flex-wrap gap-2">
                        {weeklyBadges.map(badge => (
                          <BadgeDisplay key={badge.id} badge={badge} size="md" />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Özel Rozetler */}
                  {specialBadges.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Özel Başarılar</h4>
                      <div className="flex flex-wrap gap-2">
                        {specialBadges.map(badge => (
                          <BadgeDisplay key={badge.id} badge={badge} size="md" />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Normal Rozetler */}
                  {regularBadges.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Genel Başarılar</h4>
                      <div className="flex flex-wrap gap-2">
                        {regularBadges.map(badge => (
                          <BadgeDisplay key={badge.id} badge={badge} size="md" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {leaderboardData.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Trophy className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Henüz veri bulunmuyor</p>
          </div>
        )}
      </div>
    </div>
  );
}