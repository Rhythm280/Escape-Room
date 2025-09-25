import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import gameService from '../services/gameService';
import toast from 'react-hot-toast';

const GamePage = () => {
    const { gameState, setGameState } = useAuth();
    const [puzzle, setPuzzle] = useState(null);
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(true);

    // --- DIAGNOSTIC LOG ---
    console.log('Current gameState from context:', gameState);

    const fetchPuzzle = async () => {
        if (!gameState || !gameState.currentRoomId) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const response = await gameService.getNextPuzzle(gameState.currentRoomId);
            setPuzzle(response.data.data); // The puzzle data is nested in the response
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch puzzle.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPuzzle();
    }, [gameState]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!puzzle || !puzzle.id) return;

        try {
            const response = await gameService.submitAnswer(puzzle.id, answer);
            const result = response.data.data;

            if (result.correct) {
                toast.success(result.message);
                setAnswer(''); // Clear the input field
                fetchPuzzle(); // Fetch the next puzzle
            } else if (result.nextRoomId) {
                // Room is complete, a transition is needed
                toast.success(result.message);
                setAnswer('');
                // A simple reload is an easy way to get the latest gameState from the backend after a room transition
                window.location.reload(); 
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit answer.");
            console.error(error);
        }
    };

    if (loading) {
        return <div>Loading your next challenge...</div>;
    }

    if (!gameState || !gameState.currentRoomId) {
        return <div>Could not load game. Please try logging out and back in. If the problem persists, try registering a new user.</div>;
    }

    if (!puzzle) {
        return <div>No puzzle available. You may have completed the game!</div>;
    }

    return (
        <div>
            <h1>The Escape Room</h1>
            <h2>Current Puzzle:</h2>
            <p style={{ fontSize: '1.2em', margin: '20px' }}>{puzzle.question}</p>
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter your answer"
                    required
                />
                <button type="submit">Submit Answer</button>
            </form>
        </div>
    );
};

export default GamePage;

