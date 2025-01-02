import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, requireVerification = false, allowedRoles = [] }) => {
  const { user } = useSelector((state) => state.auth);

  // Redirect to login if the user is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Allow access to the verification page for unverified users if required
  if (requireVerification && !user.isVerified) {
    return children;
  }

  // Redirect unverified users to the verification page for other protected pages
  if (!requireVerification && !user.isVerified) {
    return <Navigate to="/verify" replace />;
  }

  // Check if the user's role is allowed for the specific route
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to respective dashboard based on user role
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} replace />;
  }

  // Render the protected content
  return children;
};

export default PrivateRoute;
