import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../config/apiConfig';

const API_URL = API_BASE_URL + '/api/v1/user';

const validateUser = (user, isCreate = false) => {
  if (!user.email) return 'Email là bắt buộc';
  if (!user.username) return 'Tên đăng nhập là bắt buộc';
  if (!user.role) return 'Vai trò là bắt buộc';
  if (isCreate && !user.password) return 'Mật khẩu là bắt buộc';
  if (user.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) return 'Email không hợp lệ';
  if (user.soDienThoai && !/^\d{10,11}$/.test(user.soDienThoai))
    return 'Số điện thoại không hợp lệ';
  return null;
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return { success: true, data: response.data };
  } catch (error) {
    toast.error('Lỗi khi lấy danh sách người dùng');
    return { success: false, error };
  }
};

export const findUsersByKeyword = async keyword => {
  try {
    console.log(keyword);
    const response = await axios.get(API_URL, {
      params: {
        keyword,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    toast.error('Lỗi khi lấy danh sách người dùng');
    return { success: false, error };
  }
};

export const createUser = async user => {
  const validationError = validateUser(user, true);
  if (validationError) {
    toast.error(validationError);
    return { success: false, error: validationError };
  }
  try {
    const response = await axios.post(API_URL, user);
    toast.success('Tạo người dùng thành công');
    return { success: true, data: response.data };
  } catch (error) {
    toast.error('Lỗi khi tạo người dùng');
    return { success: false, error };
  }
};

export const updateUser = async (id, user) => {
  const validationError = validateUser(user);
  if (validationError) {
    toast.error(validationError);
    return { success: false, error: validationError };
  }
  try {
    const response = await axios.put(`${API_URL}/${id}`, user);
    toast.success('Cập nhật người dùng thành công');
    return { success: true, data: response.data };
  } catch (error) {
    toast.error('Lỗi khi cập nhật người dùng');
    return { success: false, error };
  }
};

export const deleteUser = async id => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    toast.success('Xóa người dùng thành công');
    return { success: true };
  } catch (error) {
    toast.error('Lỗi khi xóa người dùng');
    return { success: false, error };
  }
};
