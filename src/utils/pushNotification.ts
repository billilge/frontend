import { MessagePayload, onMessage } from 'firebase/messaging';
import { handleFCMToken, messaging } from '@/lib/firebase';

export const requestNotificationPermission = async () => {
  const { permission } = Notification;

  if (permission === 'granted') {
    await handleFCMToken();
  } else if (permission !== 'denied') {
    await Notification.requestPermission().then((newPermission) => {
      if (newPermission === 'granted') {
        alert('푸시 알림이 허용되었습니다.');
      } else if (newPermission === 'denied') {
        alert('푸시 알림이 거부되었습니다.');
      }
    });
  }
};

const onForegroundMessage = async () => {
  const messagingInstance = await messaging();

  if (messagingInstance != null) {
    onMessage(messagingInstance, (payload: MessagePayload) => {
      // console.log('포그라운드 메시지 수신:', payload);

      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(payload.notification?.title as string, {
          body: payload.notification?.body,
          icon: '/icons/manifest/icon-192x192.png',
        });
      });
    });
  }
};

onForegroundMessage();
