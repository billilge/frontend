'use client';

import Sidebar from '@/components/desktop/Sidebar';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addAdmins,
  deleteAdmins,
  getAdmins,
  getMembers,
} from '@/services/admins';
import { Admins } from '@/types/admins';
import { SearchInput } from '@/components/ui/search-input';
import { PageChangeAction } from '@/types/paginationType';
import toast from 'react-hot-toast';
import TableComponent from './_components/AdminTable';

export default function AdminInquiryPage() {
  const [isDeleteModeOriginal, setIsDeleteModeOriginal] = useState(false);
  const [, setIsDeleteModeAdded] = useState(false);
  const [selectedOriginal, setSelectedOriginal] = useState<number[]>([]);
  const [selectedAdded, setSelectedAdded] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [sideBarPage, setSideBarPage] = useState(1);

  const {
    data: originalData = [],
    isError: originalDataError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admins'],
    queryFn: () => getAdmins(searchQuery, page - 1),
  });

  const { data: memberData = [], refetch: refetchSideBar } = useQuery({
    queryKey: ['members'],
    queryFn: () => getMembers(sideBarPage - 1),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdmins,
    onSuccess: () => {
      toast.success('선택된 관리자 정보가 성공적으로 삭제되었습니다.');
      refetch();
    },
    onError: () => toast.error('관리자 정보 삭제에 실패했습니다.'),
  });

  const mutation = useMutation({
    mutationFn: addAdmins,
    onSuccess: () => {
      toast.success('추가된 관리자 정보가 성공적으로 저장되었습니다.');
      refetch();
    },
    onError: () => toast.error('추가된 관리자 정보 저장에 실패했습니다.'),
  });

  useEffect(() => {
    console.log('Updated originalData:', originalData);
  }, [originalData]);

  useEffect(() => {
    refetch();
    console.log('refetch:', page);
  }, [page]);

  useEffect(() => {
    refetchSideBar();
    console.log('refetchSideBar:', sideBarPage);
  }, [sideBarPage]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        데이터를 불러오는 중...
      </div>
    );
  if (originalDataError) console.error('기존 데이터 로드 중 오류 발생');

  const handleDeleteData = (mode: 'original' | 'added') => {
    const selectedIds = mode === 'original' ? selectedOriginal : selectedAdded;
    if (selectedIds.length > 0) {
      deleteMutation.mutate(selectedIds);
    }

    if (mode === 'original') {
      setSelectedOriginal([]);
      setIsDeleteModeOriginal(false);
    } else {
      setSelectedAdded([]);
      setIsDeleteModeAdded(false);
    }
  };

  const handlePageChange = async (pageChangeAction: PageChangeAction) => {
    console.log('PageChange:', pageChangeAction);
    setPage((current) =>
      pageChangeAction === 'NEXT' ? current + 1 : current - 1,
    );
    console.log(`page: ${page}`);
  };

  const handleSideBarPageChange = async (
    pageChangeAction: PageChangeAction,
  ) => {
    setSideBarPage((current) =>
      pageChangeAction === 'NEXT' ? current + 1 : current - 1,
    );
    console.log(`page: ${sideBarPage}`);
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
    if (!memberData || !Array.isArray(memberData.members)) {
      console.error('memberData가 올바른 형식이 아닙니다.', memberData);
      toast.loading('데이터를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    if (selectedAdded.length === 0) {
      toast.error('추가할 관리자를 선택해주세요.');
      return;
    }

    const selectedMembers = memberData.members
      .filter((member: Admins) => selectedAdded.includes(member.memberId))
      .map((member: Admins) => member.memberId);

    mutation.mutate(selectedMembers);
  };

  const handleSearch = async () => {
    await refetch().then(() => {
      setPage(1);
    });
  };

  return (
    <div className="flex flex-col justify-center gap-8 px-4 md:px-16 lg:px-64">
      <div className="pt-20 text-center">
        <p className="text-2xl">관리자 조회하기</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <SearchInput
          placeholder="이름을 입력해 주세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />
        <Sidebar triggerText="새로운 관리자 추가하기" title="관리자 추가하기">
          <div className="flex w-full flex-col items-center justify-center">
            <div className="flex w-full flex-col">
              <TableComponent
                admins={memberData.members}
                headers={['이름', '학번']}
                showCheckboxes
                selected={selectedAdded}
                setSelected={setSelectedAdded}
                currentPage={sideBarPage}
                totalPage={memberData.totalPage}
                onPageChange={handleSideBarPageChange}
              />
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
          admins={originalData.admins}
          showCheckboxes={isDeleteModeOriginal}
          selected={selectedOriginal}
          setSelected={setSelectedOriginal}
          currentPage={page}
          totalPage={originalData.totalPage > 0 ? originalData.totalPage : 1}
          onPageChange={handlePageChange}
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
