'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function Callback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get('status');

    if (!status) return;

    if (status === 'NEW_MEMBER') {
      router.replace('/mobile/sign-up');
    } else {
      router.replace('/mobile/main');
    }
  }, [searchParams, router]);

  return <p>Redirecting...</p>;
}

export default Callback;
