'use client';

import MobileLayout from '@/components/mobile/layout';
import Header from '@/components/mobile/Header';
// import Dropdown from '@/components/mobile/Dropdown';
// import useDropdown from '@/hooks/useDropdown';
import ReturnItem from '@/app/mobile/history/_components/ReturnItem';
import RentalItem from '@/app/mobile/history/_components/RentalItem';

export default function Mobile() {
  // const dropdownActions = [
  //   { title: '전체', func: () => console.log('전체') },
  //   { title: '대여 신청', func: () => console.log('대여 신청') },
  //   { title: '반납 신청', func: () => console.log('반납 신청') },
  // ];
  //
  // const { showDropdown, hideDropdown, isDropdownVisible } = useDropdown();

  const returnItemDummy = [
    { name: '현진이의 감자', url: '/assets/test.svg', dayCount: 3 },
    { name: '감자', url: '/assets/test.svg', dayCount: 65 },
    { name: '고구마', url: '/assets/test.svg', dayCount: 666 },
    { name: '옥수수', url: '/assets/test.svg', dayCount: 656565 },
    { name: '콩', url: '/assets/test.svg', dayCount: 6566656 },
    { name: '팥', url: '/assets/test.svg', dayCount: 6 },
  ];

  const rentalItemDummy = [
    {
      rentalHistoryId: 1,
      member: {
        name: '황수민',
        studentId: '20213102',
      },
      item: {
        itemName: '고데기',
        imageUrl: '/assets/test.svg',
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
        imageUrl: '/assets/test.svg',
      },
      rentAt: '2025.01.22 13:08',
      returnedAt: '2025.01.22 13:08',
      rentalStatus: 'PENDING',
    },
    {
      rentalHistoryId: 3,
      member: {
        name: '황수민',
        studentId: '20213102',
      },
      item: {
        itemName: '짱뜨거운고데기인데요사실은그게',
        imageUrl: '/assets/test.svg',
      },
      rentAt: '2025.01.22 13:08',
      returnedAt: '',
      rentalStatus: 'RENTAL',
    },
  ];

  return (
    <MobileLayout>
      <Header title="대여 기록" menu />
      <div className="pb-1.5 pl-4 pt-[22px] text-heading-4_M font-semibold">
        반납이 필요한 물품
      </div>
      <div className="box-border flex gap-1.5 overflow-auto px-4 py-1">
        {returnItemDummy.map((item) => (
          <ReturnItem
            key={item.name}
            name={item.name}
            url={item.url}
            dayCount={item.dayCount}
          />
        ))}
      </div>

      <div className="px-4">
        <div className="pb-1.5 pt-[50px] text-heading-4_M font-semibold">
          대여 내역
        </div>
        {rentalItemDummy.map((item) => (
          <RentalItem
            key={item.rentalHistoryId}
            item={item.item}
            rentAt={item.rentAt}
            returnAt={item.returnedAt}
            rentalStatus={item.rentalStatus}
          />
        ))}
      </div>
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
    </MobileLayout>
  );
}
