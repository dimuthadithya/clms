import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../routes/constants';

function ProtectedRoute({ children, requiredRoles = [] }) {
  const { currentUser, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='flex flex-col items-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
          <p className='mt-4 text-gray-600'>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to signin if not authenticated
  if (!currentUser) {
    return <Navigate to={ROUTES.SIGNIN} replace />;
  }

  // Role-based access control (if roles are specified)
  if (requiredRoles.length > 0) {
    const userRole = currentUser.role || 'student'; // Default to student if no role set

    if (!requiredRoles.includes(userRole)) {
      // Redirect to dashboard if user doesn't have required role
      return <Navigate to='/dashboard' replace />;
    }
  }

  // User is authenticated and has required role
  return children;
}

export default ProtectedRoute;
