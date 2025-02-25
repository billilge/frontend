import axios, { InternalAxiosRequestConfig } from 'axios';

const PrivateAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URI,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
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
