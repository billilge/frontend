'use client';

import { useQuery } from '@tanstack/react-query';

import { getRentals } from '@/services/rentals';
import RentalsTable from './_components/RentalsTable';

export default function RentalHistoryPage() {
  const { data: originalData = [] } = useQuery({
    queryKey: ['rentals'],
    queryFn: getRentals,
  });

  return (
    <div className="flex flex-col justify-center gap-8 px-4 md:px-16 lg:px-64">
      <div className="pt-20 text-center">
        <p className="text-2xl">대여 기록 조회</p>
      </div>

      <div className="flex flex-col justify-between">
        <RentalsTable rentalHistories={originalData.rentalHistories || []} />
      </div>
    </div>
  );
}
