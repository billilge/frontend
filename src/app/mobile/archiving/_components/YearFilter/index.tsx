'use client';

import { useRef } from 'react';
import Dropdown from '@/components/mobile/Dropdown';
import useDropdown from '@/hooks/useDropdown';
import IconArrow from 'public/assets/icons/icon-arrow.svg';

interface YearFilterProps {
  recentYears: number[];
  pastYears: number[];
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

export default function YearFilter({
  recentYears,
  pastYears,
  selectedYear,
  onSelectYear,
}: YearFilterProps) {
  const { showDropdown, hideDropdown, isDropdownVisible } = useDropdown();
  const pastYearButtonRef = useRef<HTMLButtonElement>(null);

  const isPastYearSelected = pastYears.includes(selectedYear);
  const pastYearLabel = isPastYearSelected
    ? `${selectedYear}`
    : `~${pastYears[0]}`;

  const dropdownActions = pastYears.map((year) => ({
    title: `${year}`,
    func: () => onSelectYear(year),
  }));

  // 시안대로 높이 32px(12/16 + py-2)를 유지하기 위해 border 대신 outline 사용
  const chipClasses = (isActive: boolean, widthClass: string) =>
    `flex shrink-0 items-center justify-center gap-2 rounded-[20px] px-3 py-2 text-xs leading-4 tracking-tight outline outline-1 -outline-offset-1 ${widthClass} ${
      isActive
        ? 'bg-main-tertiary font-semibold text-on-kookmin outline-on-kookmin'
        : 'font-medium text-gray-secondary outline-gray-border'
    }`;

  return (
    <div className="flex w-full items-center gap-2">
      {recentYears.map((year) => (
        <button
          key={year}
          type="button"
          onClick={() => onSelectYear(year)}
          className={chipClasses(selectedYear === year, 'w-[55px]')}
        >
          {year}
        </button>
      ))}

      {/* 남는 폭을 차지해서 드롭다운이 칩 왼쪽 ~ 페이지 오른쪽 여백까지 채우도록 함 */}
      <div className="relative flex flex-1 flex-col items-start">
        <button
          ref={pastYearButtonRef}
          type="button"
          onClick={isDropdownVisible ? hideDropdown : showDropdown}
          className={chipClasses(isPastYearSelected, 'w-[84px]')}
        >
          {pastYearLabel}
          <IconArrow className="h-3.5 w-3.5 -rotate-90" />
        </button>

        <Dropdown
          actions={dropdownActions}
          isVisible={isDropdownVisible}
          hideDropdown={hideDropdown}
          positionClasses="inset-x-0 top-10 min-w-0"
          triggerRef={pastYearButtonRef}
        />
      </div>
    </div>
  );
}
