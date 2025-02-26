import { MessagePayload, onMessage } from 'firebase/messaging';
import { handleFCMToken, messaging } from '@/lib/firebase';

export const requestNotificationPermission = async () => {
  await Notification.requestPermission().then(async (permission) => {
    if (permission === 'granted') {
      await handleFCMToken();
    } else {
      alert('알림이 허용되지 않았습니다.');
    }
  });
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
