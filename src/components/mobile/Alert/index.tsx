interface AlertProps {
  content: string; // alert창 문구
  ctaButtonText: string; // 오른쪽 버튼에 들어갈 문구
  otherButtonText?: string; // 왼쪽 버튼에 들어갈 문구
  isMainColor?: boolean; // 오른쪽 버튼을 파랑색으로 할 것인지 빨강색으로 할 것인지
  onClickCta?: () => void; // 오른쪽 버튼을 눌렀을 때 실행될 함수
  onClickOther?: () => void; // 왼쪽 버튼을 눌렀을 때 실행될 함수
}

export default function Alert({
  content,
  ctaButtonText = '대여할게요',
  otherButtonText = '괜찮아요',
  isMainColor = false,
  onClickCta,
  onClickOther,
}: AlertProps) {
  const ctaButtonClass = isMainColor
    ? 'bg-return-blue text-white-primary' // 파란 버튼 (대여, 반납)
    : 'bg-warning text-white-primary'; // 빨간 버튼 (신청 취소)

  const defalutButtonClass =
    'text-body-1-normal_semi w-[108px] rounded-[10px] py-[9px] font-medium outline-none';

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center">
      {/* 반투명한 검정 배경 */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClickOther} // 배경 클릭 시 닫히도록 설정
      />

      <div className="relative flex w-[275px] flex-col gap-2.5 rounded-[20px] bg-white-primary p-5">
        {/*  문구 */}
        <div className="whitespace-pre-line py-5 text-center text-body-1-normal_medi font-medium">
          {content}
        </div>

        {/* 버튼 2개(서브 버튼 / 메인 버튼) */}
        <div className="flex justify-between gap-5">
          <button
            type="button"
            onClick={onClickOther}
            className={`${defalutButtonClass} bg-gray-tertiary text-gray-secondary`}
          >
            {otherButtonText}
          </button>
          <button
            type="button"
            onClick={onClickCta}
            className={` ${defalutButtonClass} ${ctaButtonClass}`}
          >
            {ctaButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
