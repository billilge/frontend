'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  AdminNotificationText,
  AdminNotificationTypes,
  UserNotificationText,
} from '@/constants/notificationStatus';
import { NotificationProps } from '@/types/notificationType';
import IconBell from 'public/assets/icons/icon-bell.svg';

export default function NotificationItem({
  message,
  link,
  isRead,
  status,
  createdAt,
  handleNotification = () => {},
}: NotificationProps) {
  const router = useRouter();

  const isAdminStatus = (
    notificationStatus: string,
  ): notificationStatus is AdminNotificationTypes =>
    notificationStatus.startsWith('ADMIN');

  const handleClick = () => {
    handleNotification();
    router.push(link);
  };

  return (
    <button
      type="button"
      className={cn(
        'flex w-full gap-2.5 p-5',
        isRead ? '' : 'bg-main-tertiary',
      )}
      onClick={handleClick}
    >
      <div className="flex h-4 w-4">
        <IconBell />
      </div>

      <section className="flex w-full flex-col items-start gap-2.5 text-left text-sm font-medium">
        <section className="flex w-full justify-between text-xs">
          <div
            className={cn(
              'font-medium',
              /REJECTED|CANCEL/.test(status)
                ? 'text-return-red'
                : 'text-return-blue',
            )}
          >
            {isAdminStatus(status)
              ? AdminNotificationText[status]
              : UserNotificationText[status]}
          </div>
          <div className="font-medium text-gray-secondary">{createdAt}</div>
        </section>
        {message}
      </section>
    </button>
  );
}
