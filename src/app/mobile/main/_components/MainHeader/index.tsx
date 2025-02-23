'use client';

import { useRouter } from 'next/navigation';
import Sidebar from '@/components/mobile/SidebarMenu/index';
import { useState } from 'react';
import IconAlarm from 'public/assets/icons/icon-alarm.svg';
import IconHamburger from 'public/assets/icons/icon-hamburger.svg';

interface HeaderProps {
  name: string;
}

export default function MainHeader({ name }: HeaderProps) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <section className="fixed top-0 z-10 flex h-10 w-full items-center justify-between bg-[#F3F4F6] px-4 py-1.5">
        <div className="text-heading-3_D font-semibold text-black-primary">
          {name}님
        </div>
        <div className="flex gap-[7px]">
          <button
            className="h-6 w-6 items-center justify-center"
            type="button"
            onClick={() => router.push('/mobile/notification')}
          >
            <IconAlarm />
          </button>
          <button
            className="h-6 w-6 items-center justify-center"
            type="button"
            onClick={() => setIsSidebarOpen(true)}
          >
            <IconHamburger />
          </button>
        </div>
      </section>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
