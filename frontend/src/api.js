import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchProjects = () => API.get('/projects');
export const createOrder = (orderData) => API.post('/orders', orderData);
export const fetchStats = () => API.get('/stats');
export const fetchRegistry = () => API.get('/registry'); // <--- NEW

export default API;