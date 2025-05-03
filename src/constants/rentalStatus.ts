export const RENTAL_STATUS = {
  PENDING: 'PENDING',
  CANCEL: 'CANCEL',
  REJECTED: 'REJECTED',
  CONFIRMED: 'CONFIRMED',
  RENTAL: 'RENTAL',
  RETURN_PENDING: 'RETURN_PENDING',
  RETURN_CONFIRMED: 'RETURN_CONFIRMED',
  RETURNED: 'RETURNED',
};

export type RentalStatus = (typeof RENTAL_STATUS)[keyof typeof RENTAL_STATUS];

export const RentalStatusText: Record<RentalStatus, string> = {
  [RENTAL_STATUS.PENDING]: '대여 요청',
  [RENTAL_STATUS.CANCEL]: '대기 취소',
  [RENTAL_STATUS.REJECTED]: '대여 반려',
  [RENTAL_STATUS.CONFIRMED]: '대여 승인',
  [RENTAL_STATUS.RENTAL]: '대여 중',
  [RENTAL_STATUS.RETURN_PENDING]: '반납 요청',
  [RENTAL_STATUS.RETURN_CONFIRMED]: '반납 승인',
  [RENTAL_STATUS.RETURNED]: '반납 완료',
} as const;

export type RentalStatusTypes = keyof typeof RentalStatusText;
