const registerFirebaseServiceWorker = () => {
  if (typeof window === 'undefined') {
    return; // 서버에서는 실행되지 않도록 검사
  }

  console.log('register service worker');

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .getRegistration('/firebase-messaging-sw.js')
      .then((registration) => {
        if (!registration) {
          navigator.serviceWorker
            .register('/firebase-messaging-sw.js')
            .then(async (newRegistration) => {
              console.log('Service Worker 등록 완료:', newRegistration);
            })
            .catch((error) => {
              console.error('Service Worker 등록 실패:', error);
            });
        }
      });
  } else {
    console.warn('Service Worker가 지원되지 않는 환경입니다.');
  }
};

// 클라이언트 사이드에서만 실행
if (typeof window !== 'undefined') {
  registerFirebaseServiceWorker();
}
