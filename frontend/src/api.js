import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // <--- WE ADDED /api HERE
});

export const fetchProjects = () => API.get('/projects');
export const createOrder = (orderData) => API.post('/orders', orderData);

export default API;