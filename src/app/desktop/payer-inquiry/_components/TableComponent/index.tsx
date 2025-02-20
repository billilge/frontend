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

interface Invoice {
  name: string;
  student_id: string;
  admin?: boolean;
}

interface TableComponentProps {
  data: Invoice[];
  showCheckboxes?: boolean; // 고민이에요... ESLint: propType "handleDelete" is not required, but has no corresponding defaultProps declaration 에러가 뜸
  headers?: string[];
  selected: string[];
  setSelected: (selectedIds: (prev: string[]) => string[]) => void;
  handleDelete?: (selectedIds: string[]) => void; // 22
}

function TableComponent({
  data,
  showCheckboxes = true,
  headers = ['이름', '학번', '관리자 여부'], // 기본값을 설정
  selected,
  setSelected,
  handleDelete = () => {}, // 기본값으로 빈 함수 설정
}: TableComponentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleSelect = (student_id: string) => {
    setSelected((prev: string[]) =>
      prev.includes(student_id)
        ? prev.filter((id) => id !== student_id)
        : [...prev, student_id],
    );
  };

  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handleSelectAll = () => {
    const visibleIds = paginatedData.map((item) => item.student_id);
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
            {headers.map((header, index) => (
              <TableHead key={index} className="w-30 text-center">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.student_id}>
              {showCheckboxes && (
                <TableCell className="w-10 text-center">
                  <Checkbox
                    checked={selected.includes(item.student_id)}
                    onCheckedChange={() => handleSelect(item.student_id)}
                  />
                </TableCell>
              )}
              <TableCell className="w-30 text-center">{item.name}</TableCell>
              <TableCell className="w-30 text-center">
                {item.student_id}
              </TableCell>
              {headers.includes('관리자 여부') && (
                <TableCell className="w-30 text-center">
                  {item.admin !== undefined ? (item.admin ? 'o' : 'x') : ''}
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
      {/* {showCheckboxes && selected.length > 0 && ( */}
      {/*   <div className="pt-4 text-right"> */}
      {/*     <Button */}
      {/*       className="bg-gray-primary text-white" */}
      {/*       onClick={() => handleDelete && handleDelete(selected)} */}
      {/*     > */}
      {/*       완료 */}
      {/*     </Button> */}
      {/*   </div> */}
      {/* )} */}
    </div>
  );
}

// defaultProps를 사용하여 headers에 기본값 설정
TableComponent.defaultProps = {
  headers: ['이름', '학번', '관리자 여부'],
};

export default TableComponent;
