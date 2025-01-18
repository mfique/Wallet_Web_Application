import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const login = (email, password) => axios.post(`${API_URL}/auth/login`, { email, password });
export const register = (email, password) => axios.post(`${API_URL}/auth/register`, { email, password });
