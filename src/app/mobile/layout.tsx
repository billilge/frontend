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
  }, [isExcluded]);

  if (isExcluded) {
    // 레이아웃 없이 children만 렌더링
    return children;
  }

  return (
    <div className="flex min-h-screen justify-center">
      <div className="flex w-full max-w-md flex-col">{children}</div>
    </div>
  );
}
