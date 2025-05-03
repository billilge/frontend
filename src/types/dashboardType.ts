export interface DashboardProps {
  rentalHistoryId?: number;
  itemName: string;
  itemImageUrl: string;
  renterName: string;
  studentId: string;
  status: string;
  applicatedAt: string;
  rentedCount: number;
  handleApproveBtnClick: () => void;
  handleCancelBtnClick: () => void;
}
