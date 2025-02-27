import { WelfareItemData } from '@/types/welfareItemType';
import PrivateAxiosInstance from '@/services/privateAxiosInstance';

// 대여 가능한 복지물품 리스트 불러오기
// eslint-disable-next-line import/prefer-default-export
export const getWelfareItems = async (
  searchQuery?: string,
): Promise<WelfareItemData> => {
  try {
    const response = await PrivateAxiosInstance.get<WelfareItemData>('/items', {
      params: searchQuery ? { search: searchQuery } : {}, // 검색어가 있으면 추가
    });

    return response.data;
  } catch (error) {
    throw new Error(`welfare 목록 불러오기에 실패했습니다: ${error}`);
  }
};
