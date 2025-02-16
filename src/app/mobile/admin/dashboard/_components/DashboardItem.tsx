export default function DashboardItem() {
  return (
    <section className="flex w-full items-center justify-between px-5 py-4">
      <section className="flex items-center gap-4">
        <section className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-tertiary p-2.5">
          {/* 아이콘 들어갈 위치 */}
          <div className="">.</div>
        </section>

        <section className="flex flex-col gap-2">
          <div className="text-sm font-semibold">물품명</div>

          <section className="flex flex-col text-[10px] font-normal">
            <section className="flex gap-1">
              <div className="">신청자</div>
              <div className="">이름</div>
            </section>

            <section className="flex gap-1">
              <div className="">신청 시간</div>
              <div className="">시간</div>
            </section>
          </section>
        </section>
      </section>

      <section className="flex gap-2.5 text-sm font-semibold">
        {/* TODO : API 보고 onClick 연결하기 */}
        {/* TODO : 대여/반납 상태에 따라 버튼명 달라지게 하기 */}
        <button
          type="button"
          onClick={() => console.log('수락!')}
          className="text-return-blue"
        >
          수락하기
        </button>
        <button
          type="button"
          onClick={() => console.log('취소!')}
          className="text-return-red"
        >
          취소하기
        </button>
      </section>
    </section>
  );
}
