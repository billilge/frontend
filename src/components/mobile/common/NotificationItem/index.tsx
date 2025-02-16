import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  AdminNotificationText,
  AdminNotificationTypes,
} from '@/constants/notificationStatus';
// import IconBell from 'public/assets/icon-bell.svg';

interface NotificationItemProps {
  message: string;
  link: string;
  isRead: boolean;
  status: AdminNotificationTypes;
  createdAt: string;
}

export default function NotificationItem({
  message,
  link,
  isRead,
  status,
  createdAt,
}: NotificationItemProps) {
  return (
    <Link className="w-full" href={link}>
      <section
        className={cn(
          'flex w-full gap-2.5 p-5',
          isRead ? '' : 'bg-main-tertiary',
        )}
      >
        <div className="flex h-4 w-4">{/* <IconBell /> */}</div>

        <section className="flex w-full flex-col items-start gap-2.5 text-sm font-medium">
          <section className="flex w-full justify-between">
            <div
              className={cn(
                'text-[12px] font-medium',
                /REJECTED|CANCEL/.test(status)
                  ? 'text-return-red'
                  : 'text-return-blue',
              )}
            >
              {AdminNotificationText[status]}
            </div>
            <div className="text-[12px] font-medium text-gray-secondary">
              {createdAt}
            </div>
          </section>
          {message}
        </section>
      </section>
    </Link>
  );
}

// TODO : 아이콘 세팅해야 함 -> 머지 후 재시도
