import axios from 'axios';

import { API_BASE_URL } from '../config/apiConfig';



const getDeCuongByHocPhanId = async id => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/de-cuong-chi-tiet/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Hoc Phan data:', error);
    return null;
  }
};
const create = async deCuongData => 
{
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/de-cuong-chi-tiet`, deCuongData);
    return response.data;
  } catch (error) {
    console.log("test",error['response'])
    console.log("test")
    console.error('Error create Hoc Phan data: không đọc được error from be', error);
    
    return null;
  }
};
const updateDeCuong = async (deCuongData,hocPhanId) => 
{
  try {
    const response = await axios.put(`${API_BASE_URL}/api/v1/de-cuong-chi-tiet/${hocPhanId}`, deCuongData);
    return response.data;
  } catch (error) {
    console.log("test",error['response'])
    console.error('Error edit Hoc Phan data: không đọc được error from be', error);
    
    return null;
  }
};
const deleteDeCuong = async (hocPhanId) => 
{
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/v1/de-cuong-chi-tiet/${hocPhanId}`);
    return response.data;
  } catch (error) {
    console.log("test",error['response'])
    console.error('Error delete Hoc Phan data', error);
    
    return null;
  }
};
export default {
  getDeCuongByHocPhanId,
  create,
  updateDeCuong,
  deleteDeCuong,
};
