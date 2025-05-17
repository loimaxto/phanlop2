import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';
import { toast } from 'react-toastify';

const getChiTietThongTinChungById = async id => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/ke-hoach-day-hoc/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Ke Hoach Day Hoc data:', error);
    toast.error('Lỗi khi lấy dữ liệu ngành học');
    return null;
  }
};

const addKeHoachDayHoc = async data => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/ke-hoach-day-hoc`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding Ke Hoach Day Hoc:', error);
    toast.error('Lỗi khi thêm kế hoạch dạy học');
    return null;
  }
};

const updateKeHoachDayHoc = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/v1/ke-hoach-day-hoc/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating Ke Hoach Day Hoc:', error);
    toast.error('Lỗi khi cập nhật kế hoạch dạy học');
    return null;
  }
};

const deleteKeHoachDayHoc = async id => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/v1/ke-hoach-day-hoc/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Ke Hoach Day Hoc:', error);
    toast.error('Lỗi khi xóa kế hoạch dạy học');
    return null;
  }
};

const addKhoiKienThuc = async data => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/khoi-kien-thuc`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding Khoi Kien Thuc:', error);
    toast.error('Lỗi khi thêm khối kiến thức');
    return null;
  }
};

const updateKhoiKienThuc = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/v1/khoi-kien-thuc/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating Khoi Kien Thuc:', error);
    toast.error('Lỗi khi cập nhật khối kiến thức');
    return null;
  }
};

const deleteKhoiKienThuc = async id => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/v1/khoi-kien-thuc/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Khoi Kien Thuc:', error);
    toast.error('Lỗi khi xóa khối kiến thức');
    return null;
  }
};

const addNhomKienThuc = async data => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/nhom-kien-thuc`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding Nhom Kien Thuc:', error);
    toast.error('Lỗi khi thêm nhóm kiến thức');
    return null;
  }
};

const updateNhomKienThuc = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/v1/nhom-kien-thuc/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating Nhom Kien Thuc:', error);
    toast.error('Lỗi khi cập nhật nhóm kiến thức');
    return null;
  }
};

const deleteNhomKienThuc = async id => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/v1/nhom-kien-thuc/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Nhom Kien Thuc:', error);
    toast.error('Lỗi khi xóa nhóm kiến thức');
    return null;
  }
};

const getAllNhomKienThuc = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/nhom-kien-thuc`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Nhom Kien Thuc data:', error);
    toast.error('Lỗi khi lấy dữ liệu nhóm kiến thức');
    return null;
  }
};

const getAllKhoiKienThuc = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/khoi-kien-thuc`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Khoi Kien Thuc data:', error);
    toast.error('Lỗi khi lấy dữ liệu khối kiến thức');
    return null;
  }
};

export default {
  getChiTietThongTinChungById,
  getAllNhomKienThuc,
  getAllKhoiKienThuc,
  addKeHoachDayHoc,
  updateKeHoachDayHoc,
  deleteKeHoachDayHoc,
  addKhoiKienThuc,
  updateKhoiKienThuc,
  deleteKhoiKienThuc,
  addNhomKienThuc,
  updateNhomKienThuc,
  deleteNhomKienThuc,
};
