import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(user.roles.includes('ADMIN') ? '/admin' : '/dashboard');
        }
    }, [user, navigate]);

    return (
        <div className="text-center mt-20 fade-in">
            <h1>Escape Room Challenge</h1>
            <p className="text-lg text-gray-400 mb-8">Solve puzzles, challenge your mind, and escape if you can.</p>
            <div className="button-group">
                <Link to="/login">
                    <button className="btn-primary">Login</button>
                </Link>
                <Link to="/register">
                    <button className="btn-secondary">Register</button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;