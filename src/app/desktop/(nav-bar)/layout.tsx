'use client';

import useAuthRedirect from '@/hooks/useAuthRedirect';
import React from 'react';
import NavBar from '@/components/desktop/NavBar/NavBar';

interface NavBarLayoutProps {
  children: React.ReactNode;
}

export default function NavBarLayout({ children }: NavBarLayoutProps) {
  useAuthRedirect();

  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
