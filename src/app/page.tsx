'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ImageLoginLogo from '../../public/assets/images/image-login-logo.svg';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/mobile/sign-in');
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <section className="mt-[128px] flex flex-col items-center justify-start gap-1.5">
        <div className="text-2xl font-normal">
          국민대학교 소프트웨어융합대학
        </div>
        <div className="text-3xl font-semibold">복지물품 대여 시스템</div>
      </section>
      <ImageLoginLogo className="absolute top-24 rounded-2xl" />
    </div>
  );
}
