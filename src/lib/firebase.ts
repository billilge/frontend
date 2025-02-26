import { initializeApp } from 'firebase/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getMessaging, getToken } from '@firebase/messaging';
import postFCMToken from '@/services/fcm';
import { isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER}`,
  appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`,
  measurementId: `${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`,
};

const app = initializeApp(firebaseConfig);
export const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

export const handleFCMToken = async () => {
  const messagingInstance = await messaging();
  if (messagingInstance == null) {
    return;
  }

  await getToken(messagingInstance, {
    vapidKey: VAPID_KEY,
  })
    .then(async (currentToken) => {
      if (!currentToken) {
        alert('알림을 허용해 주세요.');
      } else {
        console.log('currentToken', currentToken);
        localStorage.setItem('fcmToken', currentToken);
        await postFCMToken(currentToken);
      }
    })
    .catch((error) => {
      console.error('fcm token error', error);
    });
};
