import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated, checkTokenValidity } = useAuthStore();
  
  // Check if tokens are still valid
  const isValidAuth = isAuthenticated && checkTokenValidity();
  
  return isValidAuth ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
