import Image from 'next/image';
import convertTime from '@/utils/convertTime';
import { handleTouchStart, handleTouchEnd } from '@/utils/handleTouch';
import { DashboardProps } from '@/types/dashboardType';

export default function DashboardItem({
  itemName,
  itemImageUrl,
  renterName,
  studentId,
  status,
  rentAt,
  rentedCount,
  handleApproveBtnClick,
  handleCancelBtnClick,
}: DashboardProps) {
  const RentalApproveBtnText: Record<string, string> = {
    PENDING: '대여 승인',
    CONFIRMED: '대여 완료',
    RETURN_PENDING: '반납 승인',
    RETURN_CONFIRMED: '반납 완료',
  };

  const handleApproveBtn = () => {
    handleApproveBtnClick();
  };

  const handleCancelBtn = () => {
    handleCancelBtnClick();
  };

  const applicatedTime = convertTime(rentAt);

  return (
    <section className="flex w-full items-center justify-between px-5 py-4">
      <section className="flex items-center gap-4">
        <section className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-tertiary p-2.5">
          {itemImageUrl && (
            <Image
              src={itemImageUrl}
              width={24}
              height={24}
              alt="물품 아이콘"
            />
          )}
        </section>

        <section className="flex flex-col gap-2">
          <div className="text-sm font-semibold">
            {itemName} ({rentedCount}개)
          </div>

          <section className="flex flex-col text-[10px] font-normal">
            <section className="flex gap-1">
              <div className="flex w-10">신청자</div>
              <div className="">
                {studentId} {renterName}
              </div>
            </section>

            <section className="flex gap-1">
              <div className="flex w-10">대여 시간</div>
              <div className="">
                {applicatedTime.formattedDate}{' '}
                {applicatedTime.formattedTime.split(':').slice(0, 2).join(':')}
              </div>
            </section>
          </section>
        </section>
      </section>

      <section className="flex gap-2.5 text-sm font-semibold">
        {status === 'PENDING' ? (
          <button
            type="button"
            onClick={handleCancelBtn}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="w-14 text-return-red"
          >
            대여 취소
          </button>
        ) : (
          <div className="w-14" />
        )}
        <button
          type="button"
          onClick={handleApproveBtn}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="text-return-blue"
        >
          {RentalApproveBtnText[status]}
        </button>
      </section>
    </section>
  );
}
