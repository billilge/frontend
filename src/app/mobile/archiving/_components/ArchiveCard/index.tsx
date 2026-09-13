import { cn } from '@/lib/utils';
import { ArchiveCardSize } from '@/types/archiveType';

interface ArchiveCardProps {
  title: string;
  date: string;
  imageUrl: string;
  size?: ArchiveCardSize;
  onClick?: () => void;
}

// 시안 카드 비율 (160x176 / 160x224 / 160x256)
// 좌우 20px 패딩에 맞춰 폭이 유동적이므로 높이는 비율로 계산
const SIZE_CLASSES: Record<ArchiveCardSize, string> = {
  small: 'aspect-[10/11]',
  medium: 'aspect-[5/7]',
  large: 'aspect-[5/8]',
};

export default function ArchiveCard({
  title,
  date,
  imageUrl,
  size = 'medium',
  onClick,
}: ArchiveCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative w-full overflow-hidden rounded-xl bg-gray-border text-left',
        SIZE_CLASSES[size],
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt={title} className="h-full w-full object-cover" />

      {/* 텍스트 가독성을 위한 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black-primary to-black-primary/0" />

      <div className="absolute bottom-0 left-0 flex w-full flex-col px-3 py-4">
        <span className="line-clamp-1 text-sm font-medium leading-5 tracking-tight text-white-primary">
          {title}
        </span>
        <span className="text-xs font-normal leading-4 tracking-tight text-gray-border">
          {date}
        </span>
      </div>
    </button>
  );
}
