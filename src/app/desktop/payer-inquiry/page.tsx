'use client';

import Sidebar from 'src/components/desktop/Sidebar';
import Search from '@/components/desktop/Search';
import { useState } from 'react';
import TableComponent from './_components/TableComponent';

const dummyData = [
  { name: '조다운', student_id: '20223139', admin: true },
  { name: '이정욱', student_id: '20223888', admin: true },
  { name: '윤신지', student_id: '20223122', admin: false },
  { name: '황수민', student_id: '20223130', admin: true },
  { name: '황현진', student_id: '20223134', admin: true },
  { name: '박건민', student_id: '20220555', admin: false },
  { name: '이현승', student_id: '20223355', admin: true },
  { name: '곽희건', student_id: '20223444', admin: true },
  { name: '박정명', student_id: '20225555', admin: false },
  { name: '류건', student_id: '20224444', admin: true },
  { name: '윤성욱', student_id: '20222222', admin: true },
  { name: '앵나래', student_id: '20221111', admin: false },
];

const dummyData2 = [
  { name: '조다운', student_id: '20223139' },
  { name: '황현진', student_id: '20223158' },
  { name: '황수민', student_id: '20213139' },
];

export default function PayerInquiryPage() {
  const [data, setData] = useState(dummyData); // 데이터 상태
  const [addedData, setAddedData] = useState(dummyData2); // 추가된 데이터 상태
  const [isDeleteMode, setIsDeleteMode] = useState(false); // 삭제 모드 상태
  const [selected, setSelected] = useState<string[]>([]); // 선택된 항목 추적

  // 삭제 처리 함수
  const handleDelete = (selectedIds: string[]) => {
    const updatedData = data.filter(
      (item) => !selectedIds.includes(item.student_id),
    );
    setData(updatedData);
    setIsDeleteMode(false); // 삭제 후 모드 종료
    setSelected([]); // 선택 초기화
  };

  // 삭제 모드 활성화/비활성화 함수
  const toggleDeleteMode = () => {
    setIsDeleteMode((prev) => !prev);
    setSelected([]); // 삭제 모드 활성화 시 선택 초기화
  };

  return (
    <div className="flex flex-col justify-center gap-8 px-4 md:px-16 lg:px-64">
      <div className="pt-20 text-center">
        <p className="text-2xl">학생회비 납부자 조회하기</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Search />
        <Sidebar
          triggerText="새로운 납부자 추가하기"
          title="학생회비 납부자 추가하기"
          description="설명"
        >
          <div className="flex w-full flex-col items-center justify-center">
            <Search placeholder="이름을 검색해주세요." />
            <TableComponent
              data={addedData}
              headers={['추가된 이름', '추가된 학번']}
              showCheckboxes={isDeleteMode}
              selected={selected} // Pass selected here
              setSelected={setSelected} // Pass setSelected here
            />
          </div>
        </Sidebar>
        <button
          type="button"
          className={`btn whitespace-nowrap rounded-md bg-gray-primary px-3 py-2 text-sm text-white-primary ${isDeleteMode ? 'bg-gray-primary' : 'bg-gray-secondary'}`}
          onClick={toggleDeleteMode}
        >
          {isDeleteMode ? '취소' : '삭제하기'}
        </button>
      </div>
      <div className="flex items-center justify-between">
        <TableComponent
          data={data}
          showCheckboxes={isDeleteMode}
          selected={selected} // Pass selected here
          setSelected={setSelected} // Pass setSelected here
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}
