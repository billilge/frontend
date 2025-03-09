import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Payer, PayerTableProps } from '@/types/payers';
import { PageChangeAction } from '@/types/paginationType';

export default function PayerTable({
  payers,
  showCheckboxes = true,
  headers = ['이름', '학번', '회원 여부'], // 기본값을 설정
  selected,
  setSelected,
  currentPage = 1,
  totalPage = 1,
  onPageChange = (pageChangeAction: PageChangeAction) => {
    console.log(pageChangeAction);
  },
}: PayerTableProps) {
  const handleSelect = (payerId: number) => {
    setSelected((prev: number[]) =>
      prev.includes(payerId)
        ? prev.filter((id) => id !== payerId)
        : [...prev, payerId],
    );
  };

  const handleSelectAll = () => {
    const visibleIds = payers.map((item: { payerId: number }) => item.payerId);
    setSelected(
      (prev: number[]) => (prev.length === visibleIds.length ? [] : visibleIds), // 배열 길이를 비교하는 대신 선택된 아이디와 비교
    );
  };

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
            {showCheckboxes && (
              <TableHead className="w-10 text-center">
                <Checkbox
                  checked={selected.length === payers.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
            )}
            {headers.map((header) => (
              <TableHead key={header} className="w-30 text-center">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {payers.map((item: Payer) => (
            <TableRow key={`${item.payerId}${item.studentId}`}>
              {showCheckboxes && (
                <TableCell className="w-10 text-center">
                  <Checkbox
                    checked={selected.includes(item.payerId)}
                    onCheckedChange={() => handleSelect(item.payerId)}
                  />
                </TableCell>
              )}
              <TableCell className="w-30 text-center">{item.name}</TableCell>
              <TableCell className="w-30 text-center">
                {item.studentId}
              </TableCell>
              <TableCell className="w-30 text-center">
                {item.registered !== undefined && (item.registered ? 'o' : 'x')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center pt-4">
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
          size="chevron"
          disabled={currentPage === totalPage}
          onClick={(event) => handlePageChangeBtnClick(event, 'NEXT')}
        >
          <ChevronRightIcon className="h-6 w-6 cursor-pointer text-black-primary" />
        </Button>
      </div>
    </div>
  );
}
