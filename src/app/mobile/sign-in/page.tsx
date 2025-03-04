'use client';

import ImageLoginLogo from 'public/assets/images/image-login-logo.svg';
import IconGoogle from 'public/assets/icons/icon-google.svg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUA } from 'react-device-detect';
import Alert from '@/components/mobile/Alert';

export default function SignIn() {
  const router = useRouter();
  const [alertState, setAlertState] = useState(false);

  const handleAlertOpen = () => {
    setAlertState(true);
  };

  const handleAlertClose = () => {
    setAlertState(false);
  };

  const handleInAppBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const redirectToExternalBrowser = () => {
      const targetUrl = 'https://billilge.site/mobile/sign-in';

      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        const safariUrl = `safari://${targetUrl.replace(/https?:\/\//i, '')}`;
        window.location.href = safariUrl;
      } else {
        window.location.href = `intent://${targetUrl.replace(
          /https?:\/\//i,
          '',
        )}#Intent;scheme=http;package=com.android.chrome;end`;
      }
    };

    if (/kakaotalk/i.test(userAgent)) {
      window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(
        'https://billilge.site/mobile/sign-in',
      )}`;
    } else if (/line/i.test(userAgent)) {
      const targetUrl = 'https://billilge.site/mobile/sign-in';
      window.location.href = targetUrl.includes('?')
        ? `${targetUrl}&openExternalBrowser=1`
        : `${targetUrl}?openExternalBrowser=1`;
    } else if (
      /inapp|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone.*whale|android.*whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill\/[^1]/i.test(
        userAgent,
      )
    ) {
      redirectToExternalBrowser();
    }
  };

  const handleLogin = () => {
    if (
      getUA.match(
        /inapp|KAKAOTALK|FBAV|Line|Instagram|wadiz|kakaostory|band|twitter|DaumApps|everytimeapp|whatsApp|electron|aliapp|zumapp|iphone.*whale|android.*whale|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill/i,
      )
    ) {
      handleAlertOpen();
    } else {
      window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URI}/oauth2/authorization/google`;
    }
  };

  const alertConfirmText =
    '인앱 브라우저는 구글 로그인을 \n사용할 수 없습니다.';

  const copyToClipboard = async (text: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        alert('복사에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      // navigator.clipboard가 사용 불가능한 경우
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
      } catch (e) {
        alert('복사에 실패했습니다. 다시 시도해주세요.');
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  const handleAlertConfirm = async () => {
    handleInAppBrowser();
    copyToClipboard('https://billilge.site/mobile/sign-in');
    setAlertState(false);
  };

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      router.replace('/mobile/main');
    }
  }, []);

  return (
    <section className="relative flex h-dvh w-full flex-col items-center justify-start overflow-hidden">
      <section className="mt-[128px] flex flex-col items-center justify-start gap-1.5">
        <div className="text-2xl font-normal">
          국민대학교 소프트웨어융합대학
        </div>
        <div className="text-3xl font-semibold">복지물품 대여 시스템</div>
      </section>
      <ImageLoginLogo className="absolute top-24" />
      <button
        className="absolute bottom-44 flex w-11/12 max-w-md justify-between rounded-2xl border bg-white-primary px-6 py-4"
        type="button"
        onClick={handleLogin}
      >
        <IconGoogle />
        <div className="flex font-medium">Google로 시작하기</div>
        <div className="h-6 w-6" />
      </button>
      {alertState && (
        <Alert
          content={alertConfirmText}
          isMainColor
          ctaButtonText="URL 복사하기"
          otherButtonText="닫기"
          onClickCta={handleAlertConfirm}
          onClickOther={handleAlertClose}
        />
      )}
    </section>
  );
}
