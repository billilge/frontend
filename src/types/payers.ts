export interface Payer {
  payerId: number;
  name: string;
  studentId: string;
  registered: boolean;
}

export interface TableComponentProps {
  payers: Payer[];
  showCheckboxes?: boolean;
  headers?: string[];
  selected: number[];
  setSelected: (selectedIds: (prev: number[]) => number[]) => void;
  handleDelete?: (selectedIds: string[]) => void;
}
