// import IconBell from 'public/assets/icon-bell.svg';

interface NotificationItemProps {
  message: string;
  link: string;
  isRead: boolean;
  status: string;
  date: string;
}

export default function NotificationItem({
  message,
  link,
  isRead,
  status,
  date,
}: NotificationItemProps) {
  return <section>테스트</section>;
}
