const registerFirebaseServiceWorker = () => {
  console.log('register service worker');
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then(async (registration) => {
        console.log('Service Worker 등록 완료:', registration);
      })
      .catch((error) => {
        console.error('Service Worker 등록 실패:', error);
      });
  } else {
    console.warn('Service Worker가 지원되지 않는 환경입니다.');
  }
};

registerFirebaseServiceWorker();
