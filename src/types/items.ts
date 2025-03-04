import { PaginationProps } from '@/types/paginationType';

export interface Item {
  itemId: number;
  itemName: string;
  itemType: string;
  count: number;
  renterCount: number;
  imageUrl: string;
}

export interface ItemTableProps extends PaginationProps {
  items: Item[];
  showCheckboxes?: boolean;
  headers?: string[];
  selected: number;
  setSelected: (selectedIds: number) => void;
  handleDelete?: (selectedIds: string) => void;
  onEdit?: (selectedId: number) => void;
}

export const ItemTypeText: Record<string, string> = {
  CONSUMPTION: '소모품',
  RENTAL: '대여품',
} as const;
