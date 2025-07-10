// src/components/AdminRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isAdmin, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return currentUser && isAdmin ? children : <Navigate to="/dashboard" />;
};

export default AdminRoute;
