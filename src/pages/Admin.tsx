import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import AnalyticsDashboard from '../components/admin/AnalyticsDashboard';
import OrdersPanel from '../components/admin/OrdersPanel';
import UserManagement from '../components/admin/UserManagement';
import MenuManagement from '../components/admin/MenuManagement';
import FeedbackPanel from '../components/admin/FeedbackPanel';
import ContactMessages from '../components/admin/ContactMessages';
import { BarChart3, Mail, MessageSquare, Plus, ShoppingBag, Users } from 'lucide-react';

const Admin: React.FC = () => {
  const { currentUser, isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('analytics');
  const navigate = useNavigate();

  if (!currentUser || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const tabs = [
    { id: 'analytics', name: 'Analytics', icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
    { id: 'orders', name: 'Orders', icon: ShoppingBag, color: 'from-emerald-500 to-teal-500' },
    { id: 'menu', name: 'Menu', icon: Plus, color: 'from-purple-500 to-indigo-500' },
    { id: 'users', name: 'Users', icon: Users, color: 'from-orange-500 to-red-500' },
    { id: 'feedback', name: 'Feedback', icon: MessageSquare, color: 'from-pink-500 to-rose-500' },
    { id: 'contact', name: 'Contact', icon: Mail, color: 'from-green-500 to-emerald-500' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics': return <AnalyticsDashboard />;
      case 'orders': return <OrdersPanel />;
      case 'menu': return <MenuManagement />;
      case 'users': return <UserManagement />;
      case 'feedback': return <FeedbackPanel />;
      case 'contact': return <ContactMessages />;
      default: return <AnalyticsDashboard />;
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 relative">
      {/* ✅ Admin Logout Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium shadow transition-all"
        >
          Logout
        </button>
      </div>

      {/* Admin Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Admin Dashboard 👨‍🍳
        </h1>
        <p className="text-gray-600 text-center">
          Manage your Ever Bowl restaurant with full control
        </p>

        {/* Admin Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-md`
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Admin Content */}
        <div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
