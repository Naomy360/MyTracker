import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://mytracker-backend.onrender.com/api', 
  // ✅ Replace with your actual Render backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default API;
