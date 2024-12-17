import { Home, Trophy, MapPin, BarChart2, Users, Book } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Ana Sayfa' },
    { path: '/leaderboard', icon: Trophy, label: 'Liderlik' },
    { path: '/location', icon: MapPin, label: 'Konum' },
    { path: '/stats', icon: BarChart2, label: 'İstatistik' },
    { path: '/friends', icon: Users, label: 'Arkadaşlar' },
    { path: '/guide', icon: Book, label: 'Rehber' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ path, icon: Icon, label }) => (
          <button 
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center ${
              isActive(path) ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}