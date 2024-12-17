import React, { useState } from 'react';
import { Book, Timer, Trophy, Users, MapPin, Award, ChevronRight, Info } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';

const guideItems = [
  {
    id: 'basics',
    title: 'Temel Bilgiler',
    icon: Info,
    content: [
      {
        title: 'Cacık Nedir?',
        description: 'Cacık, yoğurt bazlı geleneksel bir Türk mezesidir. Cacıkmatik uygulamasında, cacık yapma sürenizi takip edebilir ve başarılarınızı kaydedebilirsiniz.'
      },
      {
        title: 'Nasıl Başlarım?',
        description: 'Ana sayfadaki "Cacık Başlat" butonuna tıklayarak yeni bir cacık seansı başlatabilirsiniz. Cacığınızı tamamladığınızda "Cacığı Bitir" butonuna tıklayın.'
      }
    ]
  },
  {
    id: 'timer',
    title: 'Zamanlayıcı',
    icon: Timer,
    content: [
      {
        title: 'Süre Takibi',
        description: 'Cacık yaparken geçen süreniz otomatik olarak kaydedilir. Minimum 5 dakika cacık yapmanız önerilir.'
      },
      {
        title: 'Süre Durdurma',
        description: 'Cacığınızı bitirdiğinizde "Cacığı Bitir" butonuna tıklayın. Süreniz kaydedilecek ve başarılarınıza eklenecektir.'
      }
    ]
  },
  {
    id: 'achievements',
    title: 'Başarılar ve Rozetler',
    icon: Award,
    content: [
      {
        title: 'Rozet Türleri',
        description: 'Üç tür rozet kazanabilirsiniz:\n- Normal Rozetler: Genel başarılarınız için\n- Haftalık Rozetler: Haftalık performansınız için\n- Özel Rozetler: Özel günler ve etkinlikler için'
      },
      {
        title: 'Rozet Kazanma',
        description: 'Düzenli cacık yaparak, uzun süreli cacıklar hazırlayarak ve özel etkinliklere katılarak rozetler kazanabilirsiniz.'
      }
    ]
  },
  {
    id: 'leaderboard',
    title: 'Liderlik Tablosu',
    icon: Trophy,
    content: [
      {
        title: 'Sıralama Sistemi',
        description: 'Liderlik tablosunda günlük, haftalık ve tüm zamanların en iyi cacıkçıları listelenir. Toplam cacık sayınız ve ortalama süreniz değerlendirmeye alınır.'
      },
      {
        title: 'Ödüller',
        description: 'Liderlik tablosunda üst sıralarda yer alarak özel rozetler kazanabilirsiniz. Her hafta yeni bir yarış başlar.'
      }
    ]
  },
  {
    id: 'friends',
    title: 'Arkadaşlar',
    icon: Users,
    content: [
      {
        title: 'Arkadaş Ekleme',
        description: 'Diğer cacıkçıları arkadaş olarak ekleyebilir, onların başarılarını takip edebilirsiniz.'
      },
      {
        title: 'Sosyal Özellikler',
        description: 'Arkadaşlarınızın aktif cacık seanslarını görebilir, rozetlerini inceleyebilirsiniz.'
      }
    ]
  },
  {
    id: 'locations',
    title: 'Konum Özellikleri',
    icon: MapPin,
    content: [
      {
        title: 'Bölge Takibi',
        description: 'Türkiye\'nin farklı bölgelerindeki cacık aktivitelerini harita üzerinden takip edebilirsiniz.'
      },
      {
        title: 'Şehir İstatistikleri',
        description: 'Her şehrin cacık istatistiklerini görebilir, en aktif bölgeleri keşfedebilirsiniz.'
      }
    ]
  }
];

export default function GuidePage() {
  const [selectedItem, setSelectedItem] = useState(guideItems[0].id);

  const selectedGuide = guideItems.find(item => item.id === selectedItem);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pb-16">
      <div className="p-4">
        <div className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
          <Book className="w-6 h-6" />
          <span>Uygulama Rehberi</span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-hide">
          {guideItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedItem === item.id
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-green-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {selectedGuide && (
          <div className="space-y-6">
            {selectedGuide.content.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <ChevronRight className="w-5 h-5 text-green-500" />
                    {section.title}
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 whitespace-pre-line">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNavigation />
    </div>
  );
}