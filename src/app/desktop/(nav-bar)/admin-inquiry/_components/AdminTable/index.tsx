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
import { Admins, TableComponentProps } from '@/types/admins';
import { PageChangeAction } from '@/types/paginationType';

export default function AdminTable({
  admins,
  showCheckboxes = true,
  headers = ['이름', '학번'], // 기본값을 설정
  selected,
  setSelected,
  currentPage = 1,
  totalPage = 1,
  onPageChange = (pageAction: PageChangeAction) => {
    console.log(pageAction);
  },
}: TableComponentProps) {
  const handleSelect = (payerId: number) => {
    setSelected((prev: number[]) =>
      prev.includes(payerId)
        ? prev.filter((id) => id !== payerId)
        : [...prev, payerId],
    );
  };

  const handlePageChangeBtnClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    pageChangeAction: PageChangeAction,
  ) => {
    event.preventDefault();
    onPageChange(pageChangeAction);
  };

  const handleSelectAll = () => {
    const visibleIds = admins.map(
      (item: { memberId: number }) => item.memberId,
    );
    setSelected(
      (prev: number[]) => (prev.length === visibleIds.length ? [] : visibleIds), // 배열 길이를 비교하는 대신 선택된 아이디와 비교
    );
  };

  return (
    <div className="flex w-full flex-col p-10">
      <Table>
        <TableHeader>
          <TableRow>
            {showCheckboxes && (
              <TableHead className="w-10 text-center">
                <Checkbox
                  checked={selected.length === admins.length}
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
          {admins.map((item: Admins) => (
            <TableRow key={item.memberId}>
              {showCheckboxes && (
                <TableCell className="w-10 text-center">
                  <Checkbox
                    checked={selected.includes(item.memberId)}
                    onCheckedChange={() => handleSelect(item.memberId)}
                  />
                </TableCell>
              )}
              <TableCell className="w-30 text-center">{item.name}</TableCell>
              <TableCell className="w-30 text-center">
                {item.studentId}
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
