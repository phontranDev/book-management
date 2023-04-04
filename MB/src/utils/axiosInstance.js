import axios from 'axios';

const baseUrl = `http://localhost:8080/api`;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => config,
  error =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong',
    ),
);

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(
      (error.response && error.response.data) || 'Something went wrong',
    );
  },
);

export default axiosInstance;
