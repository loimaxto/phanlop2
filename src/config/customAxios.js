import axios from 'axios';

// Tạo instance riêng
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8080', // Thay đổi base URL theo project
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor: xử lý lỗi
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                console.warn('Unauthorized, redirecting to login...');
                // window.location.href = '/login'; (nếu cần)
            } else if (status === 500) {
                console.error('Server error.');
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
