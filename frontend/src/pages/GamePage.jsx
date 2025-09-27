import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import gameService from '../services/gameService';
import toast from 'react-hot-toast';

const GamePage = () => {
    const { gameState, updateGameState, gameCompleted, markGameAsCompleted } = useAuth();
    
    const [puzzle, setPuzzle] = useState(null);
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(true);
    const [pageMessage, setPageMessage] = useState('');
    const [nextRoomId, setNextRoomId] = useState(null);

    const fetchPuzzle = async (roomId) => {
        if (gameCompleted) {
            setLoading(false);
            return;
        }
        if (!roomId) {
            setLoading(false);
            setPageMessage("Could not determine your current room. Please try registering a new user.");
            return;
        }

        setLoading(true);
        setPageMessage('');
        try {
            const response = await gameService.getNextPuzzle(roomId);
            const puzzleData = response.data.data;

            if (typeof puzzleData === 'object' && puzzleData !== null) {
                setPuzzle(puzzleData);
            } else {
                setPageMessage(puzzleData || "This room has no puzzles yet.");
                setPuzzle(null);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch puzzle.");
            setPageMessage("Error loading the game.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (gameState && gameState.currentRoomId) {
            fetchPuzzle(gameState.currentRoomId);
        } else if (!gameCompleted) {
            setLoading(false);
            setPageMessage("Could not find your current game progress.");
        }
    }, [gameState, gameCompleted]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!puzzle || !puzzle.id) return;

        try {
            const response = await gameService.submitAnswer(puzzle.id, answer);
            const result = response.data.data;

            if (result.correct === true) {
                toast.success(result.message);
                setAnswer('');
                fetchPuzzle(gameState.currentRoomId);
            } else if (result.nextRoomId) {
                toast.success(result.message, { duration: 4000 });
                setAnswer('');
                setNextRoomId(result.nextRoomId);
                setPuzzle(null);
                setPageMessage("Congratulations! You've completed the room!");
            } else if (result.message && result.message.includes("entire game")) {
                toast.success(result.message, { duration: 6000 });
                setAnswer('');
                markGameAsCompleted();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit answer.");
        }
    };

    const handleEnterNextRoom = () => {
        updateGameState({ currentRoomId: nextRoomId, currentPuzzleId: null });
        setNextRoomId(null);
    };

    if (loading) {
        return <div className="text-center mt-20 text-lg">Loading your next challenge...</div>;
    }

    if (gameCompleted) {
        return (
            <div className="card max-w-2xl mx-auto mt-10 text-center fade-in">
                <h1>Game Complete!</h1>
                <p>Congratulations! You have completed the entire game!</p>
            </div>
        );
    }
    
    if (nextRoomId) {
        return (
            <div className="card max-w-2xl mx-auto mt-10 text-center fade-in">
                <h2>{pageMessage}</h2>
                <button onClick={handleEnterNextRoom} className="btn-primary mt-4">Enter Next Room</button>
            </div>
        );
    }

    if (pageMessage) {
        return <div className="card max-w-2xl mx-auto mt-10 text-center fade-in">{pageMessage}</div>;
    }

    if (!puzzle) {
        return <div className="card max-w-2xl mx-auto mt-10 text-center fade-in">An unexpected error occurred. No puzzle could be loaded.</div>
    }

    return (
        <div className="card max-w-2xl mx-auto mt-10 fade-in">
            <h1 className="text-center">Active Puzzle</h1>
            <p className="text-xl text-center my-6 p-4 border border-dashed border-gray-600 bg-black rounded-md">{puzzle.question}</p>
            
            <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter your answer..."
                    required
                    className="flex-grow"
                />
                <button type="submit" className="btn-primary">Submit Answer</button>
            </form>
        </div>
    );
};

export default GamePage;