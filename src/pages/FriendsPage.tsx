import React from 'react';
import { Users } from 'lucide-react';
import Layout from '../components/Layout';
import FriendsList from '../components/FriendsList';

export default function FriendsPage() {
  return (
    <Layout title={
      <div className="flex items-center gap-2">
        <Users className="w-6 h-6" />
        <span>Arkadaşlarım</span>
      </div>
    }>
      <FriendsList />
    </Layout>
  );
}