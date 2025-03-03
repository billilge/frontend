'use client';

import useAuthRedirect from '@/hooks/useAuthRedirect';
import React from 'react';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  useAuthRedirect();

  return <div>{children}</div>;
}
