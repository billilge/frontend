'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import ArchiveCard from '@/app/mobile/archiving/_components/ArchiveCard';
import YearFilter from '@/app/mobile/archiving/_components/YearFilter';
import { Archive } from '@/types/archiveType';
import IconArrow from 'public/assets/icons/icon-arrow.svg';
import IconSearch from 'public/assets/icons/icon-search.svg';

const RECENT_YEARS = [2026, 2025, 2024];
const PAST_YEARS = [2023, 2022, 2021, 2020];

// TODO: API 연동 시 제거
const ARCHIVES: Archive[] = [
  {
    archiveId: 1,
    title: '2025 체육대회',
    date: '2025.05.04',
    year: 2025,
    imageUrl: 'https://placehold.co/470x257',
    size: 'large',
  },
  {
    archiveId: 2,
    title: '2025 간식행사',
    date: '2025.05.04',
    year: 2025,
    imageUrl: 'https://placehold.co/253x187',
    size: 'small',
  },
  {
    archiveId: 3,
    title: '2025 새내기 배움터',
    date: '2025.05.04',
    year: 2025,
    imageUrl: 'https://placehold.co/214x286',
    size: 'medium',
  },
  {
    archiveId: 4,
    title: '2025 동문패널톡',
    date: '2025.05.04',
    year: 2025,
    imageUrl: 'https://placehold.co/448x281',
    size: 'large',
  },
  {
    archiveId: 5,
    title: '2025 해커톤',
    date: '2025.05.04',
    year: 2025,
    imageUrl: 'https://placehold.co/470x257',
    size: 'large',
  },
  {
    archiveId: 6,
    title: '2025 MT',
    date: '2025.05.04',
    year: 2025,
    imageUrl: 'https://placehold.co/253x187',
    size: 'small',
  },
  {
    archiveId: 7,
    title: '2025 종강총회',
    date: '2025.05.04',
    year: 2025,
    imageUrl: 'https://placehold.co/214x286',
    size: 'medium',
  },
  {
    archiveId: 8,
    title: '2025 졸업전시',
    date: '2025.05.04',
    year: 2025,
    imageUrl: 'https://placehold.co/448x281',
    size: 'large',
  },
  {
    archiveId: 9,
    title: '2024 체육대회',
    date: '2024.05.04',
    year: 2024,
    imageUrl: 'https://placehold.co/470x257',
    size: 'large',
  },
  {
    archiveId: 10,
    title: '2024 새내기 배움터',
    date: '2024.03.02',
    year: 2024,
    imageUrl: 'https://placehold.co/253x187',
    size: 'small',
  },
  {
    archiveId: 11,
    title: '2023 동문패널톡',
    date: '2023.11.11',
    year: 2023,
    imageUrl: 'https://placehold.co/448x281',
    size: 'medium',
  },
];

export default function Archiving() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState(2025);

  const filteredArchives = useMemo(
    () => ARCHIVES.filter((archive) => archive.year === selectedYear),
    [selectedYear],
  );

  // 두 열로 나눠서 배치 (좌: 짝수 번째, 우: 홀수 번째)
  const columns = useMemo(
    () => [
      filteredArchives.filter((_, index) => index % 2 === 0),
      filteredArchives.filter((_, index) => index % 2 === 1),
    ],
    [filteredArchives],
  );

  return (
    <div>
      {/* 헤더 */}
      <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between bg-[#F3F4F6]">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-6 w-6 items-center justify-center"
        >
          <IconArrow className="scale-125" />
        </button>
        <div className="text-body-1-normal_semi font-semibold text-black-primary">
          아카이빙
        </div>
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center"
        >
          <IconSearch className="scale-125" />
        </button>
      </header>

      <div className="flex flex-col gap-4 pb-12">
        {/* 연도 필터 */}
        <YearFilter
          recentYears={RECENT_YEARS}
          pastYears={PAST_YEARS}
          selectedYear={selectedYear}
          onSelectYear={setSelectedYear}
        />

        {/* 아카이빙 목록 */}
        {filteredArchives.length > 0 ? (
          <div className="flex items-start gap-2">
            {columns.map((column, columnIndex) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={columnIndex}
                className="flex flex-1 flex-col gap-2"
              >
                {column.map((archive) => (
                  <ArchiveCard
                    key={archive.archiveId}
                    title={archive.title}
                    date={archive.date}
                    imageUrl={archive.imageUrl}
                    size={archive.size}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-36 text-body-2-normal_semi font-medium text-gray-secondary">
            아카이빙 기록이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
