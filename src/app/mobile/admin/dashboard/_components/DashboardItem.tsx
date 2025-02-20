import Image from 'next/image';
import convertTime from '@/utils/convertTime';

interface DashboardItemProps {
  itemName: string;
  imageUrl: string;
  renterName: string;
  studentId: number;
  status: string;
  applicatedAt: string;
}

export default function DashboardItem({
  itemName,
  imageUrl,
  renterName,
  studentId,
  status,
  applicatedAt,
}: DashboardItemProps) {
  const RentalBtnText: Record<string, string> = {
    PENDING: '대여',
    RETURN_PENDING: '반납',
  };

  const applicatedTime = convertTime(applicatedAt);

  return (
    <section className="flex w-full items-center justify-between px-5 py-4">
      <section className="flex items-center gap-4">
        <section className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-tertiary p-2.5">
          <Image src={imageUrl} width={24} height={24} alt="물품 아이콘" />
        </section>

        <section className="flex flex-col gap-2">
          <div className="text-sm font-semibold">{itemName}</div>

          <section className="flex flex-col text-[10px] font-normal">
            <section className="flex gap-1">
              <div className="flex w-10">신청자</div>
              <div className="">
                {studentId} {renterName}
              </div>
            </section>

            <section className="flex gap-1">
              <div className="flex w-10">신청 시간</div>
              <div className="">
                {applicatedTime.formattedDate} {applicatedTime.formattedTime}
              </div>
            </section>
          </section>
        </section>
      </section>

      <section className="flex gap-2.5 text-sm font-semibold">
        {/* TODO : API 보고 onClick 연결하기 */}
        <button
          type="button"
          onClick={() => console.log('수락!')}
          className="text-return-blue"
        >
          {RentalBtnText[status]} 승인
        </button>
        <button
          type="button"
          onClick={() => console.log('취소!')}
          className="text-return-red"
        >
          {RentalBtnText[status]} 취소
        </button>
      </section>
    </section>
  );
}
