import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { clearAllCookies } from '@/utils/clearAllCookies';

const getAccessToken = (): string | null => {
  const token = Cookies.get('token');

  if (token) {
    try {
      return token || '';
    } catch (error) {
      console.error('Failed to parse user from Cookies', error);
      return '';
    }
  }
  return '';
};

const redirectToLogin = () => {
  const { pathname } = window.location;
  const redirectPages = ['/desktop/login', '/mobile/sign-in'];

  if (!redirectPages.includes(pathname)) {
    window.location.replace(
      pathname.startsWith('/desktop') ? '/desktop/login' : '/mobile/sign-in',
    );
  }
};

const PrivateAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
PrivateAxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    if (!token) {
      redirectToLogin();
      return Promise.reject(new AxiosError('No authentication token found'));
    }

    const newConfig = { ...config, withCredentials: false };
    newConfig.headers.set('Authorization', `Bearer ${token}`);
    return newConfig;
  },
  (error) => Promise.reject(error),
);

PrivateAxiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearAllCookies();
      redirectToLogin();
    }
    return Promise.reject(error);
  },
);

export default PrivateAxiosInstance;
