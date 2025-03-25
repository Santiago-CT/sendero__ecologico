// src/services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:4000/api'; 

// Registro de usuario
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// Inicio de sesión
const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

const authService = {
  register,
  login
};

export default authService;
