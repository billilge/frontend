'use client';

import Sidebar from 'src/components/desktop/Sidebar';
import Search from '@/components/desktop/Search';
import { useState, useEffect } from 'react';
import AddStudentId from '@/components/desktop/AddStudentId';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPayer, addPayer, deletePayer } from '@/services/payers';
import TableComponent from './_components/TableComponent';
import AddInput from '../../../components/desktop/AddInput';

export default function PayerInquiryPage() {
  const queryClient = useQueryClient();
  const [addedData, setAddedData] = useState<any[]>([]);
  const [isDeleteModeOriginal, setIsDeleteModeOriginal] = useState(false);
  const [isDeleteModeAdded, setIsDeleteModeAdded] = useState(false);
  const [selectedOriginal, setSelectedOriginal] = useState<number[]>([]); // 수정: payerId 배열로
  const [selectedAdded, setSelectedAdded] = useState<number[]>([]); // 수정: payerId 배열로

  const [newStudentId, setNewStudentId] = useState('');
  const [newStudentName, setNewStudentName] = useState('');

  const mutation = useMutation({
    mutationFn: addPayer,
    onSuccess: () => {
      alert('추가된 납부자 정보가 성공적으로 저장되었습니다.');
      setAddedData([]);
    },
    onError: () => {
      alert('추가된 납부자 정보 저장에 실패했습니다.');
    },
  });

  const deletemutation = useMutation({
    mutationFn: deletePayer,
    onSuccess: () => {
      alert('선택된 납부자 정보가 성공적으로 삭제되었습니다.');
      setAddedData([]);
    },
    onError: () => {
      alert('납부자 정보 삭제에 실패했습니다.');
    },
  });

  const {
    data: originalData = [],
    isError: originalDataError,
    isLoading,
  } = useQuery({
    queryKey: ['payers'],
    queryFn: getPayer,
  });

  useEffect(() => {
    console.log('Updated originalData:', originalData);
  }, [originalData]);

  if (isLoading) {
    return <p>데이터를 불러오는 중...</p>;
  }

  if (originalDataError) {
    console.error('기존 데이터 로드 중 오류 발생');
  }

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudentId(e.target.value);
  };

  const handleStudentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudentName(e.target.value);
  };

  const handleAddStudent = () => {
    if (!newStudentId || !newStudentName) {
      alert('이름과 학번을 입력해주세요.');
      return;
    }

    const studentIdPattern = /^\d{8}$/;
    if (!studentIdPattern.test(newStudentId)) {
      alert('학번은 8자리 숫자로 입력해야 합니다.');
      return;
    }

    const newEntry = { name: newStudentName, studentId: newStudentId };
    setAddedData((prev) => [...prev, newEntry]);
    setNewStudentId('');
    setNewStudentName('');
  };

  const handleDeleteData = (mode: 'original' | 'added') => {
    if (mode === 'original') {
      // payerId 배열을 직접 전달
      deletemutation.mutate(selectedOriginal); // payerId 배열을 전달
      setSelectedOriginal([]);
      setIsDeleteModeOriginal(false);
    } else {
      // addedData에서 삭제할 때도 payerId로 삭제
      const updatedData = addedData.filter(
        (item) => !selectedAdded.includes(item.studentId), // studentId로 비교 후 삭제
      );
      setAddedData(updatedData);
      setSelectedAdded([]);
      setIsDeleteModeAdded(false);
    }
  };

  const toggleDeleteMode = (mode: 'original' | 'added') => {
    if (mode === 'original') {
      setIsDeleteModeOriginal((prev) => !prev);
      setSelectedOriginal([]);
    } else {
      setIsDeleteModeAdded((prev) => !prev);
      setSelectedAdded([]);
    }
  };

  const handleApply = () => {
    if (addedData.length === 0) return alert('추가된 데이터가 없습니다.');
    mutation.mutate({ payers: addedData });
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
            </div>
            <div className="flex w-full flex-col">
              <TableComponent
                payers={addedData}
                headers={['추가된 이름', '추가된 학번']}
                showCheckboxes={isDeleteModeAdded}
                selected={selectedAdded}
                setSelected={setSelectedAdded}
              />
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  type="button"
                  variant="deleteSecondary"
                  onClick={() => toggleDeleteMode('added')}
                >
                  {isDeleteModeAdded ? '취소' : '삭제'}
                </Button>
                {isDeleteModeAdded && (
                  <Button
                    size="sm"
                    variant="deletePrimary"
                    type="button"
                    onClick={() => handleDeleteData('added')}
                  >
                    완료
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="bottom-0 flex justify-center gap-2 pt-10">
            <Button type="button" variant="primary" onClick={handleApply}>
              적용하기
            </Button>
          </div>
        </Sidebar>
      </div>
      <div className="flex flex-col justify-between">
        <TableComponent
          payers={originalData.payers}
          showCheckboxes={isDeleteModeOriginal}
          selected={selectedOriginal}
          setSelected={setSelectedOriginal}
        />
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            type="button"
            variant="deleteSecondary"
            onClick={() => toggleDeleteMode('original')}
          >
            {isDeleteModeOriginal ? '취소' : '삭제'}
          </Button>

          {isDeleteModeOriginal && (
            <Button
              type="button"
              size="sm"
              variant="deletePrimary"
              onClick={() => handleDeleteData('original')}
            >
              완료
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
