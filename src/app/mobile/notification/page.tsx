'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  userNotificationGet,
  readNotificationPatch,
  readNotificationAllPatch,
} from '@/services/notification';
import NotificationItem from '@/components/mobile/NotificationItem';
import Header from '@/components/mobile/Header';
import { elapsedTime } from '@/utils/elapsedTime';
import { NotificationProps } from '@/types/notificationType';
import Cookies from 'js-cookie';

type UserNotificationType = NotificationProps;

export default function Notification() {
  const router = useRouter();

  const [notificationDetail, setNotificationDetail] = useState<
    UserNotificationType[]
  >([]);

  useEffect(() => {
    const user = Cookies.get('user');

    if (!user) {
      alert('로그인 후 사용 가능합니다.');
      router.push('/mobile/sign-in');
    }
  }, [router]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await userNotificationGet();
      setNotificationDetail(data.messages);
    };

    fetchNotifications();
  }, []);

  const handleReadNotification = async (notificationId: number) => {
    await readNotificationPatch(notificationId);
  };

  const handleClickAllNotification = async () => {
    await readNotificationAllPatch();
    window.location.reload();
  };

  return (
    <div>
      <Header title="알림" />
      {notificationDetail?.length === 0 ? (
        <div className="flex h-dvh items-center justify-center text-gray-secondary">
          현재 알림이 없습니다.
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-end px-4 py-1">
            <button
              type="button"
              onClick={handleClickAllNotification}
              className="text-xs font-medium text-gray-secondary"
            >
              모두 읽음으로 표시
            </button>
          </div>

          {notificationDetail.map((item) => (
            <NotificationItem
              key={item.notificationId}
              message={item.message}
              link={item.link}
              isRead={item.isRead}
              status={item.status}
              createdAt={elapsedTime(item.createdAt)}
              handleNotification={() =>
                item.notificationId &&
                handleReadNotification(item.notificationId)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
