import { PaginationProps } from '@/types/paginationType';

export interface Admins {
  memberId: number;
  name: string;
  studentId: string;
}

export interface TableComponentProps extends PaginationProps {
  admins: Admins[];
  showCheckboxes?: boolean;
  headers?: string[];
  selected: number[];
  setSelected: (selectedIds: (prev: number[]) => number[]) => void;
  handleDelete?: (selectedIds: string[]) => void;
}
