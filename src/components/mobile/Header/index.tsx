'use client';

import { useRouter } from 'next/navigation';
import Sidebar from '@/components/mobile/SidebarMenu/index';
import { useEffect, useState } from 'react';
import IconArrow from 'public/assets/icons/icon-arrow.svg';
import IconHamburger from 'public/assets/icons/icon-hamburger.svg';

interface HeaderProps {
  title: string;
  menu?: boolean;
}

export default function Header({ title, menu = false }: HeaderProps) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    id: string;
    role: string;
  } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <section className="sticky top-0 flex h-9 w-full items-center justify-between bg-[#F3F4F6] px-4 py-1.5">
        <button
          className="h-6 w-6 items-center justify-center"
          type="button"
          onClick={() => router.back()}
        >
          <IconArrow className="scale-125" />
        </button>
        <div className="font-semibold leading-6 text-black-primary">
          {title}
        </div>
        {menu ? (
          <button
            className="h-6 w-6 items-center justify-center"
            type="button"
            onClick={() => setIsSidebarOpen(true)}
          >
            <IconHamburger className="scale-125" />
          </button>
        ) : (
          <div className="h-6 w-6" />
        )}
      </section>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        role={user?.role}
      />
    </>
  );
}
