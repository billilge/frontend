export interface Member {
  name: string;
  studentId: string;
}

export interface Rentals {
  rentalHistoryId: number;
  itemName: string;
  rentAt: string;
  returnedAt: string | null; // 반납 여부
  rentalStatus: string;
  member: Member; // 대여자 정보 추가
  count?: number; // 물품 수량 (필요시 추가)
}

export interface RentalsTableProps {
  rentalHistories: Rentals[];
  headers?: string[];
}
