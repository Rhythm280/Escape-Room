import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { user } = useAuth();

    if (!user || !user.roles.includes('ADMIN')) {
        return <Navigate to="/home" />;
    }

    return <Outlet />;
};

export default AdminRoute;