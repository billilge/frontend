'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { decode } from 'js-base64';

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get('status');
    const email = searchParams.get('email');
    const accessToken = searchParams.get('accessToken');

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
        if (accessToken) {
          localStorage.setItem('token', accessToken);
          const payload = accessToken.split('.')[1] || '';
          const decodedPayload = decode(payload);
          const payloadObject = JSON.parse(decodedPayload);

          const tokenRole = payloadObject.role;

          localStorage.setItem('token', accessToken);
          localStorage.setItem('role', tokenRole);
        }
        router.replace('/mobile/main');
        break;
    }
  }, [searchParams, router]);

  return <p>Redirecting...</p>;
}

export default function Callback() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CallbackContent />
    </Suspense>
  );
}
