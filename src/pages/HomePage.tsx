import React, { useState, useEffect } from 'react';
import { Salad } from 'lucide-react';
import Layout from '../components/Layout';
import CountdownOverlay from '../components/CountdownOverlay';
import CompletionAnimation from '../components/CompletionAnimation';
import Timer from '../components/Timer';
import { useTimer } from '../hooks/useTimer';
import { useProfile } from '../hooks/useProfile';
import { useActiveSessions } from '../hooks/useActiveSessions';
import { v4 as uuidv4 } from 'uuid';
import Confetti from 'react-confetti';

export default function HomePage() {
  const { seconds, isRunning, showCompletion, startTimer, stopTimer } = useTimer();
  const { profile, updateProfile, newBadge } = useProfile();
  const { addActiveSession, removeActiveSession, updateSessionTime } = useActiveSessions();
  const [countdownMessage, setCountdownMessage] = useState('');
  const [showCountdown, setShowCountdown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const updateInterval = React.useRef<number>();

  useEffect(() => {
    if (newBadge) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [newBadge]);

  useEffect(() => {
    if (isRunning && profile) {
      addActiveSession({
        profileId: profile.id,
        username: profile.username,
        city: profile.city,
        district: profile.district
      });

      updateInterval.current = window.setInterval(() => {
        updateSessionTime(profile.id);
      }, 30000);
    }

    return () => {
      if (updateInterval.current) {
        clearInterval(updateInterval.current);
      }
      if (profile) {
        removeActiveSession(profile.id);
      }
    };
  }, [isRunning, profile, addActiveSession, removeActiveSession, updateSessionTime]);

  const startCacik = async () => {
    setShowCountdown(true);
    
    const messages = [
      'Yoğurt dolaptan çıkartılıyor...',
      'Bıçak bileniyor...',
      'Hıyarlar doğranıyor...'
    ];

    for (const message of messages) {
      setCountdownMessage(message);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setShowCountdown(false);
    startTimer();
  };

  const handleComplete = () => {
    if (profile) {
      const session = {
        id: uuidv4(),
        profileId: profile.id,
        duration: seconds,
        date: new Date()
      };
      updateProfile(session);
      removeActiveSession(profile.id);
    }
    stopTimer();
  };

  return (
    <Layout>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      <CountdownOverlay message={countdownMessage} isVisible={showCountdown} />
      <CompletionAnimation isVisible={showCompletion} time={seconds} />
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-4xl font-bold text-green-600 mb-8">Cacıkmatik</div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg w-80 text-center">
          {!isRunning ? (
            <button
              onClick={startCacik}
              className="group relative bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center gap-3">
                <Salad className="w-6 h-6 animate-spin-slow" />
                <span className="text-xl font-semibold">Cacık Başlat</span>
              </div>
            </button>
          ) : (
            <div className="space-y-6">
              <Timer seconds={seconds} />
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl transition-all duration-300"
                onClick={handleComplete}
              >
                Cacığı Bitir
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}