import { ReturnData } from '@/types/returnItemType';
import { RentalRequest } from '@/types/rentalRequestType';
import { RentalHistoriesData, RentalStatus } from '@/types/rentalItemType';
import PrivateAxiosInstance from '@/services/privateAxiosInstance';

// 반납해야할 물품 리스트 불러오기
export const getReturnItems = async (): Promise<ReturnData> => {
  try {
    const response = await PrivateAxiosInstance.get<ReturnData>(
      '/rentals/return-required',
    );

    return response.data;
  } catch (error) {
    throw new Error(`returnItem 목록 불러오기에 실패했습니다: ${error}`);
  }
};

// 대여 기록 불러오기
export const getRentalItems = async (
  rentalStatus?: RentalStatus,
): Promise<RentalHistoriesData> => {
  try {
    const response = await PrivateAxiosInstance.get<RentalHistoriesData>(
      '/rentals',
      {
        params: rentalStatus ? { rentalStatus } : {},
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(`대여 기록 불러오기에 실패했습니다: ${error}`);
  }
};

// 물품 대여 신청
export const requestItems = async (
  requestData: RentalRequest,
): Promise<void> => {
  try {
    await PrivateAxiosInstance.post('/rentals', requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // 중복 대여를 위해 에러를 그냥 throw 함
    throw error;
  }
};

// 대여 취소하기
export const cancelRentalItems = async (rentalHistoryId: number) => {
  try {
    const response = await PrivateAxiosInstance.patch(
      `/rentals/${rentalHistoryId}`,
      {},
      {},
    );

    return response.data;
  } catch (error) {
    throw new Error(`대여 취소에 실패했습니다: ${error}`);
  }
};

// 반납하기
export const returnRentalItems = async (rentalHistoryId: number) => {
  try {
    const response = await PrivateAxiosInstance.patch(
      `/rentals/return/${rentalHistoryId}`,
      {},
      {},
    );

    return response.data;
  } catch (error) {
    throw new Error(`물품 반납에 실패했습니다: ${error}`);
  }
};
