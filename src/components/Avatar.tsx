import React from 'react';

interface AvatarProps {
  username: string;
  size?: number;
  className?: string;
}

export default function Avatar({ username, size = 40, className = '' }: AvatarProps) {
  // DiceBear API'sini kullanarak avatar URL'i oluştur
  const avatarUrl = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${encodeURIComponent(username)}`;

  return (
    <div 
      className={`rounded-full overflow-hidden bg-green-50 ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={avatarUrl}
        alt={`${username}'s avatar`}
        className="w-full h-full object-cover"
      />
    </div>
  );
}