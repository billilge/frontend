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

const PublicAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URI,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`,
  },
  withCredentials: true,
});

PublicAxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    const newConfig = {
      ...config,
      withCredentials: false,
    };

    if (token) {
      newConfig.headers.set('Authorization', `Bearer ${token}`);
    }

    return newConfig;
  },
  (error) => Promise.reject(error),
);
export default PublicAxiosInstance;
