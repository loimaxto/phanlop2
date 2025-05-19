import axios from 'axios';

import { API_BASE_URL } from '../config/apiConfig';

const getAll = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/hoc-phan`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Hoc Phan data:', error);
    return null;
  }
};
const getById = async id => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/hoc-phan/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Hoc Phan data:', error);
    return null;
  }
};
const createHocPhan = async hocPhanData => 
{
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/hoc-phan`, hocPhanData);
    return response.data;
  } catch (error) {
    console.log("test",error['response'])
    console.log("test")
    console.error('Error create Hoc Phan data: không đọc được error from be', error);
    
    return null;
  }
};
const updateHocPhan = async (hocPhanData,hocPhanId) => 
{
  try {
    const response = await axios.put(`${API_BASE_URL}/api/v1/hoc-phan/${hocPhanId}`, hocPhanData);
    return response.data;
  } catch (error) {
    console.log("test",error['response'])
    console.error('Error create Hoc Phan data: không đọc được error from be', error);
    
    return null;
  }
};
const deleteHocPhan = async (hocPhanId) => 
{
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/v1/hoc-phan/${hocPhanId}`);
    return response.data;
  } catch (error) {
    console.log("test",error['response'])
    console.error('Error create Hoc Phan data: không đọc được error from be', error);
    
    return null;
  }
};
export default {
  getAll,
  getById,
  createHocPhan,
  updateHocPhan,
  deleteHocPhan,
};
