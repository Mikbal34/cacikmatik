import React from 'react';
import { Award, Trophy, Clock, Calendar, Star, Crown, Gift, Moon, CheckCircle, Hourglass } from 'lucide-react';
import { Badge } from '../utils/badges';

interface BadgeDisplayProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  award: Award,
  trophy: Trophy,
  clock: Clock,
  calendar: Calendar,
  star: Star,
  crown: Crown,
  gift: Gift,
  moon: Moon,
  'check-circle': CheckCircle,
  hourglass: Hourglass
};

const rarityColors = {
  common: 'bg-gray-100 text-gray-600',
  rare: 'bg-blue-100 text-blue-600',
  epic: 'bg-purple-100 text-purple-600',
  legendary: 'bg-yellow-100 text-yellow-600'
};

export default function BadgeDisplay({ badge, size = 'md', showTooltip = true }: BadgeDisplayProps) {
  const Icon = iconMap[badge.icon] || Award;
  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-12 h-12 p-2',
    lg: 'w-16 h-16 p-3'
  };

  return (
    <div className="relative group">
      <div
        className={`${sizeClasses[size]} rounded-full ${
          badge.earned ? rarityColors[badge.rarity] : 'bg-gray-100 text-gray-400'
        } transition-all duration-300 ${badge.earned ? 'hover:scale-110' : ''}`}
      >
        <Icon className={`w-full h-full ${badge.type === 'weekly' ? 'animate-pulse' : ''}`} />
      </div>
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
          <div className="font-bold mb-1">{badge.name}</div>
          <div>{badge.description}</div>
          {badge.earnedDate && (
            <div className="text-gray-300 text-[10px] mt-1">
              {new Date(badge.earnedDate).toLocaleDateString()}
            </div>
          )}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
        </div>
      )}
    </div>
  );
}