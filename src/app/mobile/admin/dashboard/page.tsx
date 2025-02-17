'use client';

import MobileLayout from '@/components/mobile/layout';
import Header from '@/components/mobile/Header';
import DashboardItem from './_components/DashboardItem';

const RentalApplicationDetail = [
  {
    id: 0,
    itemName: '고데기',
    imageUrl: 'https://www.example.com/test.png',
    renterName: '윤신지',
    studentId: 20213102,
    status: 'PENDING',
    applicatedAt: '2025-02-16T08:44:45.476Z',
  },
  {
    id: 1,
    itemName: '타이레놀',
    imageUrl: 'https://www.example.com/test.png',
    renterName: '황현진',
    studentId: 20213102,
    status: 'RENTAL',
    applicatedAt: '2025-02-13T08:44:45.476Z',
  },
];

export default function Dashboard() {
  return (
    <MobileLayout>
      <Header title="관리자 대시보드" />

      <section className="itmes-center mt-2.5 flex w-full justify-between px-5">
        <div className="flex justify-between text-lg font-semibold">
          신청 내역
        </div>
        {/* TODO : 드롭다운 공통 컴포넌트로 생성 */}
        <div>드롭다운</div>
      </section>
      {RentalApplicationDetail.map((item) => (
        <DashboardItem
          key={item.id}
          itemName={item.itemName}
          imageUrl={item.imageUrl}
          renterName={item.renterName}
          studentId={item.studentId}
          status={item.status}
          applicatedAt={item.applicatedAt}
        />
      ))}
    </MobileLayout>
  );
}
