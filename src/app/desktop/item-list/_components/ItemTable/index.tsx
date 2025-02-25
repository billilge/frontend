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
import { Checkbox } from '@/components/ui/checkbox';
import { Item, ItemTableProps } from '@/types/items';

export default function ItemTable({
  items = [],
  showCheckboxes = true,
  headers = ['로고', '물품명', '소모품', '총 수량', '대여 중'],
  selected,
  setSelected,
  handleDelete = () => {},
}: ItemTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil((items?.length || 0) / rowsPerPage);

  // 선택된 항목을 다루는 함수
  const handleSelect = (id: number) => {
    setSelected(id); // 단일 선택으로 변경
  };

  const handleSelectAll = () => {
    if (selected === paginatedData[0]?.itemId) {
      setSelected(0); // 전체 선택 해제
    } else {
      setSelected(paginatedData[0]?.itemId); // 첫 번째 항목을 선택(전체 선택)
    }
  };

  const paginatedData = items
    ? items.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : [];

  return (
    <div className="flex w-full flex-col p-10">
      <Table>
        <TableHeader>
          <TableRow>
            {showCheckboxes && (
              <TableHead className="w-10 text-center">
                <Checkbox
                  checked={selected === paginatedData[0]?.itemId} // 선택된 첫 번째 항목이 전체 항목과 일치하는지 확인
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
          {paginatedData.length > 0 ? (
            paginatedData.map((item: Item) => (
              <TableRow key={item.itemId}>
                {showCheckboxes && (
                  <TableCell className="w-10 text-center">
                    <Checkbox
                      checked={selected === item.itemId} // selected 상태가 현재 itemId와 일치하면 체크
                      onCheckedChange={() => handleSelect(item.itemId)}
                    />
                  </TableCell>
                )}
                <TableCell className="w-30 text-center">
                  <img
                    src={item.imageUrl}
                    alt="item"
                    className="h-10 w-10 rounded"
                  />
                </TableCell>
                <TableCell className="w-30 text-center">
                  {item.itemName}
                </TableCell>
                <TableCell className="w-30 text-center">
                  {item.itemType ? 'RENTAL' : 'CONSUMPTION'}
                </TableCell>
                <TableCell className="w-30 text-center">{item.count}</TableCell>
                <TableCell className="w-30 text-center">
                  {item.renterCount}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={headers.length + (showCheckboxes ? 1 : 0)}
                className="text-center"
              >
                데이터가 없습니다.
              </TableCell>
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
