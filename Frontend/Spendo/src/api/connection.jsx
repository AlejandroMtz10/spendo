import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Use the base URL from .env
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Interceptor for attaching the token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // retrieve token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;