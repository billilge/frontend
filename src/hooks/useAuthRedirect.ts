'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const useAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentPage = pathname;
    const checkCurrentPages =
      currentPage === '/mobile/sign-up' ||
      currentPage === '/mobile/sign-in' ||
      currentPage === '/desktop/login';

    const userString = localStorage.getItem('user');
    const isLogin = userString && localStorage.getItem('token');
    const user = userString ? JSON.parse(userString) : undefined;

    if (!isLogin) {
      localStorage.clear();
      if (!checkCurrentPages) {
        alert('로그인 후 이용 가능한 페이지입니다.');
        if (currentPage.startsWith('/desktop')) {
          router.replace('/desktop/login');
        } else {
          router.replace('/mobile/sign-in');
        }
      }
    } else {
      if (currentPage.startsWith('/desktop') && user.role !== 'ADMIN') {
        alert('관리자만 이용 가능한 페이지입니다.');
        router.replace('/desktop/login');
        return;
      }
      if (currentPage.startsWith('/mobile/admin') && user.role !== 'ADMIN') {
        alert('관리자만 이용 가능한 페이지입니다.');
        router.replace('/mobile/main');
      }
    }
  }, [router, pathname]);
};

export default useAuthRedirect;
