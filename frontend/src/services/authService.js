import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your actual API URL

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.get(`${API_URL}/api/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};