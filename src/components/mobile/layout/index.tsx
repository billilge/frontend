'use client';

import useAuthRedirect from '@/hooks/useAuthRedirect';
import React, { useEffect, useState } from 'react';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const [style, setStyle] = useState({});

  useAuthRedirect();

  useEffect(() => {
    // 기존 body 배경색 저장
    const originalBgColor = document.body.style.backgroundColor;

    // MobileLayout이 마운트될 때 배경색 적용(모바일에서만 적용하기 위함)
    document.body.style.backgroundColor = '#F3F4F6';

    // setStyle({ '--main--position--': '350px' });

    return () => {
      // MobileLayout이 언마운트될 때 원래 배경색 복구
      document.body.style.backgroundColor = originalBgColor;
    };
  }, []);

  return (
    <div className="flex min-h-screen justify-center" style={style}>
      <div className="flex w-full max-w-md flex-col">{children}</div>
    </div>
  );
}
