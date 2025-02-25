import axios, { InternalAxiosRequestConfig } from 'axios';

const getAccessToken = (): string | null => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      return token || '';
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      return '';
    }
  }
  return '';
};

const PrivateAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URI,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

PrivateAxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return {
      ...config,
      withCredentials: false,
    };
  },
  (error) => Promise.reject(error),
);

export default PrivateAxiosInstance;
