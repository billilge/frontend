'use client';

import { useRouter } from 'next/navigation';
import Sidebar from '@/components/mobile/SidebarMenu/index';
import { useEffect, useState } from 'react';
import IconAlarm from 'public/assets/icons/icon-alarm.svg';
import IconHamburger from 'public/assets/icons/icon-hamburger.svg';
import IconFeeCheck from 'public/assets/icons/icon-fee-check.svg';
import { getNotificationCount } from '@/apis/notification';
import Cookies from 'js-cookie';

export default function MainHeader() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [user, setUser] = useState<{
    name: string;
    id: string;
    role: string;
    isFeePaid: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const data = await getNotificationCount();
        setNotificationCount(data.notificationCount);
      } catch (err) {
        console.error('getNotificationCount API 오류:', err);
      }
    };

    fetchNotificationCount();
  }, []);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <section className="fixed top-0 z-10 flex h-10 w-full max-w-md items-center justify-between bg-[#F3F4F6] px-4 py-1.5">
        <div className="flex items-center gap-2 text-heading-3_D font-semibold text-black-primary">
          {user?.name}님{user?.isFeePaid ? <IconFeeCheck /> : null}
        </div>
        <div className="flex gap-[7px]">
          <button
            className="relative h-6 w-6 items-center justify-center"
            type="button"
            onClick={() => router.push('/mobile/notification')}
          >
            <IconAlarm />
            {notificationCount > 0 && (
              <div className="absolute -top-0.5 left-2.5 flex h-[13px] w-fit min-w-[13px] items-center justify-center rounded-full bg-warning px-0.5 text-caption-2_midi text-white-primary">
                {notificationCount > 99 ? '99+' : notificationCount}
              </div>
            )}
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

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        role={user?.role}
      />
    </>
  );
}
