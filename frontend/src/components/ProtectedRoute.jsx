import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * This component protects routes that require authentication.
 * If a user is not logged in, it redirects them to the /login page.
 * Otherwise, it renders the child route.
 */
const ProtectedRoute = () => {
    const { user } = useAuth();

    if (!user) {
        // User is not authenticated, redirect to login
        return <Navigate to="/login" />;
    }

    // User is authenticated, render the requested page
    return <Outlet />;
};

export default ProtectedRoute;
