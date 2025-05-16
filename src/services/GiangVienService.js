import axiosInstance from '@config/customAxios';

// Lấy danh sách giảng viên, có thể truyền params để lọc, tìm kiếm
export const getGiangVienList = async (params = {}) => {
  const response = await axiosInstance.get('/api/giangvien', { params });
  return response.data;
};

// Lấy các nhóm dạy của giáo viên
export const getPhanCongByGiangVienId = async (id) => {
  const response = await axiosInstance.get(`/api/phanconggiangday/${id}`);
  return response.data;
};

// Lấy thông tin giảng viên theo ID
export const getGiangVienById = async (id) => {
  const response = await axiosInstance.get(`/api/giangvien/${id}`);
  return response.data;
};

// Tạo mới giảng viên (POST)
export const createGiangVien = async (data) => {
  const response = await axiosInstance.post('/api/giangvien', data);
  return response.data;
};

// Cập nhật toàn bộ giảng viên theo ID (PUT)
export const updateGiangVien = async (id, data) => {
  const response = await axiosInstance.put(`/api/giangvien/${id}`, data);
  return response.data;
};

// Cập nhật một phần thông tin giảng viên (PATCH)
export const patchGiangVien = async (id, data) => {
  const response = await axiosInstance.patch(`/api/giangvien/${id}`, data);
  return response.data;
};

// Xoá giảng viên theo ID (PUT xoá mềm)
export const deleteGiangVien = async (id) => {
  const response = await axiosInstance.put(`/api/giangvien/delete/${id}`);
  return response.data;
};

// Tìm kiếm giảng viên theo tên
export const searchGiangVien = async (ten) => {
  const response = await axiosInstance.get(`/api/giangvien/search/${encodeURIComponent(ten)}`);
  return response.data;
};

// Lấy danh sách giảng viên theo khoa
export const getGiangVienByKhoa = async (khoa) => {
  const response = await axiosInstance.get(`/api/giangvien/by-khoa/${encodeURIComponent(khoa)}`);
  return response.data;
};

// Lấy thông tin user
export const getuser = async () => {
  const response = await axiosInstance.get(`/api/user_gv`);
  return response.data;
};
