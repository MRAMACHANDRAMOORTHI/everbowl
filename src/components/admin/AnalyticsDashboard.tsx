import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Star,
  Clock,
  Calendar
} from 'lucide-react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  averageRating: number;
  recentOrders: any[];
  topItems: any[];
}

const AnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    averageRating: 4.8,
    recentOrders: [],
    topItems: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch orders
        const ordersRef = collection(db, 'orders');
        const ordersSnapshot = await getDocs(ordersRef);
        const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Fetch users
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        
        // Fetch feedback
        const feedbackRef = collection(db, 'feedback');
        const feedbackSnapshot = await getDocs(feedbackRef);
        const feedbacks = feedbackSnapshot.docs.map(doc => doc.data());
        
        // Calculate analytics
        const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        const totalOrders = orders.length;
        const totalUsers = usersSnapshot.size;
        const averageRating = feedbacks.length > 0 
          ? feedbacks.reduce((sum, feedback) => sum + (feedback.rating || 0), 0) / feedbacks.length
          : 4.8;

        // Get recent orders
        const recentOrders = orders
          .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
          .slice(0, 5);

        setAnalytics({
          totalRevenue,
          totalOrders,
          totalUsers,
          averageRating,
          recentOrders,
          topItems: []
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${analytics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-500',
      change: '+12.5%'
    },
    {
      title: 'Total Orders',
      value: analytics.totalOrders.toString(),
      icon: ShoppingBag,
      color: 'from-blue-500 to-cyan-500',
      change: '+8.2%'
    },
    {
      title: 'Total Users',
      value: analytics.totalUsers.toString(),
      icon: Users,
      color: 'from-purple-500 to-indigo-500',
      change: '+15.3%'
    },
    {
      title: 'Average Rating',
      value: analytics.averageRating.toFixed(1),
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      change: '+0.2'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-emerald-600 font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-emerald-500" />
          Recent Orders
        </h3>
        <div className="space-y-4">
          {analytics.recentOrders.length > 0 ? (
            analytics.recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Order #{order.id?.slice(-6)}</p>
                  <p className="text-sm text-gray-600">
                    {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : 'Recent'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-600">₹{order.totalAmount || 0}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status || 'pending'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No orders yet</p>
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors duration-200">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span className="font-medium text-emerald-700">View Detailed Analytics</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-700">Export Reports</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
            <Star className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-700">Customer Insights</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;