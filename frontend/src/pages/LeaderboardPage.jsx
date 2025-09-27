import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import leaderboardService from '../services/leaderboardService';
import toast from 'react-hot-toast';

const LeaderboardPage = () => {
    const { roomId } = useParams();
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await leaderboardService.getLeaderboard(roomId);
                setLeaderboard(response.data.data);
            } catch (error) {
                toast.error("Failed to fetch leaderboard data.");
            } finally {
                setLoading(false);
            }
        };

        if (roomId) {
            fetchLeaderboard();
        }
    }, [roomId]);

    if (loading) {
        return <div className="text-center mt-20 text-lg">Loading leaderboard...</div>;
    }

    return (
        <div className="card max-w-2xl mx-auto mt-10 fade-in">
            <h1 className="text-center">Leaderboard - Room {roomId}</h1>
            {leaderboard.length > 0 ? (
                <div className="mt-6">
                    <div className="grid grid-cols-3 gap-4 font-bold border-b-2 border-neon-green pb-2 mb-2">
                        <span>Rank</span>
                        <span>Agent</span>
                        <span className="text-right">Time (seconds)</span>
                    </div>
                    {leaderboard.map((entry, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 py-2 border-b border-gray-700">
                            <span>#{index + 1}</span>
                            <span>{entry.username}</span>
                            <span className="text-right">{entry.completionTimeSeconds}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center mt-6">No scores yet for this room. Be the first to set the record!</p>
            )}
            <div className="text-center mt-8">
                <Link to="/dashboard">
                    <button className="btn-secondary">Back to Dashboard</button>
                </Link>
            </div>
        </div>
    );
};

export default LeaderboardPage;