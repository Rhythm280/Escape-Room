import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [rooms, setRooms] = useState([]);
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form states
    const [newRoomName, setNewRoomName] = useState('');
    const [newRoomDesc, setNewRoomDesc] = useState('');
    const [newRoomOrder, setNewRoomOrder] = useState(0);
    const [newPuzzleRoomId, setNewPuzzleRoomId] = useState('');
    const [newPuzzleQuestion, setNewPuzzleQuestion] = useState('');
    const [newPuzzleAnswer, setNewPuzzleAnswer] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const [roomsRes, playersRes] = await Promise.all([
                adminService.getAllRooms(),
                adminService.getAllPlayers(),
            ]);
            setRooms(roomsRes.data.data);
            setPlayers(playersRes.data.data);
        } catch (error) {
            toast.error("Failed to fetch admin data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        try {
            await adminService.createRoom({ name: newRoomName, description: newRoomDesc, orderIndex: newRoomOrder });
            toast.success("Room created successfully!");
            setNewRoomName(''); setNewRoomDesc(''); setNewRoomOrder(0);
            fetchData();
        } catch (error) {
            toast.error("Failed to create room. Order Index might already exist.");
        }
    };

    const handleCreatePuzzle = async (e) => {
        e.preventDefault();
        if (!newPuzzleRoomId) {
            toast.error("Please select a room.");
            return;
        }
        try {
            await adminService.createPuzzle(newPuzzleRoomId, { question: newPuzzleQuestion, answer: newPuzzleAnswer });
            toast.success("Puzzle created successfully!");
            setNewPuzzleQuestion(''); setNewPuzzleAnswer('');
            fetchData();
        } catch (error) {
            toast.error("Failed to create puzzle.");
        }
    };

    const handleDeletePlayer = async (userId) => {
        if (window.confirm("Are you sure you want to delete this player? This will also remove their leaderboard scores.")) {
            try {
                await adminService.deletePlayer(userId);
                toast.success("Player deleted successfully!");
                fetchData();
            } catch (error) {
                toast.error("Failed to delete player.");
            }
        }
    };

    if (loading) {
        return <div>Loading dashboard...</div>;
    }

    return (
        <div className="space-y-8 fade-in">
            <h1>Admin Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card">
                    <h3>Create New Room</h3>
                    <form onSubmit={handleCreateRoom}>
                        <input type="text" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)} placeholder="Room Name" required />
                        <input type="text" value={newRoomDesc} onChange={(e) => setNewRoomDesc(e.target.value)} placeholder="Description" required />
                        <input type="number" value={newRoomOrder} onChange={(e) => setNewRoomOrder(parseInt(e.target.value))} placeholder="Order Index" required />
                        <button type="submit" className="btn-primary">Create Room</button>
                    </form>
                </div>
                <div className="card">
                    <h3>Create New Puzzle</h3>
                    <form onSubmit={handleCreatePuzzle}>
                        <select value={newPuzzleRoomId} onChange={(e) => setNewPuzzleRoomId(e.target.value)} required>
                            <option value="">-- Select a Room --</option>
                            {rooms.map(room => <option key={room.id} value={room.id}>{room.name}</option>)}
                        </select>
                        <input type="text" value={newPuzzleQuestion} onChange={(e) => setNewPuzzleQuestion(e.target.value)} placeholder="Puzzle Question" required />
                        <input type="text" value={newPuzzleAnswer} onChange={(e) => setNewPuzzleAnswer(e.target.value)} placeholder="Puzzle Answer" required />
                        <button type="submit" className="btn-primary">Create Puzzle</button>
                    </form>
                </div>
            </div>

            <div className="card">
                <h2>Manage Players ({players.length})</h2>
                <ul className="space-y-2">
                    {players.map(player => (
                        <li key={player.id} className="flex justify-between items-center">
                            <span>{player.username} ({player.email})</span>
                            <button onClick={() => handleDeletePlayer(player.id)} className="btn-danger">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="card">
                <h2>Existing Rooms & Puzzles</h2>
                <div className="space-y-4">
                    {rooms.sort((a, b) => a.orderIndex - b.orderIndex).map(room => (
                        <div key={room.id}>
                            <h4 className="font-bold">{room.name} (Order: {room.orderIndex})</h4>
                            <ul className="list-disc list-inside ml-4 text-gray-400">
                                {room.puzzles && room.puzzles.length > 0 ? (
                                    room.puzzles.map(puzzle => (
                                        <li key={puzzle.id}>{puzzle.question}</li>
                                    ))
                                ) : (
                                    <li>No puzzles in this room yet.</li>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;