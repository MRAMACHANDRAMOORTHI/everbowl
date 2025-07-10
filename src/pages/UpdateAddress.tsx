import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Layout } from '../components/common/Layout';
import { Card } from '../components/ui/Card';
import { CheckCircle } from 'lucide-react';

const UpdateAddress: React.FC = () => {
  const { currentUser, userProfile, setUserProfile } = useAuth();
  const [address, setAddress] = useState(userProfile?.address || '');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    if (!currentUser || !address.trim()) return;

    setLoading(true);
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { address });

      const updatedDoc = await getDoc(userRef);
      if (updatedDoc.exists() && userProfile) {
        setUserProfile({ ...userProfile, address: updatedDoc.data().address });
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000); // auto-hide after 4 seconds
    } catch (error) {
      console.error('Error updating address:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="pt-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {showSuccess && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-100 border border-green-300 text-green-800 px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg animate-fade-in-down z-50">
            <CheckCircle className="w-5 h-5 text-green-700" />
            <span>Address updated successfully!</span>
          </div>
        )}

        <Card className="p-8 shadow-xl bg-white">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            📍 Update Delivery Address
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Please provide your complete and accurate delivery address below.
          </p>

          <div className="space-y-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Your Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={5}
              placeholder="Ex: Avinashi Road, Peelamedu, Coimbatore"
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-all duration-300"
            >
              {loading ? 'Saving Address...' : 'Save Address'}
            </button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default UpdateAddress;
