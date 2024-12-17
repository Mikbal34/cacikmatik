import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

interface AddFriendProps {
  onSendRequest: (username: string) => Promise<void>;
}

export default function AddFriend({ onSendRequest }: AddFriendProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username.trim()) return;

    try {
      setError('');
      setIsLoading(true);
      await onSendRequest(username);
      setUsername('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Arkadaşlık isteği gönderilemedi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Arkadaş Ekle</h3>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Kullanıcı adı ara..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!username.trim() || isLoading}
          className="w-full bg-green-500 text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span>İstek Gönder</span>
          )}
        </button>
      </div>
    </div>
  );
}