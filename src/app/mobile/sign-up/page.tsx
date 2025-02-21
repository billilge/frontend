'use client';

import MobileLayout from '@/components/mobile/layout';

export default function SignUp() {
  return (
    <MobileLayout>
      <section className="relative flex h-dvh w-full flex-col items-center justify-start overflow-hidden">
        <section className="mt-20 flex w-11/12 flex-col items-start">
          <div className="text-heading-3_M font-semibold">
            복지물품 대여 시스템
          </div>
          <div className="text-heading-2_M font-bold">
            빌릴게에 오신 것을 환영합니다!
          </div>
        </section>
        <section className="mt-[50px] flex w-11/12 flex-col items-start gap-6">
          <section className="flex w-full flex-col gap-1.5">
            <div>이름을 입력해 주세요.</div>
            <input
              placeholder="이름을 정확히 입력해 주세요."
              className="flex w-full rounded-xl border px-3.5 py-4"
            />
          </section>
          <section className="flex w-full flex-col gap-1.5">
            <div>학번을 입력해 주세요.</div>
            <input
              placeholder="8자 모두 입력해 주세요."
              className="flex w-full rounded-xl border px-3.5 py-4"
            />
          </section>
        </section>

        <button
          className="bg-on-kookmin absolute bottom-7 flex w-11/12 justify-between rounded-2xl border px-6 py-4 text-white-primary"
          type="button"
        >
          <div className="h-6 w-6" />
          <div className="flex font-medium">작성 완료</div>
          <div className="h-6 w-6" />
        </button>
      </section>
    </MobileLayout>
  );
}
