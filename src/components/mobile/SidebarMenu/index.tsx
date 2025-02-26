'use client';

import IconClose from 'public/assets/icons/side-menu/close.svg';
import IconRentalList from 'public/assets/icons/side-menu/rental-item-list.svg';
import IconRentalHistory from 'public/assets/icons/side-menu/rental-history.svg';
import IconUserAlarm from 'public/assets/icons/side-menu/user-alarm.svg';
import IconAdminDashboard from 'public/assets/icons/side-menu/admin-dashboard.svg';
import IconAdminAlarm from 'public/assets/icons/side-menu/admin-alarm.svg';
import IconLogout from 'public/assets/icons/side-menu/logout.svg';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  role?: string;
}

const menuItems = [
  { icon: IconRentalList, label: '복지 물품 목록', href: '/mobile/main' },
  { icon: IconRentalHistory, label: '대여기록', href: '/mobile/history' },
  { icon: IconUserAlarm, label: '알림', href: '/mobile/notification' },
];

const adminItems = [
  {
    icon: IconAdminDashboard,
    label: '관리자 대시보드',
    href: '/mobile/admin/dashboard',
  },
  {
    icon: IconAdminAlarm,
    label: '관리자 알림',
    href: '/mobile/admin/notification',
  },
];

export default function Sidebar({
  isOpen,
  onClose,
  role = 'USER', // 여기서 관리자 여부 설정
}: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear(); // 로컬 스토리지 전체 삭제
    router.replace('/mobile/sign-in'); // 로그인 페이지로 이동
  };

  return (
    <>
      {/* 오버레이 배경 */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={onClose}
      />

      {/* 사이드바 */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-3/5 transform bg-white-primary transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-end px-4 py-3">
          <button type="button" onClick={onClose}>
            <IconClose />
          </button>
        </div>
        <nav className="p-5">
          <div className="border-b border-gray-border pb-2 text-heading-4_M font-semibold text-black-primary">
            메뉴
          </div>

          {/* 사용자 메뉴 */}
          <ul className="text-body-2-normal_semi font-semibold text-black-primary">
            {menuItems.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="mt-3 flex items-center gap-3 rounded p-2 hover:bg-gray-100"
                >
                  <Icon />
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* 첫 번째 구분선 */}
          <div className="my-5 border-t border-gray-border" />

          {/* 관리자 메뉴 */}
          {role === 'ADMIN' && (
            <>
              <ul className="text-body-2-normal_semi font-semibold text-black-primary">
                {adminItems.map(({ icon: Icon, label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="mt-3 flex items-center gap-3 rounded p-2 hover:bg-gray-100"
                    >
                      <Icon />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* 두 번째 구분선 */}
              <div className="my-5 border-t border-gray-border" />
            </>
          )}

          {/* 로그아웃 버튼 */}
          <ul className="text-body-2-normal_semi font-semibold text-black-primary">
            <li key="logout">
              <button
                type="button"
                onClick={handleLogout}
                className="mt-3 flex w-full items-center gap-3 rounded p-2 hover:bg-gray-100"
              >
                <IconLogout />
                로그아웃
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
