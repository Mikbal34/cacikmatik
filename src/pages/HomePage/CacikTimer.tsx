import React, { useState, useEffect } from 'react';
import { Salad } from 'lucide-react';
import { useProfile } from '../../contexts/ProfileContext';
import Timer from '../../components/Timer';
import CountdownOverlay from '../../components/CountdownOverlay';
import CompletionAnimation from '../../components/CompletionAnimation';
import { useTimer } from './hooks/useTimer';

export default function CacikTimer() {
  const { updateProfile, addActiveSession, removeActiveSession, updateSessionTime } = useProfile();
  const { seconds, isRunning, showCompletion, startTimer, stopTimer } = useTimer();
  const [countdownMessage, setCountdownMessage] = useState('');
  const [showCountdown, setShowCountdown] = useState(false);
  const updateInterval = React.useRef<number>();

  useEffect(() => {
    if (isRunning) {
      addActiveSession();
      updateInterval.current = window.setInterval(() => {
        updateSessionTime();
      }, 30000);
    }

    return () => {
      if (updateInterval.current) {
        clearInterval(updateInterval.current);
      }
      removeActiveSession();
    };
  }, [isRunning, addActiveSession, removeActiveSession, updateSessionTime]);

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

  const handleComplete = async () => {
    try {
      await updateProfile({
        profile_id: '', // Auth context will handle this
        duration: seconds,
        date: new Date().toISOString()
      });
      removeActiveSession();
      stopTimer();
    } catch (error) {
      console.error('Error completing cacik:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <>
      <CountdownOverlay message={countdownMessage} isVisible={showCountdown} />
      <CompletionAnimation isVisible={showCompletion} time={seconds} />
      
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
    </>
  );
}