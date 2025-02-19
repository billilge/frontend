'use client';

import { useState } from 'react';
import MobileLayout from '@/components/mobile/layout';
import Header from '@/components/mobile/Header';
import Dropdown from '@/components/mobile/Dropdown';
import useDropdown from '@/hooks/useDropdown';
import IconArrow from 'public/assets/icon-arrow.svg';
import { cn } from '@/lib/utils';
import DashboardItem from './_components/DashboardItem';

const RentalApplicationDetail = [
  {
    id: 0,
    itemName: '우산',
    imageUrl:
      'https://github.com/user-attachments/assets/1b8c9ae9-a840-4756-a87d-c092958a2854',
    renterName: '윤신지',
    studentId: 20213102,
    status: 'PENDING',
    applicatedAt: '2025-02-16T08:44:45.476Z',
  },
  {
    id: 1,
    itemName: '타이레놀',
    imageUrl:
      'https://github.com/user-attachments/assets/159ee697-5a2e-43c8-a5a0-8ab73ae869fd',
    renterName: '황현진',
    studentId: 20213102,
    status: 'RETURN_PENDING',
    applicatedAt: '2025-02-13T08:44:45.476Z',
  },
];

export default function Dashboard() {
  const RentalFilterText: Record<string, string> = {
    ALL: '전체',
    PENDING: '대여 신청',
    RETURN_PENDING: '반납 신청',
  };

  const [filter, setFilter] = useState('ALL');

  const { showDropdown, hideDropdown, isDropdownVisible } = useDropdown();

  const handleDropdown = () => {
    isDropdownVisible ? hideDropdown() : showDropdown();
  };

  const handleFilter = (filterText: string) => {
    setFilter(filterText);
    // 여기에 필터링 GET 쏘는 API 추가
  };

  const dropdownActions = [
    { title: '전체', func: () => handleFilter('ALL') },
    { title: '대여 신청', func: () => handleFilter('PENDING') },
    { title: '반납 신청', func: () => handleFilter('RETURN_PENDING') },
  ];

  return (
    <MobileLayout>
      <Header title="관리자 대시보드" />

      <section className="itmes-center mt-2.5 flex w-full justify-between px-5">
        <div className="flex justify-between text-lg font-semibold">
          신청 내역
        </div>
        <button
          type="button"
          onClick={isDropdownVisible ? undefined : handleDropdown}
          className={`flex items-center gap-2.5 ${isDropdownVisible && 'pointer-events-none'}`}
        >
          <div className="flex text-sm font-semibold">
            {RentalFilterText[filter]}
          </div>
          <IconArrow
            className={
              (cn('flex'), isDropdownVisible ? 'rotate-90' : '-rotate-90')
            }
          />
        </button>
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

      <Dropdown
        actions={dropdownActions}
        isVisible={isDropdownVisible}
        hideDropdown={hideDropdown}
        positionClasses="top-15 right-5"
      />
    </MobileLayout>
  );
}
