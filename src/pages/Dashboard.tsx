// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { ShoppingBag, MapPin, Star, User, Clock, Heart } from 'lucide-react';
import { Layout } from '../components/common/Layout';
import { Card } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { userProfile, currentUser } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'orders'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(fetchedOrders);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const dashboardItems = [
    {
      icon: ShoppingBag,
      title: 'My Orders',
      description: 'View your order history and track current orders',
      color: 'from-emerald-500 to-teal-500',
      count: orders.length,
      route: '/my-orders'
    },
    {
      icon: MapPin,
      title: 'Update Address',
      description: 'Manage your delivery addresses',
      color: 'from-blue-500 to-cyan-500',
      route: '/update-address'
    },
    {
      icon: Heart,
      title: 'Favorite Dishes',
      description: 'Your reviewed and Favorite dishes',
      color: 'from-pink-500 to-red-500',
      route: '/favorites'
    },
    {
      icon: User,
      title: 'Profile Settings',
      description: 'Update your personal information',
      color: 'from-purple-500 to-indigo-500',
      route: '/profile-settings'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="pt-16">
        <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
              Welcome back, <span className="text-emerald-600">{userProfile?.name}!</span> 👋
            </h1>
            <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
              Manage your account and track your healthy journey with Ever Bowl
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {dashboardItems.map((item, index) => (
                <Card
                  key={index}
                  hover
                  className="p-6 h-full cursor-pointer"
                  onClick={() => item.route && navigate(item.route)}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    {item.count !== undefined && (
                      <span className="bg-emerald-100 text-emerald-800 text-sm font-medium px-2 py-1 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.slice(0, 5).map((order, index) => (
                  <Card key={order.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Order #{order.id.slice(-6)}</h3>
                          <p className="text-sm text-gray-600">
                            {order.items?.length || 0} items • ₹{order.totalAmount}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : 'Processing...'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status?.toUpperCase() || 'PENDING'}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600">Start your healthy journey by placing your first order!</p>
              </Card>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;