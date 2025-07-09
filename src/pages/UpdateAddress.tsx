// src/pages/UpdateAddress.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Layout } from '../components/common/Layout';

const UpdateAddress: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const [address, setAddress] = useState(userProfile?.address || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { address });
      alert('Address updated successfully');
    } catch (error) {
      console.error('Error updating address:', error);
      alert('Failed to update address');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto pt-24 px-4">
        <h2 className="text-2xl font-bold mb-6">Update Address</h2>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={4}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition"
        >
          {loading ? 'Saving...' : 'Save Address'}
        </button>
      </div>
    </Layout>
  );
};

export default UpdateAddress;