import React from 'react';
import { Toaster } from 'react-hot-toast';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
}
