import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  MapPin, 
  Mail, 
  Calendar,
  ShoppingBag,
  Heart
} from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { User } from '../../types';

interface UserWithStats extends User {
  orderCount: number;
  totalSpent: number;
  joinDate: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch users
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));

      // Fetch orders to calculate stats
      const ordersRef = collection(db, 'orders');
      const ordersSnapshot = await getDocs(ordersRef);
      const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Calculate user stats
      const usersWithStats: UserWithStats[] = usersData.map(user => {
        const userOrders = orders.filter(order => order.userId === user.id);
        const totalSpent = userOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        
        return {
          ...user,
          orderCount: userOrders.length,
          totalSpent,
          joinDate: new Date().toLocaleDateString() // You can store actual join date in user document
        };
      });

      setUsers(usersWithStats);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              <p className="text-gray-600">Total Users</p>
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
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {users.reduce((sum, user) => sum + user.orderCount, 0)}
              </p>
              <p className="text-gray-600">Total Orders</p>
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
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ₹{users.reduce((sum, user) => sum + user.totalSpent, 0).toLocaleString()}
              </p>
              <p className="text-gray-600">Total Revenue</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{user.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Joined: {user.joinDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-3">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <span className="text-sm text-gray-600">
                      {user.favoriteItems?.length || 0} favorite items
                    </span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 lg:text-right">
                  <div className="bg-emerald-50 px-4 py-2 rounded-lg">
                    <p className="text-sm text-emerald-600 font-medium">Orders</p>
                    <p className="text-xl font-bold text-emerald-700">{user.orderCount}</p>
                  </div>
                  <div className="bg-blue-50 px-4 py-2 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Total Spent</p>
                    <p className="text-xl font-bold text-blue-700">₹{user.totalSpent}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;