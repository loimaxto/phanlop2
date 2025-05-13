import axiosInstance from '@config/customAxios'

// Lấy danh sách thông tin chung (GET)
export const getListThongTinChung = async (params = {}) => {
    try {
        const response = await axiosInstance.get('/api/v1/thong-tin-chung', { params })
        return response.data
    } catch (error) {
        throw error
    }
}

// Tạo mới thông tin chung (POST)
export const createThongTinChung = async (data) => {
    try {
        const response = await axiosInstance.post('/api/v1/thong-tin-chung', data)
        return response.data
    } catch (error) {
        throw error
    }
}

// Lấy thông tin chung theo ID (GET)
export const getThongTinChungById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/v1/thong-tin-chung/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

// Cập nhật thông tin chung (PUT hoặc PATCH)
export const updateThongTinChung = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/api/v1/thong-tin-chung/${id}`, data)
        return response.data
    } catch (error) {
        throw error
    }
}

// Xoá thông tin chung (DELETE)
export const deleteThongTinChung = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/thong-tin-chung/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getChuongTrinhKhungByThongTinChungId = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/v1/thong-tin-chung/get-chuong-trinh-khung/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}