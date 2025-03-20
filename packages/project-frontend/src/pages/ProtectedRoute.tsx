import React from 'react';
import { Navigate, Outlet } from 'react-router';

interface ProtectedRouteProps {
  authToken: string;  // Ensure the authToken is passed as a string
}

export function ProtectedRoute({ authToken }: ProtectedRouteProps) {
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
