'use client';

import { useQuery } from '@tanstack/react-query';

import { getRentals } from '@/services/rentals';
import { useEffect, useState } from 'react';
import { PageChangeAction } from '@/types/paginationType';
import RentalsTable from './_components/RentalsTable';

export default function RentalHistoryPage() {
  const [page, setPage] = useState(1);

  const { data: originalData = [], refetch } = useQuery({
    queryKey: ['rentals'],
    queryFn: () => getRentals(page - 1),
  });

  useEffect(() => {
    refetch();
  }, [page]);

  const handlePageChange = async (pageChangeAction: PageChangeAction) => {
    console.log('PageChange:', pageChangeAction);
    setPage((current) =>
      pageChangeAction === 'NEXT' ? current + 1 : current - 1,
    );
    console.log(`page: ${page}`);
  };

  return (
    <div className="flex flex-col justify-center gap-8 px-4 md:px-16 lg:px-64">
      <div className="pt-20 text-center">
        <p className="text-2xl">대여 기록 조회</p>
      </div>

      <div className="flex flex-col justify-between">
        <RentalsTable
          rentalHistories={originalData.rentalHistories || []}
          currentPage={page}
          totalPage={originalData.totalPage > 0 ? originalData.totalPage : 1}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
