import React from 'react';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="flex h-svh max-w-3xl flex-col bg-[#F3F4F6]">{children}</div>
  );
}
