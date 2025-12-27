import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: BASE_URL,
});

export const fetchProjects = () => API.get('/projects');
export const createOrder = (orderData) => API.post('/orders', orderData);
export const fetchStats = () => API.get('/stats');
export const fetchRegistry = () => API.get('/registry'); 

export default API;