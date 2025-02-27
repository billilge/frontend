'use client';

import { useState, useEffect } from 'react';
import MobileLayout from '@/components/mobile/layout';
import Header from '@/components/mobile/Header';
import Dropdown from '@/components/mobile/Dropdown';
import useDropdown from '@/hooks/useDropdown';
import IconArrow from 'public/assets/icons/icon-arrow.svg';
import { cn } from '@/lib/utils';
import { adminDashboardGet, adminRentalPatch } from '@/services/dashboard';
import { DashboardProps } from '@/types/dashboardType';
import DashboardItem from './_components/DashboardItem';

type DashboardType = DashboardProps;

interface RentalRequestProps {
  rentalHistoryId: number;
  itemName: string;
  renterName: string;
  status?: string;
}

export default function Dashboard() {
  const RentalFilterText: Record<string, string> = {
    ALL: '전체',
    PENDING: '대여 신청',
    RETURN_PENDING: '반납 신청',
    RETURN_CONFIRMED: '반납 대기',
  };

  const [dashboardDetail, setDashboardDetail] = useState<DashboardType[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const { showDropdown, hideDropdown, isDropdownVisible } = useDropdown();

  const handleDropdown = () => {
    return isDropdownVisible ? hideDropdown() : showDropdown();
  };

  const handleFilter = async (filterText: string) => {
    setFilter(filterText);

    const rentalStatus = filterText !== 'ALL' ? filterText : undefined;
    const data = await adminDashboardGet(rentalStatus);

    setDashboardDetail(data.applications);
  };

  const dropdownActions = [
    { title: '전체', func: () => handleFilter('ALL') },
    { title: '대여 신청', func: () => handleFilter('PENDING') },
    { title: '반납 신청', func: () => handleFilter('RETURN_PENDING') },
    { title: '반납 대기', func: () => handleFilter('RETURN_CONFIRMED') },
  ];

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await adminDashboardGet();
      setDashboardDetail(data.applications);
    };

    fetchNotifications();
  }, [refreshTrigger]);

  useEffect(() => {}, [filter]);

  const handleApproveBtnClick = async ({
    rentalHistoryId,
    itemName,
    renterName,
    status,
  }: RentalRequestProps) => {
    const statusMap: Record<string, string> = {
      PENDING: 'CONFIRMED',
      CONFIRMED: 'RENTAL',
      RETURN_PENDING: 'RETURN_CONFIRMED',
      RETURN_CONFIRMED: 'RETURNED',
    };

    const newStatus = statusMap[status!] ?? status;

    const data = { rentalHistoryId, rentalStatus: newStatus };
    await adminRentalPatch(data);

    alert(`${renterName} 님의 ${itemName} 요청이 처리되었습니다.`);

    // TODO : 현재 임시로 상태로 관리 -> 추후 refetch로 변경
    setRefreshTrigger((prev) => !prev);
  };

  const handleCancelBtnClick = async ({
    rentalHistoryId,
    itemName,
    renterName,
  }: RentalRequestProps) => {
    const data = { rentalHistoryId, rentalStatus: 'CANCEL' };
    await adminRentalPatch(data);

    alert(`${renterName} 님의 ${itemName} 요청이 처리되었습니다.`);

    // TODO : 현재 임시로 상태로 관리 -> 추후 refetch로 변경
    setRefreshTrigger((prev) => !prev);
  };

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
      {dashboardDetail?.length === 0 ? (
        <div className="flex h-dvh items-center justify-center text-gray-secondary">
          현재 대기 중인 요청이 없습니다.
        </div>
      ) : (
        dashboardDetail.map((item) => (
          <DashboardItem
            key={item.rentalHistoryId}
            itemName={item.itemName}
            itemImageUrl={item.itemImageUrl}
            renterName={item.renterName}
            studentId={item.studentId}
            status={item.status}
            applicatedAt={item.applicatedAt}
            handleApproveBtnClick={() => {
              if (item.rentalHistoryId !== undefined) {
                handleApproveBtnClick({
                  rentalHistoryId: item.rentalHistoryId,
                  itemName: item.itemName,
                  renterName: item.renterName,
                  status: item.status,
                });
              }
            }}
            handleCancelBtnClick={() => {
              if (item.rentalHistoryId !== undefined) {
                handleCancelBtnClick({
                  rentalHistoryId: item.rentalHistoryId,
                  itemName: item.itemName,
                  renterName: item.renterName,
                });
              }
            }}
          />
        ))
      )}

      <Dropdown
        actions={dropdownActions}
        isVisible={isDropdownVisible}
        hideDropdown={hideDropdown}
        positionClasses="top-[80px] right-5"
      />
    </MobileLayout>
  );
}
