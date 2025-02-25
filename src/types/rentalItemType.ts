export interface Member {
  name: string;
  studentId: string;
}

export interface Item {
  itemName: string;
  imageUrl: string;
}

export type RentalStatus =
  | 'PENDING' // 승인 대기 중
  | 'CANCEL' // 대기 취소
  | 'CONFIRMED' // 승인 완료
  | 'REJECTED' // 대여 불가
  | 'RENTAL' // 대여 중
  | 'RETURN_PENDING' // 반납 대기 중
  | 'RETURN_CONFIRMED' // 반납 승인
  | 'RETURNED'; // 반납 완료

export interface RentalHistory {
  rentalHistoryId: number;
  member: Member;
  item: Item;
  rentAt: string;
  returnedAt: string | null;
  rentalStatus: RentalStatus;
}

export interface RentalHistoriesData {
  rentalHistories: RentalHistory[];
}
