import MobileLayout from '@/components/mobile/layout';
import NotificationItem from '@/components/mobile/common/NotificationItem';
import { elapsedTime } from '@/utils/elapsedTime';

const NotificationDetail = [
  {
    notificationId: 0,
    message: '메시지 1입니다',
    link: '/desktop/login',
    isRead: false,
    status: 'ADMIN_RETNAL_APPLY',
    createdAt: '2025-02-16T08:44:45.476Z',
  },
  {
    notificationId: 1,
    message: '메시지 2입니다',
    link: '/mobile',
    isRead: true,
    status: 'ADMIN_RENTAL_CANCEL',
    createdAt: '2025-02-16T06:44:45.476Z',
  },
  {
    notificationId: 2,
    message:
      '메시지 두 줄 테스트입니다 두 줄 테스트 두 줄 테스트 두 줄 테스트 두 줄 테스트',
    link: '/mobile',
    isRead: true,
    status: 'ADMIN_RETURN_APPLY',
    createdAt: '2025-02-12T05:44:45.476Z',
  },
];

export default function Notification() {
  return (
    <MobileLayout>
      <div className="w-full bg-main-primary">알람 페이지임미다</div>
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
