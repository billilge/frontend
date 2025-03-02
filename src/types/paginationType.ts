export interface PaginationProps {
  currentPage?: number;
  totalPage?: number;
  onPageChange?: (pageAction: PageChangeAction) => void;
}

export type PageChangeAction = 'PREV' | 'NEXT';
