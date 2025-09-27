import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import GamePage from '../pages/GamePage.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import AdminRoute from '../components/AdminRoute.jsx';
import AdminDashboard from '../pages/AdminDashboard.jsx';
import PlayerDashboard from '../pages/PlayerDashboard.jsx';
import LeaderboardPage from '../pages/LeaderboardPage.jsx'; // Import the new page

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            // Public routes
            { index: true, element: <LandingPage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "leaderboard/:roomId", element: <LeaderboardPage /> }, // New dynamic route

            // Protected routes for players
            {
                element: <ProtectedRoute />,
                children: [
                    { path: "dashboard", element: <PlayerDashboard /> },
                    { path: "home", element: <GamePage /> },
                ],
            },
            
            // Protected routes for admins
            {
                element: <AdminRoute />,
                children: [
                    { path: "admin", element: <AdminDashboard /> },
                ],
            },
        ],
    },
]);

export default router;