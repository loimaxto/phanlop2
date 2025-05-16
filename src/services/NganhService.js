import axiosInstance from '@config/customAxios'

// Lấy danh sách thông tin chung (GET)
export const getListNganh = async (params = {}) => {
    try {
        const response = await axiosInstance.get('/api/v1/nganh', { params })
        return response.data
    } catch (error) {
        throw error
    }
}

export const getListAll = async () => {
  const res = await axiosInstance.get('/api/v1/nganh/get-list');
  return res.data.data; 
};


// Tạo mới thông tin chung (POST)
export const createNganh = async (data) => {
    try {
        const response = await axiosInstance.post('/api/v1/nganh', data)
        return response.data
    } catch (error) {
        throw error
    }
}

// Lấy thông tin chung theo ID (GET)
export const getNganhById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/v1/nganh/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

// Cập nhật thông tin chung (PUT hoặc PATCH)
export const updateNganh = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/api/v1/nganh/${id}`, data)
        return response.data
    } catch (error) {
        throw error
    }
}

// Xoá thông tin chung (DELETE)
export const deleteNganh = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/nganh/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}
