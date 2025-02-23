import Image from 'next/image';

interface WelfareItemProps {
  itemName: string;
  imageUrl: string;
  count: number;
}

export default function WelfareItem({
  itemName,
  imageUrl,
  count,
}: WelfareItemProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-[20px] bg-white-primary p-[15px]">
      <div className="flex items-center gap-[17px]">
        <div className="flex aspect-square h-[40px] w-[40px] items-center justify-center rounded-full bg-gray-tertiary p-1">
          <Image width={26} height={26} src={imageUrl} alt={itemName} />
        </div>
        <div className="flex flex-col gap-[7px]">
          <div className="text-body-2-normal_semi font-semibold text-black-primary">
            {itemName}
          </div>
          <div className="flex gap-[9px] text-caption-1_midi font-medium text-gray-primary">
            <div>현재 수량</div>
            {count}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => console.log(itemName)}
        className="box-border px-1 py-2.5 text-body-2-normal_semi font-semibold text-return-blue"
      >
        대여하기
      </button>
    </div>
  );
}
