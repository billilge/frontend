import MobileLayout from '@/components/mobile/layout';
import NotificationItem from '@/components/mobile/common/NotificationItem';
import { elapsedTime } from '@/utils/elapsedTime';
import { NotificationProps } from '@/types/notificationType';

const NotificationDetail: UserNotificationType[] = [
  {
    notificationId: 0,
    message: '메시지 1입니다',
    link: '/desktop/login',
    isRead: false,
    status: 'USER_RENTAL_APPLY',
    createdAt: '2025-02-16T08:44:45.476Z',
  },
  {
    notificationId: 1,
    message: '메시지 2입니다',
    link: '/mobile',
    isRead: true,
    status: 'USER_RENTAL_REJECTED',
    createdAt: '2025-02-16T06:44:45.476Z',
  },
  {
    notificationId: 2,
    message:
      '메시지 두 줄 테스트입니다 두 줄 테스트 두 줄 테스트 두 줄 테스트 두 줄 테스트',
    link: '/mobile',
    isRead: true,
    status: 'USER_RETURN_APPLY',
    createdAt: '2025-02-12T05:44:45.476Z',
  },
];

type UserNotificationType = NotificationProps;

export default function Notification() {
  return (
    <MobileLayout>
      {NotificationDetail.map((item) => (
        <NotificationItem
          key={item.notificationId}
          message={item.message}
          link={item.link}
          isRead={item.isRead}
          status={item.status}
          createdAt={elapsedTime(item.createdAt)}
        />
      ))}
    </MobileLayout>
  );
}
