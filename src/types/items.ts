export interface Item {
  itemId: number;
  itemName: string;
  itemType: string;
  count: number;
  renterCount: number;
  imageUrl: string;
}

export interface ItemTableProps {
  items: Item[];
  showCheckboxes?: boolean;
  headers?: string[];
  selected: number;
  setSelected: (selectedIds: number) => void;
  handleDelete?: (selectedIds: string) => void;
}
