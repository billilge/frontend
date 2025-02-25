'use client';

import { useEffect, useState, useMemo } from 'react';
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
import {
  getRentalItems,
  getReturnItems,
  cancelRentalItems,
  returnRentalItems,
} from '@/apis/rental';
import { ReturnData } from '@/types/returnItemType';
import {
  RentalHistoriesData,
  RentalStatus,
  RentalHistory,
} from '@/types/rentalItemType';

export default function UserRentalList() {
  const [returnItems, setReturnItems] = useState<ReturnData>({ items: [] });
  const [rentalItems, setRentalItems] = useState<RentalHistoriesData>({
    rentalHistories: [],
  });

  const { showDropdown, hideDropdown, isDropdownVisible } = useDropdown();

  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    type: string | '';
    item: RentalHistory | null;
  }>({
    isOpen: false,
    type: '',
    item: null,
  });

  // Alert창
  const alertConfig = {
    RENTAL: {
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
  };

  const currentAlert =
    alertConfig[alertState.type as keyof typeof alertConfig] || {};

  useEffect(() => {
    const fetchReturnItems = async () => {
      try {
        const data = await getReturnItems();
        setReturnItems(data);
      } catch (err) {
        console.error('getReturnItems API 오류:', err);
      }
    };

    const fetchRentalItems = async () => {
      try {
        const data = await getRentalItems();
        setRentalItems({
          rentalHistories: [...data.rentalHistories].reverse(), // 데이터 최신순 정렬
        });
      } catch (err) {
        console.error('getRentalItems API 오류:', err);
      }
    };

    fetchReturnItems();
    fetchRentalItems();
  }, []);

  // 선택한 상태 필터링(api 호출)
  const filterRentalItems = async (status: RentalStatus | null) => {
    try {
      const data = await getRentalItems(status || undefined); // 필터 적용
      setRentalItems(data);
    } catch (err) {
      console.error('getRentalItems API 오류:', err);
    }
  };

  const dropdownActions = [
    { title: '전체', func: () => filterRentalItems(null) },
    { title: '승인 대기 중', func: () => filterRentalItems('PENDING') },
    { title: '대기 취소', func: () => filterRentalItems('CANCEL') },
    { title: '승인 완료', func: () => filterRentalItems('CONFIRMED') },
    { title: '대여 불가', func: () => filterRentalItems('REJECTED') },
    { title: '대여중', func: () => filterRentalItems('RENTAL') },
    { title: '반납 대기 중', func: () => filterRentalItems('RETURN_PENDING') },
    { title: '반납 승인', func: () => filterRentalItems('RETURN_CONFIRMED') },
    { title: '반납 완료', func: () => filterRentalItems('RETURNED') },
  ];

  const handleDropdown = () => {
    return isDropdownVisible ? hideDropdown() : showDropdown();
  };

  const handleAlertOpen = (type: string, item: RentalHistory) => {
    setAlertState({ isOpen: true, type, item });
  };

  const handleAlertClose = () => {
    setAlertState({ isOpen: false, type: '', item: null });
  };

  const handleAlertConfirm = async () => {
    if (!alertState.item) return;

    try {
      if (alertState.type === 'CANCEL') {
        await cancelRentalItems(alertState.item.rentalHistoryId);
      } else if (alertState.type === 'RENTAL') {
        await returnRentalItems(alertState.item.rentalHistoryId);
      }

      setRentalItems((prevItems) => ({
        rentalHistories: prevItems.rentalHistories.map((rentalItem) => {
          if (rentalItem.rentalHistoryId === alertState.item?.rentalHistoryId) {
            let updatedStatus = rentalItem.rentalStatus;

            if (alertState.type === 'CANCEL') {
              updatedStatus = 'CANCEL';
            } else if (alertState.type === 'RENTAL') {
              updatedStatus = 'RETURN_PENDING';
            }

            return {
              ...rentalItem,
              rentalStatus: updatedStatus,
            };
          }

          return rentalItem;
        }),
      }));
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
    }

    handleAlertClose();
  };

  const returnItemsWithKeys = useMemo(
    () =>
      returnItems.items.map((item) => ({
        ...item,
        uniqueKey: `${item.item.itemName}-${Math.random()}`,
      })),
    [returnItems.items],
  );

  return (
    <MobileLayout>
      <Header title="대여 기록" menu />

      {/* 반납이 필요한 물품 */}
      <div className="relative h-full">
        <div className="pb-1.5 pl-4 pt-[22px] text-heading-4_M font-semibold">
          반납이 필요한 물품
        </div>
        <div className="box-border flex gap-1.5 overflow-auto px-4 py-1">
          {returnItems.items.length > 0 ? (
            returnItemsWithKeys.map((item) => (
              <ReturnItem
                key={item.uniqueKey}
                name={item.item.itemName}
                url={item.item.imageUrl}
                dayCount={item.rentalDayCount}
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
          {rentalItems.rentalHistories.length > 0 ? (
            rentalItems.rentalHistories.map((item) => (
              <RentalItem
                key={item.rentalHistoryId}
                item={item.item}
                rentAt={item.rentAt}
                returnAt={item.returnedAt}
                rentalStatus={item.rentalStatus}
                onReturnClick={() => handleAlertOpen('RENTAL', item)}
                onCancelClick={() => handleAlertOpen('CANCEL', item)}
                // onReturnCancelClick={() =>
                //   handleAlertOpen('RETURN_PENDING', item)
                // }
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
