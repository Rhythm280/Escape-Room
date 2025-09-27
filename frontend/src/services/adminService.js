import axios from 'axios';

const API_URL = 'http://localhost:8080/admin';

// Room Management
const getAllRooms = () => axios.get(`${API_URL}/rooms`);
const createRoom = (roomData) => axios.post(`${API_URL}/rooms`, roomData);
const deleteRoom = (roomId) => axios.delete(`${API_URL}/rooms/${roomId}`);

// Puzzle Management
const getAllPuzzles = () => axios.get(`${API_URL}/puzzles`);
const createPuzzle = (roomId, puzzleData) => axios.post(`${API_URL}/rooms/${roomId}/puzzles`, puzzleData);
const deletePuzzle = (puzzleId) => axios.delete(`${API_URL}/puzzles/${puzzleId}`);

// Player Management
const getAllPlayers = () => axios.get(`${API_URL}/players`);
const deletePlayer = (userId) => axios.delete(`${API_URL}/players/${userId}`);

export default {
    getAllRooms,
    createRoom,
    deleteRoom,
    getAllPuzzles,
    createPuzzle,
    deletePuzzle,
    getAllPlayers,
    deletePlayer,
};