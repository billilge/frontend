'use client';

import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
  menu?: boolean;
}

export default function Header({ title, menu = false }: HeaderProps) {
  const router = useRouter();

  return (
    <section className="flex h-8 w-full items-center justify-between px-4 py-1.5">
      <button type="button" onClick={() => router.back()}>
        버튼
      </button>
      <div className="font-normal text-black-primary">{title}</div>
      {menu ? <button>테스트</button> : <div className="h-6 w-6" />}
    </section>
  );
}
