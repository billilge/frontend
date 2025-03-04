import { useCallback, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Item, ItemTableProps, ItemTypeText } from '@/types/items';
import Image from 'next/image';
import { PageChangeAction } from '@/types/paginationType';
import { useMutation } from '@tanstack/react-query';
import { updateItems } from '@/services/items';
import toast from 'react-hot-toast';
import Sidebar from '../ItemSidebar/index';

export default function ItemTable({
  items = [],
  showCheckboxes = true,
  headers = ['로고', '물품명', '소모품/대여품', '총 수량', '대여 중'],
  selected,
  setSelected,
  currentPage = 1,
  totalPage = 1,
  onPageChange = (pageAction: PageChangeAction) => {
    console.log(pageAction);
  },
}: ItemTableProps) {
  const [formData, setFormData] = useState({
    itemId: selected,
    selectedImage: null as File | null,
    itemName: '',
    isConsumable: false,
    quantity: '' as number | '',
  });

  const mutation = useMutation({
    mutationFn: (data: { itemId: number; formData: FormData }) =>
      updateItems(data.formData, data.itemId),
    onSuccess: () => {
      toast.success('변경사항이 저장되었습니다.');
    },
    onError: () => {
      toast.error('변경사항 저장에 실패했습니다.');
    },
  });

  const handleSelect = (id: number) => {
    setSelected(id);
  };

  const handleSelectAll = () => {
    setSelected(selected === items[0]?.itemId ? 0 : items[0]?.itemId); // Toggle selection of first item
  };

  const handlePageChangeBtnClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    pageChangeAction: PageChangeAction,
  ) => {
    event.preventDefault();
    onPageChange(pageChangeAction);
  };

  const handleUpdateItem = useCallback(
    (itemId: number) => {
      const { itemName, quantity, selectedImage, isConsumable } = formData;

      if (!itemName || quantity === '' || quantity <= 0) {
        toast.error('모든 정보를 입력하세요.');
        return;
      }

      const newFormData = new FormData();
      if (selectedImage) newFormData.append('image', selectedImage);

      const editData = {
        name: itemName,
        type: isConsumable ? 'CONSUMPTION' : 'RENTAL',
        count: Number(quantity),
      };

      newFormData.append(
        'itemRequest',
        new Blob([JSON.stringify(editData)], { type: 'application/json' }),
      );

      mutation.mutate({ itemId, formData: newFormData });

      setFormData({
        itemId: 0,
        selectedImage: null,
        itemName: '',
        isConsumable: false,
        quantity: '',
      });
    },
    [formData, mutation],
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, selectedImage: file }));
    }
  };

  return (
    <div className="flex w-full flex-col p-10">
      <Table>
        <TableHeader>
          <TableRow>
            {showCheckboxes && (
              <TableHead className="w-10 text-center">
                <Checkbox
                  checked={selected === items[0]?.itemId}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
            )}
            {headers.map((header) => (
              <TableHead key={header} className="w-30 text-center">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length > 0 ? (
            items.map((item: Item) => (
              <TableRow key={`${item.itemId}${item.itemName}`}>
                {showCheckboxes && (
                  <TableCell className="w-10 text-center">
                    <Checkbox
                      checked={selected === item.itemId}
                      onCheckedChange={() => handleSelect(item.itemId)}
                    />
                  </TableCell>
                )}
                <TableCell className="w-30 flex items-center justify-center text-center">
                  <Image
                    src={item.imageUrl}
                    width={24}
                    height={24}
                    alt="item"
                    className="h-10 w-10 rounded"
                  />
                </TableCell>
                <TableCell className="w-30 text-center">
                  {item.itemName}
                </TableCell>
                <TableCell className="w-30 text-center">
                  {ItemTypeText[item.itemType]}
                </TableCell>
                <TableCell className="w-30 text-center">{item.count}</TableCell>
                <TableCell className="w-30 text-center">
                  {item.renterCount}
                </TableCell>
                <TableCell className="w-30 text-center">
                  <Sidebar triggerText="수정하기" title="물품 수정하기">
                    <div className="mt-4 flex flex-col gap-2">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label className="text-sm font-semibold">
                        복지물품명
                      </label>
                      <input
                        type="text"
                        value={formData.itemName}
                        onChange={(e) =>
                          setFormData({ ...formData, itemName: e.target.value })
                        }
                        className="rounded-md border px-4 py-2"
                      />
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label className="text-sm font-semibold">
                        소모품 여부
                      </label>
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
                          onClick={() =>
                            setFormData({ ...formData, isConsumable: true })
                          }
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
                            quantity: Number(e.target.value),
                          })
                        }
                        className="rounded-md border px-4 py-2"
                      />
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label className="text-sm font-semibold">
                        이미지 업로드
                      </label>
                      <p>이미지 변경이 없을 경우 업로드하지 않고 저장합니다.</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {formData.selectedImage && (
                        <Image
                          src={URL.createObjectURL(formData.selectedImage)}
                          width={24}
                          height={24}
                          alt="미리보기"
                          className="mt-2 h-32 w-32 rounded-md object-cover"
                        />
                      )}
                    </div>
                    <div className="flex justify-center">
                      <Button
                        size="lg"
                        variant="primary"
                        onClick={() => handleUpdateItem(item.itemId)}
                        className="mt-4 w-full"
                      >
                        저장
                      </Button>
                    </div>
                  </Sidebar>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={headers.length + (showCheckboxes ? 1 : 0)}
                className="text-center"
              >
                데이터가 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center pt-4">
        <div className="flex items-center gap-2">
          <Button
            className="bg-transparent shadow-transparent hover:bg-transparent"
            disabled={currentPage === 1}
            onClick={(event) => handlePageChangeBtnClick(event, 'PREV')}
          >
            <ChevronLeftIcon className="h-10 w-10 cursor-pointer text-black-primary" />
          </Button>
          <span>
            {currentPage} / {totalPage}
          </span>
          <Button
            className="bg-transparent shadow-transparent hover:bg-transparent"
            disabled={currentPage === totalPage}
            onClick={(event) => handlePageChangeBtnClick(event, 'NEXT')}
          >
            <ChevronRightIcon className="h-6 w-6 cursor-pointer text-black-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
}
