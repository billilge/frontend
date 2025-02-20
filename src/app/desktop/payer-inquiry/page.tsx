'use client';

import Sidebar from 'src/components/desktop/Sidebar';
import Search from '@/components/desktop/Search';
import { useState } from 'react';
import AddStudentId from '@/components/desktop/AddStudentId';
import { Button } from '@/components/ui/button';
import TableComponent from './_components/TableComponent';
import AddInput from '../../../components/desktop/AddInput';

const dummyData = [
  { name: '조다운', student_id: '20223139', admin: true },
  { name: '이정욱', student_id: '20223888', admin: true },
  { name: '윤신지', student_id: '20223122', admin: false },
  { name: '황수민', student_id: '20223130', admin: true },
];

const dummyData2 = [
  { name: '조다운', student_id: '20223139' },
  { name: '황현진', student_id: '20223158' },
];

export default function PayerInquiryPage() {
  const [data, setData] = useState(dummyData); // 기존 데이터
  const [addedData, setAddedData] = useState(dummyData2); // 추가된 데이터
  const [isDeleteModeOriginal, setIsDeleteModeOriginal] = useState(false); // 기존 데이터 삭제 모드
  const [isDeleteModeAdded, setIsDeleteModeAdded] = useState(false); // 추가된 데이터 삭제 모드
  const [selectedOriginal, setSelectedOriginal] = useState<string[]>([]); // 기존 데이터에서 선택된 항목
  const [selectedAdded, setSelectedAdded] = useState<string[]>([]); // 추가된 데이터에서 선택된 항목

  const [newStudentId, setNewStudentId] = useState('');
  const [newStudentName, setNewStudentName] = useState('');

  // 학번 입력 핸들러
  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudentId(e.target.value);
  };

  // 이름 입력 핸들러
  const handleStudentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudentName(e.target.value);
  };

  // 추가 버튼 클릭 시 실행될 함수
  const handleAddStudent = () => {
    if (!newStudentId || !newStudentName) {
      alert('이름과 학번을 입력해주세요.');
      return;
    }

    // 학번이 8자리 숫자인지 검증
    const studentIdPattern = /^\d{8}$/;
    if (!studentIdPattern.test(newStudentId)) {
      alert('학번은 8자리 숫자로 입력해야 합니다.');
      return;
    }

    const newEntry = { name: newStudentName, student_id: newStudentId };
    setAddedData([...addedData, newEntry]); // 추가된 데이터 업데이트
    setNewStudentId('');
    setNewStudentName('');
  };

  // 기존 데이터 삭제
  const handleDeleteOriginal = () => {
    const updatedData = data.filter(
      (item) => !selectedOriginal.includes(item.student_id),
    );
    setData(updatedData);
    setIsDeleteModeOriginal(false);
    setSelectedOriginal([]);
  };

  // 추가된 데이터 삭제
  const handleDeleteAdded = () => {
    const updatedData = addedData.filter(
      (item) => !selectedAdded.includes(item.student_id),
    );
    setAddedData(updatedData);
    setIsDeleteModeAdded(false);
    setSelectedAdded([]);
  };

  // 기존 데이터 삭제 모드 토글
  const toggleDeleteModeOriginal = () => {
    setIsDeleteModeOriginal((prev) => !prev);
    setSelectedOriginal([]);
  };

  // 추가된 데이터 삭제 모드 토글
  const toggleDeleteModeAdded = () => {
    setIsDeleteModeAdded((prev) => !prev);
    setSelectedAdded([]);
  };

  const api = () => {
    console.log('api 적용할 곳입니다.');
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
            <div className="flex items-end justify-center gap-4">
              <AddStudentId
                value={newStudentId}
                onChange={handleStudentIdChange}
              />
              <AddInput
                value={newStudentName}
                onChange={handleStudentNameChange}
                onClick={handleAddStudent}
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="primary"
                  onClick={toggleDeleteModeAdded}
                >
                  {isDeleteModeAdded ? '취소' : '삭제'}
                </Button>
                {isDeleteModeAdded && (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleDeleteAdded}
                  >
                    완료
                  </Button>
                )}
              </div>
            </div>

            <TableComponent
              data={addedData}
              headers={['추가된 이름', '추가된 학번']}
              showCheckboxes={isDeleteModeAdded}
              selected={selectedAdded}
              setSelected={setSelectedAdded}
            />
          </div>
          <div className="bottom-0 flex justify-center pt-10">
            <Button type="button" variant="primary" onClick={api}>
              적용하기
            </Button>
          </div>
        </Sidebar>
        <Button
          type="button"
          variant="primary"
          onClick={toggleDeleteModeOriginal}
        >
          {isDeleteModeOriginal ? '취소' : '삭제'}
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <TableComponent
          data={data}
          showCheckboxes={isDeleteModeOriginal}
          selected={selectedOriginal}
          setSelected={setSelectedOriginal}
        />
        <div className="flex gap-2">
          {isDeleteModeOriginal && (
            <Button
              type="button"
              variant="primary"
              className={`btn whitespace-nowrap rounded-md px-3 py-2 text-sm text-white-primary ${isDeleteModeOriginal ? 'bg-gray-primary' : 'bg-gray-secondary'}`}
              onClick={handleDeleteOriginal}
            >
              완료
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
