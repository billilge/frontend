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
  selected: string[];
  setSelected: (selectedIds: (prev: string[]) => string[]) => void;
  handleDelete?: (selectedIds: string[]) => void;
}
