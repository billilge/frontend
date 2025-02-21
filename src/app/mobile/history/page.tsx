'use client';

import MobileLayout from '@/components/mobile/layout';
import Header from '@/components/mobile/Header';
// import Dropdown from '@/components/mobile/Dropdown';
// import useDropdown from '@/hooks/useDropdown';
import ReturnItem from '@/app/mobile/history/_components/ReturnItem';
import RentalItem from '@/app/mobile/history/_components/RentalItem';
import Alert from '@/components/mobile/Alert';
import { useState } from 'react';
import IconNoReturn from '../../../../public/assets/icon-no-return.svg';
import IconNoRental from '../../../../public/assets/icon-no-rental.svg';

export default function Mobile() {
  // const dropdownActions = [
  //   { title: '전체', func: () => console.log('전체') },
  //   { title: '대여 신청', func: () => console.log('대여 신청') },
  //   { title: '반납 신청', func: () => console.log('반납 신청') },
  // ];
  //
  // const { showDropdown, hideDropdown, isDropdownVisible } = useDropdown();

  const returnItemDummy = [
    { name: '현진이의 감자', url: '/assets/icon-test.svg', dayCount: 3 },
    { name: '감자', url: '/assets/icon-test.svg', dayCount: 65 },
    { name: '고구마', url: '/assets/icon-test.svg', dayCount: 666 },
    { name: '옥수수', url: '/assets/icon-test.svg', dayCount: 656565 },
    { name: '콩', url: '/assets/icon-test.svg', dayCount: 6566656 },
    { name: '팥', url: '/assets/icon-test.svg', dayCount: 6 },
  ];

  const rentalItemDummy = [
    // {
    //   rentalHistoryId: 1,
    //   member: {
    //     name: '황수민',
    //     studentId: '20213102',
    //   },
    //   item: {
    //     itemName: '고데기',
    //     imageUrl: '/assets/icon-test.svg',
    //   },
    //   rentAt: '2025.01.22 13:08',
    //   returnedAt: '2025.01.22 13:08',
    //   rentalStatus: 'PENDING',
    // },
    // {
    //   rentalHistoryId: 2,
    //   member: {
    //     name: '황수민',
    //     studentId: '20213102',
    //   },
    //   item: {
    //     itemName: '고데기',
    //     imageUrl: '/assets/icon-test.svg',
    //   },
    //   rentAt: '2025.01.22 13:08',
    //   returnedAt: '2025.01.22 13:08',
    //   rentalStatus: 'CANCEL',
    // },
    // {
    //   rentalHistoryId: 3,
    //   member: {
    //     name: '황수민',
    //     studentId: '20213102',
    //   },
    //   item: {
    //     itemName: '짱뜨거운고데기인데요사실은그게',
    //     imageUrl: '/assets/icon-test.svg',
    //   },
    //   rentAt: '2025.01.22 13:08',
    //   returnedAt: '',
    //   rentalStatus: 'CONFIRMED',
    // },
    // {
    //   rentalHistoryId: 4,
    //   member: {
    //     name: '황수민',
    //     studentId: '20213102',
    //   },
    //   item: {
    //     itemName: '짱뜨거운고데기인데요사실은그게',
    //     imageUrl: '/assets/icon-test.svg',
    //   },
    //   rentAt: '2025.01.22 13:08',
    //   returnedAt: '',
    //   rentalStatus: 'RENTAL',
    // },
    // {
    //   rentalHistoryId: 5,
    //   member: {
    //     name: '황수민',
    //     studentId: '20213102',
    //   },
    //   item: {
    //     itemName: '짱뜨거운고데기인데요사실은그게',
    //     imageUrl: '/assets/icon-test.svg',
    //   },
    //   rentAt: '2025.01.22 13:08',
    //   returnedAt: '',
    //   rentalStatus: 'RETURN_PENDING',
    // },
    // {
    //   rentalHistoryId: 6,
    //   member: {
    //     name: '황수민',
    //     studentId: '20213102',
    //   },
    //   item: {
    //     itemName: '짱뜨거운고데기인데요사실은그게',
    //     imageUrl: '/assets/icon-test.svg',
    //   },
    //   rentAt: '2025.01.22 13:08',
    //   returnedAt: '',
    //   rentalStatus: 'RETURN_CONFIRMED',
    // },
    // {
    //   rentalHistoryId: 7,
    //   member: {
    //     name: '황수민',
    //     studentId: '20213102',
    //   },
    //   item: {
    //     itemName: '짱뜨거운고데기인데요사실은그게',
    //     imageUrl: '/assets/icon-test.svg',
    //   },
    //   rentAt: '2025.01.22 13:08',
    //   returnedAt: '',
    //   rentalStatus: 'RETURNED',
    // },
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  // 반납하기 버튼 클릭시 실행
  const handleReturnClick = (item) => {
    setSelectedItem(item);
    setIsAlertVisible(true);
  };

  // alert창의 cta 버튼 클릭시 실행
  const handleReturnConfirm = () => {
    console.log(`${selectedItem?.item.itemName} 반납 처리!`);
    setIsAlertVisible(false);
    setSelectedItem(null);
  };

  return (
    <MobileLayout>
      <Header title="대여 기록" menu />

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

        <section className="px-4 pb-12 pt-[50px]">
          <div className="pb-1.5 text-heading-4_M font-semibold">대여 내역</div>
          {rentalItemDummy.length > 0 ? (
            rentalItemDummy.map((item) => (
              <RentalItem
                key={item.rentalHistoryId}
                item={item.item}
                rentAt={item.rentAt}
                returnAt={item.returnedAt}
                rentalStatus={item.rentalStatus}
                onReturnClick={() => handleReturnClick(item)}
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

        {/* <Dropdown */}
        {/*  actions={dropdownActions} */}
        {/*  isVisible={isDropdownVisible} */}
        {/*  hideDropdown={hideDropdown} */}
        {/*  positionClasses="top-5 right-5" */}
        {/* /> */}
        {/* <button type="button" onClick={showDropdown}> */}
        {/*  열기 */}
        {/* </button> */}
        {/* <button type="button" onClick={hideDropdown}> */}
        {/*  닫기 */}
        {/* </button> */}

        {isAlertVisible && selectedItem && (
          <Alert
            // content={`${selectedItem.item.itemName}을 반납할까요?`}
            content="이 물품 반납할까요?"
            ctaButtonText="반납할게요"
            otherButtonText="취소하기"
            isMainColor={false}
            onClickCta={handleReturnConfirm} // 반납 처리
            onClickOther={() => setIsAlertVisible(false)} // Alert 닫기
          />
        )}

        <div className="fixed bottom-0 left-0 right-0 flex h-12 items-center justify-center bg-[#F3F4F6]">
          <div className="text-body-2-normal_medi">© wink</div>
        </div>
      </div>
    </MobileLayout>
  );
}
