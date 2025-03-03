import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

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
  },
});

PrivateAxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (!token) {
      window.location.replace('/mobile/sign-in');

      return Promise.reject(new AxiosError('No authentication token found'));
    }

    const newConfig = { ...config, withCredentials: false };
    if (token) {
      newConfig.headers.set('Authorization', `Bearer ${token}`);
    }
    return newConfig;
  },
  (error) => Promise.reject(error),
);

export default PrivateAxiosInstance;
