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

interface Item {
  logo: string;
  name: string;
  isConsumable: boolean;
  totalQuantity: number;
  rentedQuantity: number;
  id: string;
  isAdmin?: boolean;
}

interface ItemTableProps {
  data: Item[];
  showCheckboxes?: boolean;
  headers?: string[];
  selected: string[];
  setSelected: (selectedIds: (prev: string[]) => string[]) => void;
  handleDelete?: (selectedIds: string[]) => void;
}

export default function ItemTable({
  data,
  showCheckboxes = true,
  headers = ['로고', '물품명', '소모품', '총 수량', '대여 중'],
  selected,
  setSelected,
  handleDelete = () => {},
}: ItemTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleSelect = (id: string) => {
    setSelected((prev: string[]) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handleSelectAll = () => {
    const visibleIds = paginatedData.map((item) => item.id);
    setSelected((prev: string[]) =>
      prev.length === visibleIds.length ? [] : visibleIds,
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
          {paginatedData.map((item) => (
            <TableRow key={item.id}>
              {showCheckboxes && (
                <TableCell className="w-10 text-center">
                  <Checkbox
                    checked={selected.includes(item.id)}
                    onCheckedChange={() => handleSelect(item.id)}
                  />
                </TableCell>
              )}
              <TableCell className="w-30 text-center">{item.logo}</TableCell>
              <TableCell className="w-30 text-center">{item.name}</TableCell>
              <TableCell className="w-30 text-center">
                {item.isConsumable ? '소모품' : '대여 물품'}
              </TableCell>
              <TableCell className="w-30 text-center">
                {item.totalQuantity}
              </TableCell>
              <TableCell className="w-30 text-center">
                {item.rentedQuantity}
              </TableCell>
              {headers.includes('관리자 여부') && (
                <TableCell className="w-30 text-center">
                  {item.isAdmin !== undefined && (item.isAdmin ? 'o' : 'x')}
                </TableCell>
              )}
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
          {currentPage} / {Math.ceil(data.length / rowsPerPage)}
        </span>
        <Button
          className="bg-transparent shadow-transparent hover:bg-transparent"
          size="chevron"
          disabled={currentPage === Math.ceil(data.length / rowsPerPage)}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <ChevronRightIcon className="h-6 w-6 cursor-pointer text-black-primary" />
        </Button>
      </div>
    </div>
  );
}
