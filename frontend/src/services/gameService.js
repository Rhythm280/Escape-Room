import axios from 'axios';

const API_URL = 'http://localhost:8080/game';

/**
 * Fetches the next puzzle for a user in a specific room.
 * The auth token is automatically added by the interceptor in AuthContext.
 * @param {number} roomId - The ID of the room.
 */
const getNextPuzzle = (roomId) => {
    return axios.get(`${API_URL}/rooms/${roomId}/puzzle`);
};

/**
 * Submits an answer for a specific puzzle.
 * @param {number} puzzleId - The ID of the puzzle.
 * @param {string} answer - The user's submitted answer.
 */
const submitAnswer = (puzzleId, answer) => {
    return axios.post(`${API_URL}/puzzles/${puzzleId}/submit`, { answer });
};

export default {
    getNextPuzzle,
    submitAnswer,
};

