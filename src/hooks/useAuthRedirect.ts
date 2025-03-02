import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuthRedirect = (requiredRole?: string) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentPage = router.pathname;
    if (currentPage === '/sign-up' || currentPage === '/sign-in') {
      return;
    }

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (!user) {
      if (currentPage.startsWith('/desktop')) {
        router.replace('/desktop/login');
      } else if (currentPage.startsWith('/mobile')) {
        router.replace('/mobile/sign-in');
      } else {
        router.replace('/mobile/sign-in');
      }
      return;
    }

    // 역할별로 다르게 처리
    if (requiredRole === 'DESKTOP-ADMIN') {
      if (user.role !== 'ADMIN') {
        router.replace('/desktop/login');
      }
    } else if (requiredRole === 'MOBILE-ADMIN') {
      if (user.role !== 'ADMIN') {
        router.replace('/mobile/main');
      }
    } else if (requiredRole === 'USER') {
      if (user.role !== 'USER') {
        router.replace('/mobile/sign-in');
      }
    }
  }, [router, requiredRole]);
};

export default useAuthRedirect;
