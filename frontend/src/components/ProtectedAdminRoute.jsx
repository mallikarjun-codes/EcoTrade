import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";

const ProtectedAdminRoute = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  if (!isLoaded) {
    return <div>Loading permissions...</div>;
  }

  // 1. Check if signed in
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  // 2. Check if email matches Admin
  const userEmail = user.primaryEmailAddress?.emailAddress;
  
  if (userEmail !== adminEmail) {
    console.warn("Unauthorized Access Attempt blocked.");
    return <Navigate to="/" replace />;
  }

  // 3. If passed, render the Dashboard
  return children;
};

export default ProtectedAdminRoute;