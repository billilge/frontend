'use client';

import { useState } from 'react';
import MobileLayout from '@/components/mobile/layout';
import Header from '@/components/mobile/Header';
import ReturnItem from '@/app/mobile/history/_components/ReturnItem';
import RentalItem from '@/app/mobile/history/_components/RentalItem';
import Alert from '@/components/mobile/Alert';
import Dropdown from '@/components/mobile/Dropdown';
import useDropdown from '@/hooks/useDropdown';
import IconNoReturn from 'public/assets/icons/icon-no-return.svg';
import IconNoRental from 'public/assets/icons/icon-no-rental.svg';
import IconArrow from 'public/assets/icons/icon-arrow.svg';
import { cn } from '@/lib/utils';

export default function UserRentalList() {
  // 반납할 물품 더미데이터입니다.
  const returnItemDummy = [
    { name: '현진이의 감자', url: '/assets/icons/icon-test.svg', dayCount: 3 },
    { name: '감자', url: '/assets/icons/icon-test.svg', dayCount: 65 },
    { name: '고구마', url: '/assets/icons/icon-test.svg', dayCount: 666 },
    { name: '옥수수', url: '/assets/icons/icon-test.svg', dayCount: 656565 },
    { name: '콩', url: '/assets/icons/icon-test.svg', dayCount: 6566656 },
    { name: '팥', url: '/assets/icons/icon-test.svg', dayCount: 6 },
  ];

  const [rentalItems, setRentalItems] = useState([
    {
      rentalHistoryId: 1,
      member: {
        name: '황수민',
        studentId: '20213102',
      },
      item: {
        itemName: '고데기',
        imageUrl: '/assets/icons/icon-test.svg',
      },
      rentAt: '2025.01.22 13:08',
      returnedAt: '2025.01.22 13:08',
      rentalStatus: 'PENDING',
    },
    {
      rentalHistoryId: 2,
      member: {
        name: '황수민',
        studentId: '20213102',
      },
      item: {
        itemName: '고데기',
        imageUrl: '/assets/icons/icon-test.svg',
      },
      rentAt: '2025.01.22 13:08',
      returnedAt: '2025.01.22 13:08',
      rentalStatus: 'CANCEL',
    },
    {
      rentalHistoryId: 3,
      member: {
        name: '황수민',
        studentId: '20213102',
      },
      item: {
        itemName: '짱뜨거운고데기인데요사실은그게',
        imageUrl: '/assets/icons/icon-test.svg',
      },
      rentAt: '2025.01.22 13:08',
      returnedAt: '',
      rentalStatus: 'CONFIRMED',
    },
    {
      rentalHistoryId: 4,
      member: {
        name: '황수민',
        studentId: '20213102',
      },
      item: {
        itemName: '짱뜨거운고데기인데요사실은그게',
        imageUrl: '/assets/icons/icon-test.svg',
      },
      rentAt: '2025.01.22 13:08',
      returnedAt: '',
      rentalStatus: 'RENTAL',
    },
  ]);

  // 사용자에게 보여지는 상태가 너무 많아서 헷갈리지는 않겠죠..?
  const dropdownActions = [
    { title: '전체', func: () => console.log('전체') },
    { title: '승인 대기 중', func: () => console.log('승인 대기 중') },
    { title: '대기 취소', func: () => console.log('대기 취소') },
    { title: '승인 완료', func: () => console.log('승인 완료') },
    { title: '대여중', func: () => console.log('대여중') },
    { title: '반납 대기 중', func: () => console.log('반납 대기 중') },
    { title: '반납 승인', func: () => console.log('반납 승인') },
    { title: '반납 완료', func: () => console.log('반납 완료') },
  ];

  const { showDropdown, hideDropdown, isDropdownVisible } = useDropdown();
  const [alertState, setAlertState] = useState({
    isOpen: false,
    type: '',
    item: null,
  });

  const handleDropdown = () => {
    return isDropdownVisible ? hideDropdown() : showDropdown();
  };

  const handleAlertOpen = (type, item) => {
    setAlertState({ isOpen: true, type, item });
  };

  const handleAlertClose = () => {
    setAlertState({ isOpen: false, type: '', item: null });
  };

  const handleAlertConfirm = () => {
    if (!alertState.item) return;

    const statusMapping = {
      RETURN: 'RETURN_PENDING',
      CANCEL: 'CANCEL',
      RETURN_CANCEL: 'RENTAL',
    };

    setRentalItems((prevItems) =>
      prevItems.map((rentalItem) =>
        rentalItem.rentalHistoryId === alertState.item?.rentalHistoryId
          ? {
              ...rentalItem,
              rentalStatus:
                statusMapping[alertState.type] || rentalItem.rentalStatus,
            }
          : rentalItem,
      ),
    );

    handleAlertClose();
  };

  // Alert창
  const alertConfig = {
    RETURN: {
      content: '이 물품 반납할까요?',
      ctaButtonText: '반납할게요',
      otherButtonText: '괜찮아요',
      isMainColor: true,
    },
    CANCEL: {
      content: '대여 신청을 취소할까요?',
      ctaButtonText: '취소할래요',
      otherButtonText: '그냥 둘게요',
      isMainColor: false,
    },
    RETURN_CANCEL: {
      content: '반납 신청을 취소할까요?',
      ctaButtonText: '취소할래요',
      otherButtonText: '그냥 둘게요',
      isMainColor: false,
    },
  };

  const currentAlert = alertConfig[alertState.type] || {};

  return (
    <MobileLayout>
      <Header title="대여 기록" menu />

      {/* 반납이 필요한 물품 */}
      <div className="relative h-full">
        <div className="pb-1.5 pl-4 pt-[22px] text-heading-4_M font-semibold">
          반납이 필요한 물품
        </div>
        <div className="box-border flex gap-1.5 overflow-auto px-4 py-1">
          {returnItemDummy.length > 0 ? (
            returnItemDummy.map((item) => (
              <ReturnItem
                key={item.name}
                name={item.name}
                url={item.url}
                dayCount={item.dayCount}
              />
            ))
          ) : (
            <div className="flex h-[107px] w-full flex-col items-center justify-center gap-3">
              <IconNoReturn />
              <div className="text-body-2-normal_semi font-medium text-gray-secondary">
                반납이 필요한 물품이 없습니다.
              </div>
            </div>
          )}
        </div>

        {/* 대여 내역 */}
        <section className="px-4 pb-12 pt-[50px]">
          <div className="flex items-center justify-between pb-1.5">
            <div className="text-heading-4_M font-semibold">대여 내역</div>
            <button
              type="button"
              onClick={isDropdownVisible ? undefined : handleDropdown}
              className={`${isDropdownVisible && 'pointer-events-none'} relative flex items-center gap-2.5`}
            >
              <div className="text-body-2-normal_semi font-semibold text-black-primary">
                대여 상태
              </div>
              <IconArrow
                className={
                  (cn('flex'), isDropdownVisible ? 'rotate-90' : '-rotate-90')
                }
              />
            </button>
            <Dropdown
              actions={dropdownActions}
              isVisible={isDropdownVisible}
              hideDropdown={hideDropdown}
              positionClasses="top-64 right-3"
            />
          </div>
          {rentalItems.length > 0 ? (
            rentalItems.map((item) => (
              <RentalItem
                key={item.rentalHistoryId}
                item={item.item}
                rentAt={item.rentAt}
                returnAt={item.returnedAt}
                rentalStatus={item.rentalStatus}
                onReturnClick={() => handleAlertOpen('RETURN', item)}
                onCancelClick={() => handleAlertOpen('CANCEL', item)}
                onReturnCancelClick={() =>
                  handleAlertOpen('RETURN_CANCEL', item)
                }
              />
            ))
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-[30px] pt-20">
              <IconNoRental />
              <div className="text-body-2-normal_semi font-medium text-gray-secondary">
                대여 내역이 없습니다.
              </div>
            </div>
          )}
        </section>

        {alertState.isOpen && alertState.item && (
          <Alert
            content={currentAlert.content}
            ctaButtonText={currentAlert.ctaButtonText}
            otherButtonText={currentAlert.otherButtonText}
            isMainColor={currentAlert.isMainColor}
            onClickCta={handleAlertConfirm}
            onClickOther={handleAlertClose}
          />
        )}

        <div className="fixed bottom-0 left-0 right-0 flex h-12 items-center justify-center bg-[#F3F4F6]">
          <div className="text-body-2-normal_medi">© wink</div>
        </div>
      </div>
    </MobileLayout>
  );
}
