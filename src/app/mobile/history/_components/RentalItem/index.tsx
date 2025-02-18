import Image from 'next/image';

interface RentalItemProps {
  item: { itemName: string; imageUrl: string };
  rentAt: string;
  returnAt: string | null;
  rentalStatus: string;
}

export default function RentalItem({
  item,
  rentAt,
  returnAt,
  rentalStatus,
}: RentalItemProps) {
  return (
    <div className="flex w-full items-center justify-between py-5">
      <div className="flex gap-[17px]">
        <div className="flex aspect-square items-center justify-center rounded-full bg-gray-tertiary p-1">
          <Image
            width={26}
            height={26}
            src={item.imageUrl}
            alt={item.itemName}
          />
        </div>
        <div className="flex flex-col gap-[7px]">
          <div className="flex gap-[7px]">
            <div className="max-w-40 truncate text-body-2-normal_semi font-semibold">
              {item.itemName}
            </div>
            <div className="text-body-2-normal_semi font-semibold">
              {rentalStatus}
            </div>
          </div>
          <div className="flex flex-col gap-1 text-caption-2_midi text-gray-primary">
            <div>대여 시간 &nbsp;{rentAt !== '' ? rentAt : '-'}</div>
            <div>반납 시간 &nbsp;{returnAt !== '' ? returnAt : '-'}</div>
          </div>
        </div>
        <div />
      </div>

      <div className="flex flex-col items-center">
        {rentalStatus === 'RENTAL' && (
          <div className="cursor-pointer py-2.5 text-body-2-normal_semi font-semibold text-warning">
            반납하기
          </div>
        )}
      </div>
    </div>
  );
}
