export interface DashboardProps {
  rentalHistoryId?: number;
  itemName: string;
  itemImageUrl: string;
  renterName: string;
  studentId: string;
  status: string;
  rentAt: string;
  rentedCount: number;
  handleApproveBtnClick: () => void;
  handleCancelBtnClick: () => void;
}
