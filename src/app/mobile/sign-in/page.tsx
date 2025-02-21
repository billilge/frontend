'use client';

import MobileLayout from '@/components/mobile/layout';
import ImageLoginLogo from 'public/assets/images/image-login-logo.svg';
import IconGoogle from 'public/assets/icons/icon-google.svg';

export default function SignIn() {
  return (
    <MobileLayout>
      <section className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <section className="mt-[128px] flex flex-col items-center justify-center gap-1.5">
          <div className="text-2xl font-normal">
            국민대학교 소프트웨어융합대학
          </div>
          <div className="text-3xl font-semibold">복지물품 대여 시스템</div>
        </section>
        <ImageLoginLogo className="absolute top-24" />
        <button
          className="mt-96 flex w-11/12 justify-between rounded-2xl border px-6 py-4"
          type="button"
        >
          <IconGoogle />
          <div className="flex font-medium">Google로 시작하기</div>
          <div className="h-6 w-6" />
        </button>
      </section>
    </MobileLayout>
  );
}
