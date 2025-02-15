import React from 'react';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="flex max-w-3xl flex-col items-center justify-center">
      {children}
    </div>
  );
}
