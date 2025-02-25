import axios from 'axios';
import { WelfareItemData } from '@/types/welfareItemType';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URI;
const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

// 대여 가능한 복지물품 리스트 불러오기
export const getWelfareItems = async (
  searchQuery?: string,
): Promise<WelfareItemData> => {
  try {
    const response = await axios.get<WelfareItemData>(`${apiUrl}/items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: searchQuery ? { search: searchQuery } : {}, // 검색어가 있으면 추가
    });

    return response.data;
  } catch (error) {
    throw new Error(`welfare 목록 불러오기에 실패했습니다: ${error}`);
  }
};
