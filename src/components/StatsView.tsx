import React from 'react';
import { Clock, Award, Calendar, Repeat } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { formatTime } from '../utils/formatTime';

export default function StatsView() {
  const { profile, sessions } = useProfile();

  if (!profile) {
    return (
      <div className="p-4 text-center text-gray-500">
        Henüz istatistik bulunmuyor
      </div>
    );
  }

  const todaySessions = sessions.filter(
    session => new Date(session.date).toDateString() === new Date().toDateString()
  );

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-green-600 mb-6">İstatistiklerim</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <Repeat className="w-5 h-5" />
            <span className="font-semibold">Bugün</span>
          </div>
          <div className="text-2xl font-bold">{todaySessions.length}</div>
          <div className="text-sm text-gray-500">cacık</div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="font-semibold">Toplam</span>
          </div>
          <div className="text-2xl font-bold">{profile.totalCaciks}</div>
          <div className="text-sm text-gray-500">cacık</div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Ortalama</span>
          </div>
          <div className="text-2xl font-bold">{formatTime(Math.round(profile.averageTime))}</div>
          <div className="text-sm text-gray-500">süre</div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <Award className="w-5 h-5" />
            <span className="font-semibold">En İyi</span>
          </div>
          <div className="text-2xl font-bold">{formatTime(profile.bestTime)}</div>
          <div className="text-sm text-gray-500">süre</div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Son Cacıklar</h3>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {sessions.slice(-5).reverse().map((session) => (
            <div key={session.id} className="p-4 border-b border-gray-100 last:border-0">
              <div className="flex justify-between items-center">
                <div className="text-gray-600">
                  {new Date(session.date).toLocaleDateString()}
                </div>
                <div className="font-semibold text-green-600">
                  {formatTime(session.duration)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}