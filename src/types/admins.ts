export interface Admins {
  memberId: number;
  name: string;
  studentId: string;
}

export interface TableComponentProps {
  admins: Admins[];
  showCheckboxes?: boolean;
  headers?: string[];
  selected: number[];
  setSelected: (selectedIds: (prev: number[]) => number[]) => void;
  handleDelete?: (selectedIds: string[]) => void;
}
