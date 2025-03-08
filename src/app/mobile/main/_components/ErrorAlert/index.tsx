import { handleTouchStart, handleTouchEnd } from '@/utils/handleTouch';

interface AlertProps {
  content: string; // alert창 문구
  onClickClose?: () => void; // 오른쪽 버튼을 눌렀을 때 실행될 함수
}

export default function Alert({ content, onClickClose }: AlertProps) {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center">
      {/* 반투명한 검정 배경 */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClickClose} // 배경 클릭 시 닫히도록 설정
      />

      <div className="relative flex w-[275px] flex-col gap-2.5 rounded-[20px] bg-white-primary p-5">
        {/*  문구 */}
        <div className="whitespace-pre-line py-5 text-center text-body-1-normal_medi font-medium">
          {content}
        </div>

        {/* 닫기 버튼 */}
        <div className="flex justify-end gap-5">
          <button
            type="button"
            onClick={onClickClose}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="text-body-1-normal_semi font-semibold text-return-blue outline-none"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
