import axios, { InternalAxiosRequestConfig } from 'axios';

const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  const userInfo = localStorage.getItem('user');
  if (!userInfo) return '';

  try {
    const parsedUser = JSON.parse(userInfo);
    return parsedUser?.token || '';
  } catch (error) {
    console.error('Failed to parse userInfo from localStorage:', error);
    return '';
  }
};

const PrivateAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

PrivateAxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    const newConfig = { ...config, withCredentials: false };
    if (token) {
      newConfig.headers.set('Authorization', `Bearer ${token}`);
    }
    return newConfig;
  },
  (error) => Promise.reject(error),
);

export default PrivateAxiosInstance;
