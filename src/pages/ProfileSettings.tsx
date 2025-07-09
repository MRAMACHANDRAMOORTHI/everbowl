// src/pages/ProfileSettings.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Layout } from '../components/common/Layout';

const ProfileSettings: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const [name, setName] = useState(userProfile?.name || '');
  const [email] = useState(currentUser?.email || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { name });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto pt-24 px-4">
        <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="text"
              value={email}
              disabled
              className="w-full p-3 border border-gray-200 bg-gray-100 rounded-lg"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileSettings;
