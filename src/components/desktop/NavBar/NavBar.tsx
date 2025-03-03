'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface NavBarItem {
  name: string;
  link: string;
}

const navBarItems: NavBarItem[] = [
  {
    name: '대여내역 조회',
    link: '/desktop/rental-history',
  },
  {
    name: '관리자 관리',
    link: '/desktop/admin-inquiry',
  },
  {
    name: '납부자 관리',
    link: '/desktop/payer-inquiry',
  },
  {
    name: '물품 관리',
    link: '/desktop/item-list',
  },
  {
    name: '로그아웃',
    link: '/desktop/login',
  },
];

export default function NavBar() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNavBtnClick = (item: NavBarItem, index: number) => {
    router.push(`${item.link}`);

    if (item.name === '로그아웃') {
      localStorage.clear();
      toast.success('로그아웃에 성공했습니다!');
    }

    console.log('index:', index);
    setCurrentIndex(index);
  };

  return (
    <div className="flex w-screen justify-end gap-5 border-b-[1px] border-solid px-[50px] pb-5 pt-5">
      {navBarItems.map((navItem: NavBarItem, index: number) => (
        <button
          className={
            index === currentIndex
              ? 'text-body-2-normal_semi font-bold'
              : 'text-body-2-normal_semi hover:font-bold'
          }
          key={navItem.name}
          type="button"
          onClick={() => handleNavBtnClick(navItem, index)}
        >
          {navItem.name}
        </button>
      ))}
    </div>
  );
}
