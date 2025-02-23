'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function Callback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get('status');
    const email = searchParams.get('email');

    localStorage.setItem('email', email || '');

    if (!status) return;

    switch (status) {
      case 'NEW_MEMBER':
        router.replace('/mobile/sign-up');
        break;
      case 'INVALID_EMAIL':
        alert('국민대 이메일로 로그인 해 주세요.');
        router.replace('/mobile/sign-in');
        break;
      case 'SUCCESS':
      default:
        router.replace('/mobile/main');
        break;
    }
  }, [searchParams, router]);

  return <p>Redirecting...</p>;
}

export default Callback;
