import { handleTouchStart, handleTouchEnd } from '@/utils/handleTouch';

interface PopUpProps {
  title: string; // PopUp창 제목
  content: string; // PopUp창 내용
  ctaButtonText?: string; // 오른쪽 버튼에 들어갈 문구
  otherButtonText?: string; // 왼쪽 버튼에 들어갈 문구
  onClickCta?: () => void; // 오른쪽 버튼을 눌렀을 때 실행될 함수
  onClickOther?: () => void; // 왼쪽 버튼을 눌렀을 때 실행될 함수
}

export default function PopUp({
  title,
  content,
  ctaButtonText = '확인',
  otherButtonText = '다시 보지 않기',
  onClickCta,
  onClickOther,
}: PopUpProps) {
  const defalutButtonClass =
    'text-body-1-normal_semi w-[108px] rounded-[10px] py-[9px] font-medium outline-none ';

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center">
      {/* 반투명한 검정 배경 */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClickCta} // 배경 클릭 시 닫히도록 설정
      />

      <div className="relative flex w-[275px] flex-col gap-2.5 rounded-[20px] bg-white-primary p-5">
        <div className="flex flex-col gap-2.5 py-5 text-center">
          {/* 제목 */}
          <div className="text-body-1-normal_semi font-semibold">{title}</div>
          {/* 문구 */}
          <div className="whitespace-pre-line text-caption-1_midi font-medium text-gray-primary">
            {content}
          </div>
        </div>

        {/* 버튼 2개(서브 버튼 / 메인 버튼) */}
        <div className="flex justify-between gap-5">
          <button
            type="button"
            onClick={onClickOther}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={`${defalutButtonClass} bg-gray-tertiary text-gray-secondary transition-all`}
          >
            {otherButtonText}
          </button>
          <button
            type="button"
            onClick={onClickCta}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={` ${defalutButtonClass} bg-return-blue text-white-primary`}
          >
            {ctaButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
