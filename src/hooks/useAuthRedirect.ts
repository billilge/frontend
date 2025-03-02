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
    const user = userString ? JSON.parse(userString) : null;

    console.log(currentPage);

    if (!user && !checkCurrentPages) {
      setTimeout(() => {
        if (currentPage.startsWith('/desktop')) {
          router.replace('/desktop/login');
        } else if (currentPage.startsWith('/mobile')) {
          router.replace('/mobile/sign-in');
        } else {
          router.replace('/mobile/sign-in');
        }
      }, 0);
    } else {
      if (currentPage.startsWith('/desktop') && user.role !== 'ADMIN') {
        setTimeout(() => {
          router.replace('/desktop/login');
        }, 0);
        return;
      }

      if (currentPage.startsWith('/mobile/admin') && user.role !== 'ADMIN') {
        setTimeout(() => {
          router.replace('/mobile/main');
        }, 0);
      }
    }
  }, [router, pathname]);
};

export default useAuthRedirect;
