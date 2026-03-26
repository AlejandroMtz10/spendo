import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Use the base URL from .env
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor for attaching the token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        
        if (token) {
            const cleanToken = token.trim();
            config.headers.Authorization = `Bearer ${cleanToken}`;
            console.log("Token:", cleanToken);
        }
        
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;