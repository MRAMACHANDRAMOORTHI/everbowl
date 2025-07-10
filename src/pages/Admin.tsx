import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  DollarSign,
  Star,
  Clock,
  Mail
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import OrdersPanel from '../components/admin/OrdersPanel';
import MenuManagement from '../components/admin/MenuManagement';
import UserManagement from '../components/admin/UserManagement';
import FeedbackPanel from '../components/admin/FeedbackPanel';
import AnalyticsDashboard from '../components/admin/AnalyticsDashboard';
import ContactMessages from '../components/admin/ContactMessages';

const Admin: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('analytics');

  if (!currentUser || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const tabs = [
  { id: 'analytics', name: 'Analytics', icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
  { id: 'orders', name: 'Orders', icon: ShoppingBag, color: 'from-emerald-500 to-teal-500' },
  { id: 'menu', name: 'Menu', icon: Plus, color: 'from-purple-500 to-indigo-500' },
  { id: 'users', name: 'Users', icon: Users, color: 'from-orange-500 to-red-500' },
  { id: 'feedback', name: 'Feedback', icon: MessageSquare, color: 'from-pink-500 to-rose-500' },
  { id: 'contact', name: 'Contact', icon: Mail, color: 'from-green-500 to-emerald-500' }, // ✅ Added
];


  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'orders':
        return <OrdersPanel />;
      case 'menu':
        return <MenuManagement />;
      case 'users':
        return <UserManagement />;
      case 'feedback':
        return <FeedbackPanel />;
        case 'contact':
      return <ContactMessages />;
      default:
        return <AnalyticsDashboard />;
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Admin Dashboard 👨‍🍳
          </h1>
          <p className="text-gray-600 text-center">
            Manage your Ever Bowl restaurant with full control
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-md`
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;