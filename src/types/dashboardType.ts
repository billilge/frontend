export interface DashboardProps {
  rentalHistoryId?: number;
  itemName: string;
  imageUrl: string;
  renterName: string;
  studentId: string;
  status: string;
  applicatedAt: string;
  handleApproveBtnClick: () => void;
  handleCancelBtnClick: () => void;
}
