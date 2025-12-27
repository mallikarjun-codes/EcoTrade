import React from 'react';
import { useUser } from "@clerk/clerk-react";
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <div className="p-10 text-center">Loading permissions...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  // --- HACKATHON DEMO MODE ---
  // STRICT SECURITY (Production):
  // const isAdmin = user.primaryEmailAddress.emailAddress === import.meta.env.VITE_ADMIN_EMAIL;
  
  // DEMO SECURITY (Hackathon):
  // We allow ANY logged-in user to be an Admin so Judges can test the dashboard.
  const isAdmin = true; 

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {/* Visual Indicator for Judges */}
      <div className="bg-yellow-400 text-black text-xs font-bold text-center py-1 px-2 fixed bottom-0 right-0 z-[9999] opacity-80 pointer-events-none rounded-tl-lg">
        🚧 DEMO ADMIN ACCESS ENABLED
      </div>
      {children}
    </>
  );
};

export default ProtectedAdminRoute;