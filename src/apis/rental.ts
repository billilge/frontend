import axios from 'axios';
import { ReturnData } from '@/types/returnItemType';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const token = process.env.NEXT_PUBLIC_TOKEN;

// 연구 정보 불러오기 (고정된 토큰 추가)
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
