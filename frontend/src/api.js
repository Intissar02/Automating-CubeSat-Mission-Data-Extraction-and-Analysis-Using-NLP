import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const fetchMissionDescription = async () => {
    const response = await axios.get(`${API_URL}/mission-description/`);
    return response.data;
};

export const fetchMissionsTechnology = async () => {
    const response = await axios.get(`${API_URL}/missions-technology/`);
    return response.data;
};