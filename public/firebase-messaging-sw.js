importScripts(
  'https://www.gstatic.com/firebasejs/11.3.1/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/11.3.1/firebase-messaging-compat.js',
);

firebase.initializeApp({
  apiKey: 'AIzaSyA0pr7lINzMVq0xQZ188q0NLEttqjfYGLI',
  authDomain: 'billilge.firebaseapp.com',
  projectId: 'billilge',
  storageBucket: 'billilge.firebasestorage.app',
  messagingSenderId: '844345727512',
  appId: '1:844345727512:web:79ff7ebdb7d5da1291816d',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  //console.log('백그라운드 메시지 수신: ', payload);
  if (!payload.notification) return;

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/icons/manifest/icon-192x192.png',
  });
});
