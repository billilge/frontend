import { useState } from 'react';
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
import { Payer, TableComponentProps } from '@/types/payers';

export default function TableComponent({
  payers,
  showCheckboxes = true,
  headers = ['이름', '학번', '회원 여부'], // 기본값을 설정
  selected,
  setSelected,
  handleDelete = () => {}, // 기본값으로 빈 함수 설정
}: TableComponentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleSelect = (payerId: number) => {
    setSelected((prev: number[]) =>
      prev.includes(payerId)
        ? prev.filter((id) => id !== payerId)
        : [...prev, payerId],
    );
  };

  // payers가 배열이 아닐 경우 기본 빈 배열로 대체
  const paginatedData = Array.isArray(payers)
    ? payers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : [];

  const handleSelectAll = () => {
    const visibleIds = paginatedData.map(
      (item: { payerId: number }) => item.payerId,
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
                  checked={selected.length === paginatedData.length}
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
          {paginatedData.map((item: Payer) => (
            <TableRow key={item.payerId}>
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
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <ChevronLeftIcon className="h-10 w-10 cursor-pointer text-black-primary" />
        </Button>
        <span>
          {currentPage} / {Math.ceil(payers.length / rowsPerPage)}
        </span>
        <Button
          className="bg-transparent shadow-transparent hover:bg-transparent"
          size="chevron"
          disabled={currentPage === Math.ceil(payers.length / rowsPerPage)}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <ChevronRightIcon className="h-6 w-6 cursor-pointer text-black-primary" />
        </Button>
      </div>
    </div>
  );
}
