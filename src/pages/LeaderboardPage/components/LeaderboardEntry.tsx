import React from 'react';
import { Trophy, Clock, Medal, MapPin } from 'lucide-react';
import { Profile, CacikSession } from '../../../types/supabase';
import { formatTime } from '../../../utils/formatTime';
import BadgeDisplay from '../../../components/BadgeDisplay';
import { getBadges } from '../../../utils/badges';

interface LeaderboardEntryProps {
  entry: Profile & { sessions: CacikSession[] };
  rank: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function LeaderboardEntry({ entry, rank, isExpanded, onToggle }: LeaderboardEntryProps) {
  const badges = getBadges(entry.sessions);
  const weeklyBadges = badges.filter(b => b.type === 'weekly' && b.earned);
  const specialBadges = badges.filter(b => b.type === 'special' && b.earned);
  const regularBadges = badges.filter(b => b.type === 'regular' && b.earned);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
            {rank < 3 ? (
              <Medal className={`w-6 h-6 ${
                rank === 0 ? 'text-yellow-400' :
                rank === 1 ? 'text-gray-400' :
                'text-orange-400'
              }`} />
            ) : (
              <span className="text-gray-500 font-bold">{rank + 1}</span>
            )}
          </div>
          
          <div className="flex-grow">
            <div className="font-semibold flex items-center gap-2">
              {entry.username}
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
              {entry.city}
              {entry.district && `, ${entry.district}`}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <Trophy className="w-4 h-4" />
              <span>{entry.total_caciks} cacık</span>
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(entry.average_time)}
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 bg-gray-50">
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
}