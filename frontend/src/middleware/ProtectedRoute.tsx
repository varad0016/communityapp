// src/middleware/ProtectedRoute.tsx
import { useAuth } from '@/context/authContext';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // If the user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If authenticated, allow access to protected route
  return <>{children}</>;
};

export default ProtectedRoute;
