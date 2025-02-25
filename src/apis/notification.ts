import axios from 'axios';
import { NotificationCount } from '@/types/notificationType';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URI;
const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

// 반납해야할 물품 리스트 불러오기
// eslint-disable-next-line import/prefer-default-export
export const getNotificationCount = async (): Promise<NotificationCount> => {
  try {
    const response = await axios.get<NotificationCount>(
      `${apiUrl}/notifications/count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(`알림 개수 불러오기에 실패했습니다: ${error}`);
  }
};
