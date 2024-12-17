import { CacikSession } from '../types';

export interface Badge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  icon: string;
  type: 'regular' | 'weekly' | 'special';
  earnedDate?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// Haftalık tarih kontrolü için yardımcı fonksiyonlar
function getWeekDates(): { start: Date; end: Date } {
  const now = new Date();
  const currentDay = now.getDay();
  const diff = now.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
  
  const weekStart = new Date(now.setDate(diff));
  weekStart.setHours(0, 0, 0, 0);
  
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);
  
  return { start: weekStart, end: weekEnd };
}

function hasCompletedAllWeekDays(sessions: CacikSession[]): boolean {
  const { start, end } = getWeekDates();
  const weekDays = new Set();
  
  const weekSessions = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate >= start && sessionDate <= end;
  });

  weekSessions.forEach(session => {
    const sessionDate = new Date(session.date);
    const day = sessionDate.getDay();
    weekDays.add(day);
  });

  const requiredDays = new Set([1, 2, 3, 4, 5]);
  return [...requiredDays].every(day => weekDays.has(day));
}

function checkConsecutiveDays(sessions: CacikSession[]): boolean {
  if (sessions.length < 3) return false;

  const dates = sessions.map(s => {
    const date = new Date(s.date);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }).sort((a, b) => a - b);

  let consecutiveDays = 1;
  let maxConsecutiveDays = 1;

  for (let i = 1; i < dates.length; i++) {
    const dayDiff = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
    
    if (dayDiff === 1) {
      consecutiveDays++;
      maxConsecutiveDays = Math.max(maxConsecutiveDays, consecutiveDays);
    } else if (dayDiff > 1) {
      consecutiveDays = 1;
    }
  }

  return maxConsecutiveDays >= 3;
}

export function getBadges(sessions: CacikSession[]): Badge[] {
  const totalCaciks = sessions.length;
  const patientCaciks = sessions.filter(s => s.duration >= 300).length;
  const hasConsecutive = checkConsecutiveDays(sessions);
  
  const { start, end } = getWeekDates();
  const weekSessions = sessions.filter(s => {
    const sessionDate = new Date(s.date);
    return sessionDate >= start && sessionDate <= end;
  });
  
  const weeklyTotal = weekSessions.length;
  const weeklyAverage = weekSessions.reduce((acc, s) => acc + s.duration, 0) / weeklyTotal || 0;
  const hasAllWeekDays = hasCompletedAllWeekDays(sessions);

  const regularBadges: Badge[] = [
    {
      id: 'beginner',
      name: 'Çırak',
      description: 'İlk cacığını yap',
      earned: totalCaciks >= 1,
      icon: 'award',
      type: 'regular',
      rarity: 'common'
    },
    {
      id: 'master',
      name: 'Usta',
      description: '10 cacık yap',
      earned: totalCaciks >= 10,
      icon: 'trophy',
      type: 'regular',
      rarity: 'rare'
    },
    {
      id: 'patience',
      name: 'Sabır Ustası',
      description: '5 dakika veya üzeri 3 cacık yap',
      earned: patientCaciks >= 3,
      icon: 'clock',
      type: 'regular',
      rarity: 'epic'
    },
    {
      id: 'dedication',
      name: 'Azimli',
      description: 'Üst üste 3 gün cacık yap',
      earned: hasConsecutive,
      icon: 'calendar',
      type: 'regular',
      rarity: 'epic'
    }
  ];

  const weeklyBadges: Badge[] = [
    {
      id: 'weekly-champion',
      name: 'Haftanın Şampiyonu',
      description: 'Bu hafta en çok cacık yapan kişi',
      earned: weeklyTotal >= 20,
      icon: 'trophy',
      type: 'weekly',
      rarity: 'epic'
    },
    {
      id: 'weekly-patient',
      name: 'Haftanın Sabırlısı',
      description: 'Bu hafta ortalama 10 dakika üzeri cacık yapan',
      earned: weeklyAverage >= 600,
      icon: 'hourglass',
      type: 'weekly',
      rarity: 'epic'
    },
    {
      id: 'weekly-consistent',
      name: 'Haftanın Düzenlisi',
      description: 'Bu hafta her iş günü cacık yapan',
      earned: hasAllWeekDays,
      icon: 'check-circle',
      type: 'weekly',
      rarity: 'legendary'
    }
  ];

  const specialBadges: Badge[] = [
    {
      id: 'night-owl',
      name: 'Gece Kuşu',
      description: 'Gece yarısından sonra cacık yap',
      earned: sessions.some(s => {
        const date = new Date(s.date);
        return date.getHours() >= 0 && date.getHours() < 6;
      }),
      icon: 'moon',
      type: 'special',
      rarity: 'rare'
    }
  ];

  return [...regularBadges, ...weeklyBadges, ...specialBadges];
}