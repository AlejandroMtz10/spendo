import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Use the base URL from .env
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Using cookies or sessions de Laravel Sanctum
});

export default api;