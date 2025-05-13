import axios from 'axios';

import { API_BASE_URL } from '../config/apiConfig';

const getAll = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/hoc-phan`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Hoc Phan data:', error);
    throw error;
  }
};
const getById = async id => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/hoc-phan/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Hoc Phan data:', error);
    throw error;
  }
};

export default {
  getAll,
  getById,
};
