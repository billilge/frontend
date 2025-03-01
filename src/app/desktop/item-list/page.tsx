'use client';

import Sidebar from 'src/components/desktop/Sidebar';
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getItems, addItems, deleteItems } from '@/services/items';
import { SearchInput } from '@/components/ui/search-input';
import TableComponent from './_components/ItemTable';

export default function ItemListPage() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    selectedImage: null as File | null,
    itemName: '',
    isConsumable: false,
    quantity: '' as number | '',
  });

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const mutation = useMutation({
    mutationFn: addItems,
    onSuccess: () => {
      alert('물품 등록이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    onError: () => {
      alert('물품 등록에 실패했습니다.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItems,
    onSuccess: () => {
      alert('선택된 물품이 삭제되었습니다.');
    },
    onError: () => {
      alert('물품 삭제에 실패했습니다.');
    },
  });

  const { data: originalData = [], refetch } = useQuery({
    queryKey: ['items'],
    queryFn: () => getItems(searchQuery),
  });

  // 물품 추가 핸들러
  const handleAddItem = useCallback(() => {
    const { itemName, quantity, selectedImage, isConsumable } = formData;

    if (!itemName || quantity === '' || quantity <= 0) {
      alert('모든 정보를 입력하세요.');
      return;
    }

    const newFormData = new FormData();
    if (selectedImage) newFormData.append('image', selectedImage);

    const itemData = {
      name: itemName,
      type: isConsumable ? 'CONSUMPTION' : 'RENTAL',
      count: Number(quantity),
    };

    newFormData.append(
      'itemRequest',
      new Blob([JSON.stringify(itemData)], { type: 'application/json' }),
    );

    mutation.mutate(newFormData);

    setFormData({
      selectedImage: null,
      itemName: '',
      isConsumable: false,
      quantity: '',
    });
  }, [formData, mutation]);

  // 이미지 파일 선택 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, selectedImage: file }));
    }
  };

  // 삭제 모드 토글
  const toggleDeleteMode = () => {
    setIsDeleteMode((prev) => !prev);
    setSelectedItem(0);
  };

  // 물품 삭제 핸들러
  const handleDeleteItem = () => {
    if (selectedItem === null) {
      alert('삭제할 물품을 선택해 주세요.');
      return;
    }

    deleteMutation.mutate(selectedItem); // selectedItem을 배열로 전달
    setSelectedItem(0);
  };

  return (
    <div className="flex flex-col justify-center gap-8 px-4 md:px-16 lg:px-64">
      <div className="pt-20 text-center">
        <p className="text-2xl">새로운 복지 물품 추가하기</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <SearchInput
          placeholder="물품 이름을 입력해 주세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={refetch}
        />
        <Sidebar triggerText="복지 물품 추가하기" title="복지 물품 추가하기">
          <div className="mt-4 flex flex-col gap-2">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="text-sm font-semibold">복지물품명</label>
            <input
              type="text"
              value={formData.itemName}
              onChange={(e) =>
                setFormData({ ...formData, itemName: e.target.value })
              }
              placeholder="등록할 복지물품의 이름을 입력해 주세요."
              className="rounded-md border px-4 py-2"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="text-sm font-semibold">소모품 여부</label>
            <div className="flex gap-2">
              <button
                type="button"
                className={`rounded-md border px-4 py-2 ${!formData.isConsumable ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                onClick={() =>
                  setFormData({ ...formData, isConsumable: false })
                }
              >
                대여물품
              </button>
              <button
                type="button"
                className={`rounded-md border px-4 py-2 ${formData.isConsumable ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                onClick={() => setFormData({ ...formData, isConsumable: true })}
              >
                소모물품
              </button>
            </div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="text-sm font-semibold">수량</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity: e.target.value ? Number(e.target.value) : '',
                })
              }
              placeholder="등록할 복지물품의 수량을 입력해 주세요."
              className="rounded-md border px-4 py-2"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="text-sm font-semibold">이미지 업로드</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {formData.selectedImage && (
              <img
                src={URL.createObjectURL(formData.selectedImage)}
                alt="미리보기"
                className="mt-2 h-32 w-32 rounded-md object-cover"
              />
            )}
          </div>
          <div className="flex justify-center">
            <Button
              size="lg"
              variant="primary"
              onClick={handleAddItem}
              className="mt-4 w-full"
              disabled={
                !formData.itemName ||
                formData.quantity === '' ||
                formData.quantity <= 0
              }
            >
              물품 추가
            </Button>
          </div>
        </Sidebar>
      </div>

      <div className="flex flex-col justify-between">
        <TableComponent
          items={originalData?.items || []}
          showCheckboxes={isDeleteMode}
          selected={selectedItem}
          setSelected={setSelectedItem}
        />
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            type="button"
            variant="deleteSecondary"
            onClick={toggleDeleteMode}
          >
            {isDeleteMode ? '취소' : '삭제'}
          </Button>
          {isDeleteMode && (
            <Button
              type="button"
              size="sm"
              variant="deletePrimary"
              onClick={handleDeleteItem}
            >
              완료
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
