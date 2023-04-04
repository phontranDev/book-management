import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL
});

axiosInstance.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem('accessToken');
  request.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
