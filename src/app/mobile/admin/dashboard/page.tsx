'use client';

import MobileLayout from '@/components/mobile/layout';
import DashboardItem from './_components/DashboardItem';

export default function Dashboard() {
  return (
    <MobileLayout>
      <section className="itmes-center mt-2.5 flex w-full justify-between px-5">
        <div className="text-lg font-semibold">신청 내역</div>
        {/* TODO : 드롭다운 공통 컴포넌트로 생성 */}
        <div>드롭다운</div>
      </section>
      <DashboardItem />
    </MobileLayout>
  );
}
