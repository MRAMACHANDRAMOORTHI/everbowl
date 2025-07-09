import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Star, 
  Calendar,
  Filter,
  TrendingUp
} from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface Feedback {
  id: string;
  userId: string;
  userName?: string;
  message: string;
  rating: number;
  createdAt: any;
}

const FeedbackPanel: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const feedbackRef = collection(db, 'feedback');
      const q = query(feedbackRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      const feedbackData = await Promise.all(
        snapshot.docs.map(async (feedbackDoc) => {
          const feedback = { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
          
          // Fetch user name
          try {
            const usersRef = collection(db, 'users');
            const usersSnapshot = await getDocs(usersRef);
            const user = usersSnapshot.docs.find(doc => doc.id === feedback.userId);
            if (user) {
              feedback.userName = user.data().name;
            }
          } catch (error) {
            console.error('Error fetching user:', error);
          }
          
          return feedback;
        })
      );
      
      setFeedbacks(feedbackData);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (filter === 'all') return true;
    if (filter === 'high') return feedback.rating >= 4;
    if (filter === 'medium') return feedback.rating === 3;
    if (filter === 'low') return feedback.rating <= 2;
    return true;
  });

  const averageRating = feedbacks.length > 0 
    ? feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length
    : 0;

  const ratingDistribution = {
    5: feedbacks.filter(f => f.rating === 5).length,
    4: feedbacks.filter(f => f.rating === 4).length,
    3: feedbacks.filter(f => f.rating === 3).length,
    2: feedbacks.filter(f => f.rating === 2).length,
    1: feedbacks.filter(f => f.rating === 1).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Customer Feedback</h2>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Ratings</option>
            <option value="high">High (4-5 stars)</option>
            <option value="medium">Medium (3 stars)</option>
            <option value="low">Low (1-2 stars)</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{feedbacks.length}</p>
              <p className="text-gray-600">Total Reviews</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((ratingDistribution[4] + ratingDistribution[5]) / feedbacks.length * 100) || 0}%
              </p>
              <p className="text-gray-600">Positive Reviews</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Rating Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 w-16">
                <span className="text-sm font-medium">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: feedbacks.length > 0 
                      ? `${(ratingDistribution[rating as keyof typeof ratingDistribution] / feedbacks.length) * 100}%`
                      : '0%'
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">
                {ratingDistribution[rating as keyof typeof ratingDistribution]}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedbacks.length > 0 ? (
          filteredFeedbacks.map((feedback, index) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {feedback.userName?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{feedback.userName || 'Anonymous'}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {renderStars(feedback.rating)}
                      </div>
                      <span className="text-sm text-gray-500">
                        {feedback.createdAt 
                          ? new Date(feedback.createdAt.seconds * 1000).toLocaleDateString()
                          : 'Recent'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{feedback.message}</p>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No feedback yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPanel;