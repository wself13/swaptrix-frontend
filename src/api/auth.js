import axios from 'axios';

const API = axios.create({
  baseURL: 'https://swaptrix-backend.onrender.com/api',
  withCredentials: true
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const verifyEmail = (token) => API.get(`/auth/verify/${token}`);