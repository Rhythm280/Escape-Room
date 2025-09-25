import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import GamePage from '../pages/GamePage.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx'; // Import the ProtectedRoute

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
            {
                // This route group now protects all its children
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "home",
                        element: <GamePage />,
                    },
                    // Add any other future protected routes here
                ],
            },
        ],
    },
]);

export default router;
