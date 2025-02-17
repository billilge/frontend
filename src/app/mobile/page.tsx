'use client';

import MobileLayout from '@/components/mobile/layout';
import Dropdown from '@/components/mobile/Dropdown';
import useDropdown from '@/hooks/useDropdown';

export default function Mobile() {
  const dropdownActions = [
    { title: '전체', func: () => console.log('전체') },
    { title: '대여 신청', func: () => console.log('대여 신청') },
    { title: '반납 신청', func: () => console.log('반납 신청') },
  ];

  const { showDropdown, hideDropdown, isDropdownVisible } = useDropdown();

  return (
    <MobileLayout>
      <Dropdown
        actions={dropdownActions}
        isVisible={isDropdownVisible}
        hideDropdown={hideDropdown}
        position={{ top: '22px', right: '20px' }}
      />
      <button type="button" onClick={showDropdown}>
        열기
      </button>
      <button type="button" onClick={hideDropdown}>
        닫기
      </button>
    </MobileLayout>
  );
}
