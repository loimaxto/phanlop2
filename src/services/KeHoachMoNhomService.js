import { toast } from 'react-toastify';
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
    toast.error('Lỗi: ' + error.response?.data?.message);
    throw error;
  }
};

const updateKeHoachMoNhom = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/v1/ke-hoach-mo-nhom/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating Ke Hoach Mo Nhom:', error);
    toast.error('Lỗi: ' + error.response?.data?.message);
    return null;
  }
};

const deleteKeHoachMoNhom = async id => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/v1/ke-hoach-mo-nhom/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Ke Hoach Mo Nhom:', error);
    toast.error('Lỗi khi xóa kế hoạch mở nhóm');
    return null;
  }
};

const deletePhanCong = async id => {
  //hard delete
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/v1/phan-cong-giang-day/h/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Phan Cong:', error);
    toast.error('Lỗi khi xóa phân công');
    return null;
  }
};

const updatePhanCong = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/v1/phan-cong-giang-day/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating Phan Cong:', error);
    toast.error('Lỗi: ' + error.response?.data?.message || error.message);
    return null;
  }
};

const createPhanCong = async data => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/phan-cong-giang-day`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    console.error('Error creating Phan Cong:', error.response?.data?.message);
    toast.error('Lỗi khi tạo phân công\n' + error.response?.data?.message);
    return null;
  }
};

const searchKeHoachMoNhom = async (keyword, namHoc, maNganh = '') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/ke-hoach-mo-nhom`, {
      params: {
        keyword: keyword || null,
        namHoc: namHoc || null,
        maNganh: maNganh || null,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Ke Hoach Mo Nhom data:', error);
    throw error;
  }
};

const getTongHopKeHoachMoNhom = async namHoc => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/ke-hoach-mo-nhom/tongHopMauIn`, {
      params: {
        namHoc: namHoc,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Tong Hop Ke Hoach Mo Nhom data:', error);
    toast.error('Lỗi khi lấy tổng hợp kế hoạch mở nhóm');
    return null;
  }
};

export default {
  getById,
  searchKeHoachMoNhom,
  createKeHoachMoNhom,
  updateKeHoachMoNhom,
  deleteKeHoachMoNhom,
  deletePhanCong,
  updatePhanCong,
  createPhanCong,
  getTongHopKeHoachMoNhom,
};
