'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PwaInstallBottomSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) return undefined;
    if (localStorage.getItem('pwaInstallDismissed')) return undefined;

    setShouldRender(true);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsOpen(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const timer = setTimeout(() => {
      setIsOpen((prev) => prev || true);
    }, 1500);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
    handleClose();
  };

  const handleDismiss = () => {
    localStorage.setItem('pwaInstallDismissed', 'true');
    handleClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleDismiss();
    }
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Overlay */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        onClick={handleOverlayClick}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <div
          className={`mx-5 w-full max-w-[320px] transform rounded-[16px] bg-white transition-all duration-300 ${
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          style={{ pointerEvents: 'auto' }}
        >
          {/* 컨텐츠 영역 */}
          <div className="flex flex-col px-6 pb-6 pt-7">
            {/* 타이틀 + 설명 */}
            <div className="flex flex-col gap-2 pb-5">
              <h2 className="text-center text-[20px] font-bold leading-[29px] text-black-primary">
                앱처럼 사용해 보세요
              </h2>
              <p className="text-center text-[15px] leading-[22px] text-gray-secondary">
                빌릴게를 홈 화면에 추가하면
                <br />
                알림을 받을 수 있습니다.
              </p>
            </div>

            {/* 설치 안내 */}
            <div className="mb-6 flex flex-col gap-3 rounded-[12px] bg-gray-tertiary px-4 py-[14px] text-[13px] leading-[19px]">
              <div className="flex flex-col gap-[2px]">
                <span className="font-semibold text-black-primary">
                  데스크톱 (Chrome/Edge)
                </span>
                <span className="text-gray-secondary">
                  아래 설치 버튼 또는 주소창 오른쪽 설치 아이콘 클릭
                </span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="font-semibold text-black-primary">
                  iOS (Safari)
                </span>
                <span className="text-gray-secondary">
                  공유 버튼 → &quot;홈 화면에 추가&quot; 선택
                </span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="font-semibold text-black-primary">
                  Android (Chrome)
                </span>
                <span className="text-gray-secondary">
                  메뉴(⋮) → &quot;앱 설치&quot; 선택
                </span>
              </div>
            </div>

            {/* CTA 버튼 */}
            <button
              type="button"
              onClick={handleInstall}
              className="w-full rounded-[12px] bg-return-blue py-[15px] text-[16px] font-semibold text-white-primary transition-colors active:bg-blue-600"
            >
              홈 화면에 추가할래요
            </button>

            {/* 닫기 */}
            <button
              type="button"
              onClick={handleDismiss}
              className="mt-3 w-full py-2 text-[14px] font-medium text-gray-secondary"
            >
              괜찮아요 웹으로 볼게요
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
