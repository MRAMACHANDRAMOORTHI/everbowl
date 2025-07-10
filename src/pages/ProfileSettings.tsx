import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Layout } from '../components/common/Layout';
import { Card } from '../components/ui/Card';
import { CheckCircle } from 'lucide-react';
import { User } from 'firebase/auth';

const ProfileSettings: React.FC = () => {
  const { currentUser, userProfile, setUserProfile } = useAuth();
  const [name, setName] = useState(userProfile?.name || '');
  const [email] = useState(currentUser?.email || '');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { name });

      const updatedDoc = await getDoc(userRef);
      if (updatedDoc.exists() && userProfile) {
        setUserProfile({ ...userProfile, name: updatedDoc.data().name });
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="pt-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {showSuccess && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-100 border border-green-300 text-green-800 px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg z-50">
            <CheckCircle className="w-5 h-5 text-green-700" />
            <span>Profile updated successfully!</span>
          </div>
        )}

        <Card className="p-8 shadow-xl bg-white">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">👤 Profile Settings</h2>
          <p className="text-gray-600 text-center mb-8">Edit your basic info here</p>

          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                disabled
                className="w-full p-3 border border-gray-200 bg-gray-100 rounded-xl shadow-sm text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-all duration-300"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfileSettings;
