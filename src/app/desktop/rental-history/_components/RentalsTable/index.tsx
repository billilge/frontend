import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RentalsTableProps } from '@/types/rentals';

export default function RentalsTable({
  rentalHistories,
  headers = [
    '이름',
    '학번',
    '대여 시각',
    '반납 시각',
    '대여 물품',
    '물품 상태',
  ],
}: RentalsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(rentalHistories.length / rowsPerPage);

  const paginatedData = rentalHistories.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="flex w-full flex-col p-10">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header} className="w-30 text-center">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((rental) => (
              <TableRow key={rental.rentalHistoryId}>
                <TableCell className="w-30 text-center">
                  {rental.member.name}
                </TableCell>
                <TableCell className="w-30 text-center">
                  {rental.member.studentId}
                </TableCell>
                <TableCell className="w-30 text-center">
                  {new Date(rental.rentAt).toLocaleString()}
                </TableCell>
                <TableCell className="w-30 text-center">
                  {rental.returnedAt
                    ? new Date(rental.returnedAt).toLocaleString()
                    : '미반납'}
                </TableCell>
                <TableCell className="w-30 text-center">
                  {rental.itemName}
                </TableCell>
                <TableCell className="w-30 text-center">
                  {rental.rentalStatus}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center">데이터가 없습니다.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-2">
          <Button
            className="bg-transparent shadow-transparent hover:bg-transparent"
            disabled={currentPage === 1 || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ChevronLeftIcon className="h-10 w-10 cursor-pointer text-black-primary" />
          </Button>
          <span>
            {totalPages > 0 ? `${currentPage} / ${totalPages}` : '0 / 0'}
          </span>
          <Button
            className="bg-transparent shadow-transparent hover:bg-transparent"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRightIcon className="h-6 w-6 cursor-pointer text-black-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
}
