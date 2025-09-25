import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <nav>
            {user ? (
                // Links for logged-in users
                <>
                    <span>Welcome, {user.username}!</span> |{" "}
                    <Link to="/home">Home (Game)</Link> |{" "}
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                // Links for logged-out users
                <>
                    <Link to="/">Welcome</Link> |{" "}
                    <Link to="/login">Login</Link> |{" "}
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
