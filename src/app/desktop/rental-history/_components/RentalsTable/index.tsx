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
import { PageChangeAction } from '@/types/paginationType';

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
  currentPage = 1,
  totalPage = 1,
  onPageChange = (pageChangeAction: PageChangeAction) => {
    console.log(pageChangeAction);
  },
}: RentalsTableProps) {
  const handlePageChangeBtnClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    pageChangeAction: PageChangeAction,
  ) => {
    event.preventDefault();
    onPageChange(pageChangeAction);
  };

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
          {rentalHistories.length > 0 ? (
            rentalHistories.map((rental) => (
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
      <div className="flex items-center justify-center pt-4">
        <div className="flex items-center gap-2">
          <Button
            className="bg-transparent shadow-transparent hover:bg-transparent"
            disabled={currentPage === 1}
            onClick={(event) => handlePageChangeBtnClick(event, 'PREV')}
          >
            <ChevronLeftIcon className="h-10 w-10 cursor-pointer text-black-primary" />
          </Button>
          <span>
            {currentPage} / {totalPage}
          </span>
          <Button
            className="bg-transparent shadow-transparent hover:bg-transparent"
            disabled={currentPage === totalPage}
            onClick={(event) => handlePageChangeBtnClick(event, 'NEXT')}
          >
            <ChevronRightIcon className="h-6 w-6 cursor-pointer text-black-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
}
