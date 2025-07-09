import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, Heart } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

const FeedbackForm: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || rating === 0) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'feedback'), {
        userId: currentUser.uid,
        rating,
        message,
        createdAt: new Date()
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="p-8 text-center">
          <Heart className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You! 💚</h3>
          <p className="text-gray-600">
            Your feedback helps us serve you better. We appreciate your time!
          </p>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Loved our food? 🍽️</h3>
          <p className="text-gray-600">Share your experience with us!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700 mb-3">Rate your experience</p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform duration-200 hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 hover:text-yellow-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tell us more (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              placeholder="What did you love about your order? Any suggestions?"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading || rating === 0 || !currentUser}
            className="w-full"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Feedback</span>
              </>
            )}
          </Button>

          {!currentUser && (
            <p className="text-center text-sm text-gray-500">
              Please login to submit feedback
            </p>
          )}
        </form>
      </Card>
    </motion.div>
  );
};

export default FeedbackForm;