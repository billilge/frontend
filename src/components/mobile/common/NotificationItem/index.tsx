import Link from 'next/link';
import { cn } from '@/lib/utils';
// import IconBell from 'public/assets/icon-bell.svg';

interface NotificationItemProps {
  message: string;
  link: string;
  isRead: boolean;
  status: string;
  date: string;
}

export default function NotificationItem({
  message,
  link,
  isRead,
  status,
  date,
}: NotificationItemProps) {
  return (
    <Link className="w-full" href={link}>
      <section
        className={cn(
          'flex w-full gap-2.5 p-5',
          isRead ? '' : 'bg-main-background',
        )}
      >
        <div className="flex h-4 w-4">{/* <IconBell /> */}</div>

        <section className="flex w-full flex-col items-start gap-2.5 text-sm font-medium">
          <section className="flex w-full justify-between">
            <div className="text-[12px] font-medium">대여 신청</div>
            <div className="text-[12px] font-medium text-gray-secondary">
              {date}분 전
            </div>
          </section>
          {message}
        </section>
      </section>
    </Link>
  );
}

// TODO : 아이콘 세팅, 글자별 색상 세팅 배경색 임시로 설정했는데 tailwind에 수정헤야 함
