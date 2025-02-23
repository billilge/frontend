'use client';

import { useState, useEffect } from 'react';
import MobileLayout from '@/components/mobile/layout';
import { userNotificationGet } from '@/services/notification';
import NotificationItem from '@/components/mobile/NotificationItem';
import Header from '@/components/mobile/Header';
import { elapsedTime } from '@/utils/elapsedTime';
import { NotificationProps } from '@/types/notificationType';

type UserNotificationType = NotificationProps;

export default function Notification() {
  const [notificationDetail, setNotificationDetail] = useState<
    UserNotificationType[]
  >([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await userNotificationGet();
      setNotificationDetail(data.messages);
    };

    fetchNotifications();
  }, []);

  // TODO : 로그인 여부 확인 후 로그인 안 했으면 로그인 화면으로 보내기

  return (
    <MobileLayout>
      <Header title="알림" />
      {notificationDetail.length === 0 ? (
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
