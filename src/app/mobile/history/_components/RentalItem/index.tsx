import Image from 'next/image';
import StatusBadge from '@/app/mobile/history/_components/StatusBadge';

interface RentalItemProps {
  item: { itemName: string; imageUrl: string };
  rentAt: string;
  returnAt: string | null;
  rentalStatus: string;
  onReturnClick: () => void;
}

export default function RentalItem({
  item,
  rentAt,
  returnAt,
  rentalStatus,
  onReturnClick,
}: RentalItemProps) {
  return (
    <div className="flex w-full items-center justify-between py-5">
      <div className="flex items-start gap-[17px]">
        <div className="flex aspect-square h-[40px] w-[40px] items-center justify-center rounded-full bg-gray-tertiary p-1">
          <Image
            width={26}
            height={26}
            src={item.imageUrl}
            alt={item.itemName}
          />
        </div>
        <div className="flex flex-col gap-[7px]">
          <div className="flex w-full items-center gap-[7px]">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-body-2-normal_semi font-semibold">
              {item.itemName}
            </div>
            <StatusBadge status={rentalStatus} />
          </div>
          <div className="flex flex-col gap-1 text-caption-2_midi text-gray-primary">
            <div>대여 시간 &nbsp;{rentAt !== '' ? rentAt : '-'}</div>
            <div>반납 시간 &nbsp;{returnAt !== '' ? returnAt : '-'}</div>
          </div>
        </div>
      </div>

      {rentalStatus === 'RENTAL' && (
        <button
          onClick={onReturnClick}
          className="box-border px-1 py-2.5 text-body-2-normal_semi font-semibold text-warning"
        >
          반납하기
        </button>
      )}
    </div>
  );
}
