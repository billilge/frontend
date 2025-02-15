import MobileLayout from '@/components/mobile/layout';
import NotificationItem from '@/components/mobile/common/NotificationItem';

const test = [
  {
    notificationId: 0,
    message: '메시지 1입니다',
    link: '/desktop/login',
    isRead: false,
    status: '대여',
    date: '10',
  },
  {
    notificationId: 1,
    message: '메시지 2입니다',
    link: '/mobile',
    isRead: true,
    status: '반납',
    date: '20',
  },
  {
    notificationId: 2,
    message:
      '메시지 두 줄 테스트입니다 두 줄 테스트 두 줄 테스트 두 줄 테스트 두 줄 테스트',
    link: '/mobile',
    isRead: true,
    status: '반납',
    date: '20',
  },
];

export default function Notification() {
  return (
    <MobileLayout>
      <div className="w-full bg-main-primary">알람 페이지임미다</div>
      {test.map((item) => (
        <NotificationItem
          key={item.notificationId}
          message={item.message}
          link={item.link}
          isRead={item.isRead}
          status={item.status}
          date={item.date}
        />
      ))}
    </MobileLayout>
  );
}
