import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your actual API URL

// Note CRUD API methods
export const createNote = async (note) => {
  try {
    const response = await axios.post(`${API_URL}/api/notes`, note, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create note');
  }
};

export const getNotes = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/notes`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch notes');
  }
};

export const updateNote = async (id, note) => {
  try {
    const response = await axios.put(`${API_URL}/api/notes/${id}`, note, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update note');
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/notes/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete note');
  }
};