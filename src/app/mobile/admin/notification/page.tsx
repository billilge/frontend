import MobileLayout from '@/components/mobile/layout';
import NotificationItem from '@/components/mobile/common/NotificationItem';

const test = [
  {
    notificationId: 0,
    message: '메시지 1입니다',
    link: '/desktop/login',
    isRead: false,
    status: '대여',
    date: 'ㄴㄴ',
  },
  {
    notificationId: 1,
    message: '메시지 2입니다',
    link: '/mobile',
    isRead: true,
    status: '반납',
    date: 'ㄴㄴ',
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
