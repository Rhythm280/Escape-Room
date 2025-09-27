import axios from 'axios';

const API_URL = 'http://localhost:8080/game';

const getNextPuzzle = (roomId) => {
    return axios.get(`${API_URL}/rooms/${roomId}/puzzle`);
};

const submitAnswer = (puzzleId, answer) => {
    return axios.post(`${API_URL}/puzzles/${puzzleId}/submit`, { answer });
};

export default {
    getNextPuzzle,
    submitAnswer,
};