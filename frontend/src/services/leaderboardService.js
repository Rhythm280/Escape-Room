import axios from 'axios';

const API_URL = 'http://localhost:8080/api/leaderboard';

/**
 * Fetches the leaderboard data for a specific room.
 * This is a public endpoint, so no auth token is needed.
 * @param {number} roomId - The ID of the room.
 */
const getLeaderboard = (roomId) => {
    return axios.get(`${API_URL}/${roomId}`);
};

export default {
    getLeaderboard,
};