import { NotificationCount } from '@/types/notificationType';
import PrivateAxiosInstance from '@/services/privateAxiosInstance';

// 반납해야할 물품 리스트 불러오기
// eslint-disable-next-line import/prefer-default-export
export const getNotificationCount = async (): Promise<NotificationCount> => {
  try {
    const response = await PrivateAxiosInstance.get<NotificationCount>(
      '/notifications/count',
    );

    return response.data;
  } catch (error) {
    throw new Error(`알림 개수 불러오기에 실패했습니다: ${error}`);
  }
};
