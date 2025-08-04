import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mytracker-rsxn.onrender.com/api',
});

export default API;
