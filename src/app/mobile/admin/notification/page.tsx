'use client';

import { useEffect, useState } from 'react';
import MobileLayout from '@/components/mobile/layout';
import NotificationItem from '@/components/mobile/NotificationItem';
import Header from '@/components/mobile/Header';
import { elapsedTime } from '@/utils/elapsedTime';
import { NotificationProps } from '@/types/notificationType';
import { adminNotificationGet } from '@/services/notification';

type AdminNotificationType = NotificationProps;

export default function Notification() {
  const [notificationDetail, setNotificationDetail] = useState<
    AdminNotificationType[]
  >([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await adminNotificationGet();
      setNotificationDetail(data.messages);
    };

    fetchNotifications();
  }, []);

  return (
    <MobileLayout>
      <Header title="관리자 알림" />
      {notificationDetail?.length === 0 ? (
        <div className="flex h-dvh items-center justify-center text-gray-secondary">
          현재 알림이 없습니다.
        </div>
      ) : (
        notificationDetail.map((item) => (
          <NotificationItem
            key={item.notificationId}
            message={item.message}
            link={item.link}
            isRead={item.isRead}
            status={item.status}
            createdAt={elapsedTime(item.createdAt)}
          />
        ))
      )}
    </MobileLayout>
  );
}
