import axios from 'axios';
import { ReturnData } from '@/types/returnItemType';
import { RentalRequest } from '@/types/rentalRequestType';
import { RentalHistoriesData, RentalStatus } from '@/types/rentalItemType';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const token = process.env.NEXT_PUBLIC_TOKEN;

// 반납해야할 물품 리스트 불러오기
export const getReturnItems = async (): Promise<ReturnData> => {
  try {
    const response = await axios.get<ReturnData>(
      `${apiUrl}/rentals/return-required`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
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
    const response = await axios.get<RentalHistoriesData>(`${apiUrl}/rentals`, {
      params: rentalStatus ? { rentalStatus } : {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    await axios.post(`${apiUrl}/rentals`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error(`복지 물품 신청에 실패했습니다: ${error}`);
  }
};

// 대여 취소하기
export const cancelRentalItems = async (rentalHistoryId: number) => {
  try {
    const response = await axios.patch(
      `${apiUrl}/rentals/${rentalHistoryId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(`대여 취소에 실패했습니다: ${error}`);
  }
};

// 반납하기
export const returnRentalItems = async (rentalHistoryId: number) => {
  try {
    const response = await axios.patch(
      `${apiUrl}/rentals/return/${rentalHistoryId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(`물품 반납에 실패했습니다: ${error}`);
  }
};
