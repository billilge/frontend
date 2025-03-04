'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ImageLoginLogo from '../../public/assets/images/image-login-logo.svg';

export default function Home() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
      router.replace('/mobile/sign-in');
    }
  }, [secondsLeft, router]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <section className="mt-[128px] flex flex-col items-center justify-start gap-1.5">
        <div className="text-2xl font-normal">
          국민대학교 소프트웨어융합대학
        </div>
        <div className="text-3xl font-normal">복지물품 대여 시스템</div>
        <div className="text-xl font-normal">페이지가 존재하지 않아</div>
        <div className="text-xl font-normal">
          {secondsLeft}초 후에 메인 페이지로 이동합니다
        </div>
      </section>
      <ImageLoginLogo className="absolute top-24 rounded-2xl" />
    </div>
  );
}
