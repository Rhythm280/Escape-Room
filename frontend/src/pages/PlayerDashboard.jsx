import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PlayerDashboard = () => {
    const { user, gameState, gameCompleted } = useAuth();

    const renderContent = () => {
        if (gameCompleted) {
            return (
                <>
                    <h2>Mission Complete!</h2>
                    <p>Congratulations on solving all the puzzles. Your legend is secure in the leaderboard.</p>
                </>
            );
        }

        if (!gameState || !gameState.currentRoomId) {
            return (
                <>
                    <h2>Ready to start your adventure?</h2>
                    <p>The first challenge awaits. Good luck, agent.</p>
                    <div className="button-group">
                        <Link to="/home">
                            <button className="btn-primary">Start Game</button>
                        </Link>
                    </div>
                </>
            );
        }

        return (
            <>
                <h2>Mission Status: In Progress</h2>
                <p>You are currently in Room {gameState.currentRoomId}.</p>
                <p>Ready to continue where you left off?</p>
                <div className="button-group">
                    <Link to="/home">
                        <button className="btn-primary">Continue Game</button>
                    </Link>
                    <Link to={`/leaderboard/${gameState.currentRoomId}`}>
                        <button className="btn-secondary">View Leaderboard</button>
                    </Link>
                </div>
            </>
        );
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="card max-w-2xl text-center fade-in">
                <h1>Welcome back, {user?.username}!</h1>
                {renderContent()}
            </div>
        </div>
    );
};

export default PlayerDashboard;