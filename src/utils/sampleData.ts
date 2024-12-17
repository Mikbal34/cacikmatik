import { v4 as uuidv4 } from 'uuid';
import { FriendStats, FriendRequest, CacikSession } from '../types';

// Örnek oturum verileri oluşturan yardımcı fonksiyon
function generateSessions(profileId: string, count: number): CacikSession[] {
  const sessions: CacikSession[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // Son 30 gün içinde rastgele
    
    sessions.push({
      id: uuidv4(),
      profileId,
      duration: 300 + Math.floor(Math.random() * 600), // 5-15 dakika arası
      date
    });
  }
  
  return sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Örnek arkadaş verileri
export const sampleFriends: FriendStats[] = [
  {
    id: uuidv4(),
    username: "HızlıKaşık",
    city: "İstanbul",
    district: "Kadıköy",
    isOnline: true,
    lastActive: new Date(),
    totalCaciks: 156,
    averageTime: 420,
    bestTime: 720, // 12 dakika
    sessions: generateSessions(uuidv4(), 156)
  },
  {
    id: uuidv4(),
    username: "CacıkUstası",
    city: "Ankara",
    district: "Çankaya",
    isOnline: true,
    lastActive: new Date(),
    totalCaciks: 243,
    averageTime: 380,
    bestTime: 840, // 14 dakika
    sessions: generateSessions(uuidv4(), 243)
  },
  {
    id: uuidv4(),
    username: "YoğurtSever",
    city: "İzmir",
    district: "Karşıyaka",
    isOnline: false,
    lastActive: new Date(Date.now() - 3600000),
    totalCaciks: 89,
    averageTime: 350,
    bestTime: 600, // 10 dakika
    sessions: generateSessions(uuidv4(), 89)
  }
];

// Örnek arkadaşlık istekleri
export const sampleRequests: FriendRequest[] = [
  {
    id: uuidv4(),
    username: "SalatacıAhmet",
    city: "İstanbul",
    district: "Beşiktaş"
  },
  {
    id: uuidv4(),
    username: "CacıkPro",
    city: "Ankara",
    district: "Çankaya"
  },
  {
    id: uuidv4(),
    username: "YeşillikSever",
    city: "İzmir",
    district: "Bornova"
  }
];