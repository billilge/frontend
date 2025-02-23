import axios, { InternalAxiosRequestConfig } from 'axios';

const PublicAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URI,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

PublicAxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return {
      ...config,
      withCredentials: false,
    };
  },
  (error) => Promise.reject(error),
);

export default PublicAxiosInstance;
