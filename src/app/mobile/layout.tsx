'use client';

import useAuthRedirect from '@/hooks/useAuthRedirect';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 제외할 경로 목록
  const excludedRoutes = ['/mobile/sign-in', '/mobile/sign-up'];

  const isExcluded = excludedRoutes.includes(pathname);

  useAuthRedirect();

  useEffect(() => {
    if (!isExcluded) {
      const originalBgColor = document.body.style.backgroundColor;
      document.body.style.backgroundColor = '#F3F4F6';

      return () => {
        document.body.style.backgroundColor = originalBgColor;
      };
    }

    return undefined;
  }, [isExcluded]);

  if (isExcluded) {
    // 레이아웃 없이 children만 렌더링
    return children;
  }

  return (
    <div className="flex min-h-screen justify-center">
      {/* 모바일 페이지 공통 좌우 여백(20px) - 화면 끝까지 채워야 하는 요소는 -mx-5 로 상쇄 */}
      <div className="flex w-full max-w-md flex-col px-5">{children}</div>
    </div>
  );
}
