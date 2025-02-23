'use client';

import { useRouter } from 'next/navigation';
import Sidebar from '@/components/mobile/SidebarMenu/index';
import { useState } from 'react';
import IconArrow from 'public/assets/icons/icon-arrow.svg';
import IconHamburger from 'public/assets/icons/icon-hamburger.svg';

interface HeaderProps {
  title: string;
  menu?: boolean;
}

export default function Header({ title, menu = false }: HeaderProps) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <section className="h-8.5 flex w-full items-center justify-between px-4 py-1.5">
        <button
          className="h-6 w-6 items-center justify-center"
          type="button"
          onClick={() => router.back()}
        >
          <IconArrow />
        </button>
        <div className="font-medium leading-6 text-black-primary">{title}</div>
        {menu ? (
          <button
            className="h-6 w-6 items-center justify-center"
            type="button"
            onClick={() => setIsSidebarOpen(true)}
          >
            <IconHamburger />
          </button>
        ) : (
          <div className="h-6 w-6" />
        )}
      </section>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
