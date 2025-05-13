import { API_BASE_URL } from '../config/apiConfig';
import axios from 'axios';

const getById = async id => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/ke-hoach-mo-nhom/1`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Ke Hoach Mo Nhom data:', error);
    throw error;
  }
};

const createKeHoachMoNhom = async data => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/ke-hoach-mo-nhom`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating Ke Hoach Mo Nhom:', error);
    throw error;
  }
};

const getAll = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/ke-hoach-mo-nhom`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Ke Hoach Mo Nhom data:', error);
    throw error;
  }
};

export default {
  getById,
  getAll,
  createKeHoachMoNhom,
};
