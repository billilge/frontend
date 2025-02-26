'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MobileLayout from '@/components/mobile/layout';
import NotificationItem from '@/components/mobile/NotificationItem';
import Header from '@/components/mobile/Header';
import { elapsedTime } from '@/utils/elapsedTime';
import { NotificationProps } from '@/types/notificationType';
import {
  adminNotificationGet,
  readNotificationPost,
} from '@/services/notification';

type AdminNotificationType = NotificationProps;

export default function Notification() {
  const router = useRouter();

  const [notificationDetail, setNotificationDetail] = useState<
    AdminNotificationType[]
  >([]);

  useEffect(() => {
    const user = localStorage.getItem('user') || '{}';

    const parsedUser = JSON.parse(user);

    if (parsedUser.role !== 'ADMIN' || !user) {
      alert('관리자만 사용 가능한 페이지입니다.');
      router.push('/mobile/main');
    }
  }, [router]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await adminNotificationGet();
      setNotificationDetail(data.messages);
    };

    fetchNotifications();
  }, []);

  const handleReadNotification = async (notificationId: number) => {
    await readNotificationPost(notificationId);
  };

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
            handleNotification={() =>
              item.notificationId && handleReadNotification(item.notificationId)
            }
          />
        ))
      )}
    </MobileLayout>
  );
}
