import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav>
            <Link to={user ? (user.roles.includes('ADMIN') ? '/admin' : '/dashboard') : '/'}>
                Escape Room
            </Link>
            <div>
                {user ? (
                    <>
                        <span>Welcome, {user.username}!</span>
                        {user.roles && user.roles.includes('PLAYER') && (
                            <Link to="/dashboard">Dashboard</Link>
                        )}
                        {user.roles && user.roles.includes('ADMIN') && (
                            <Link to="/admin">Admin Panel</Link>
                        )}
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;