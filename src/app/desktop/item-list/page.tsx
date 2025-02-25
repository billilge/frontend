'use client';

import Sidebar from 'src/components/desktop/Sidebar';
import Search from '@/components/desktop/Search';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import TableComponent from './_components/ItemTable';

const dummyData = [
  {
    id: 1,
    name: '물품1',
    isConsumable: false,
    totalQuantity: 100,
    rentedQuantity: 30,
    logo: 'logo1.png',
  },
  {
    id: 2,
    name: '물품2',
    isConsumable: false,
    totalQuantity: 200,
    rentedQuantity: 50,
    logo: 'logo2.png',
  },
  {
    id: 3,
    name: '물품3',
    isConsumable: false,
    totalQuantity: 300,
    rentedQuantity: 70,
    logo: 'logo3.png',
  },
];

const dummyData2 = [
  {
    id: 4,
    name: '물품4',
    isConsumable: false,
    totalQuantity: 400,
    rentedQuantity: 90,
    logo: 'logo4.png',
  },
  {
    id: 5,
    name: '물품5',
    isConsumable: false,
    totalQuantity: 500,
    rentedQuantity: 120,
    logo: 'logo5.png',
  },
];

export default function PayerInquiryPage() {
  const [data, setData] = useState(dummyData);
  const [, setAddedData] = useState(dummyData2);
  const [isDeleteModeOriginal, setIsDeleteModeOriginal] = useState(false);
  const [selectedOriginal, setSelectedOriginal] = useState<string[]>([]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [itemName, setItemName] = useState('');
  const [isConsumable, setIsConsumable] = useState(false);
  const [quantity, setQuantity] = useState<number | ''>('');

  const handleDeleteOriginal = () => {
    const hasRentedItems = data.some(
      (item) =>
        selectedOriginal.includes(String(item.id)) && item.rentedQuantity > 0,
    );

    if (hasRentedItems) {
      alert('대여 중인 물품은 삭제할 수 없습니다.');
      return;
    }

    setData(data.filter((item) => !selectedOriginal.includes(String(item.id))));
    setIsDeleteModeOriginal(false);
    setSelectedOriginal([]);
  };

  const handleAddItem = () => {
    if (!itemName || quantity === '' || quantity <= 0) {
      alert('모든 정보를 입력하세요.');
      return;
    }

    const newItem = {
      id: Date.now(),
      name: itemName,
      isConsumable,
      totalQuantity: Number(quantity),
      rentedQuantity: 0,
      logo: selectedImage || 'default.png',
    };

    setAddedData((prev) => [...prev, newItem]);

    setItemName('');
    setIsConsumable(false);
    setQuantity('');
    setSelectedImage(null);

    alert('물품 등록을 완료하였습니다.');
  };

  const isAddButtonDisabled = !itemName || quantity === '' || quantity <= 0;

  return (
    <div className="flex flex-col justify-center gap-8 px-4 md:px-16 lg:px-64">
      <div className="pt-20 text-center">
        <p className="text-2xl">새로운 복지 물품 추가하기</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Search />
        <Sidebar
          triggerText="복지 물품 추가하기"
          title="복지 물품 추가하기"
          description="설명"
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">복지물품 이모티콘</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedImage(URL.createObjectURL(e.target.files[0]));
                }
              }}
              className="hidden"
              id="imageUpload"
            />
            <label htmlFor="imageUpload" className="cursor-pointer">
              {selectedImage ? (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="h-24 w-24 rounded-md object-cover"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 rounded-full bg-black p-1 text-white opacity-50 hover:opacity-75"
                    onClick={() => setSelectedImage(null)}
                  >
                    X
                  </button>
                </div>
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-md bg-gray-200">
                  <span className="text-sm text-gray-500">이미지 추가</span>
                </div>
              )}
            </label>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <label className="text-sm font-semibold">복지물품명</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="등록할 복지물품의 이름을 입력해 주세요."
              className="rounded-md border px-4 py-2"
            />

            <label className="text-sm font-semibold">소모품 여부</label>
            <div className="flex gap-2">
              <button
                type="button"
                className={`rounded-md border px-4 py-2 ${!isConsumable ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                onClick={() => setIsConsumable(false)}
              >
                대여물품
              </button>
              <button
                type="button"
                className={`rounded-md border px-4 py-2 ${isConsumable ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                onClick={() => setIsConsumable(true)}
              >
                소모물품
              </button>
            </div>

            <label className="text-sm font-semibold">수량</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value ? Number(e.target.value) : '')
              }
              placeholder="등록할 복지물품의 수량을 입력해 주세요."
              className="rounded-md border px-4 py-2"
            />
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              variant="primary"
              onClick={handleAddItem}
              className="mt-4 w-full"
              disabled={isAddButtonDisabled}
            >
              물품 추가
            </Button>
          </div>
        </Sidebar>
      </div>

      <div className="flex flex-col justify-between">
        <TableComponent
          data={data}
          showCheckboxes={isDeleteModeOriginal}
          selected={selectedOriginal}
          setSelected={setSelectedOriginal}
        />
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="deleteSecondary"
            onClick={() => setIsDeleteModeOriginal(!isDeleteModeOriginal)}
          >
            {isDeleteModeOriginal ? '취소' : '삭제'}
          </Button>
          {isDeleteModeOriginal && (
            <Button
              size="sm"
              variant="deletePrimary"
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
