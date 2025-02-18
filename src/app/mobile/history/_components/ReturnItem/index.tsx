import Image from 'next/image';

interface ReturnItemProps {
  name: string;
  url: string;
  dayCount: number;
}

export default function ReturnItem({ name, url, dayCount }: ReturnItemProps) {
  return (
    <div className="flex w-[74px] shrink-0 flex-col gap-3.5 rounded-[20px] bg-white px-[17px] py-2.5">
      <div className="flex aspect-square items-center justify-center rounded-full bg-gray-tertiary p-1">
        <Image width={26} height={26} src={url} alt={name} />
      </div>
      <div className="flex flex-col items-center">
        <div className="max-w-[40px] truncate text-body-2-normal_semi font-semibold">
          {name}
        </div>
        <div className="max-w-[40px] truncate text-caption-2_midi font-medium text-gray-secondary">
          D+{dayCount}
        </div>
      </div>
    </div>
  );
}
