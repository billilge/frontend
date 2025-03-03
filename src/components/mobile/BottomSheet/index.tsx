'use client';

import React, { useState, useEffect } from 'react';
import IconClose from 'public/assets/icons/bottom-sheet/icon-close.svg';
import IconHomeIndicator from 'public/assets/icons/bottom-sheet/icon-home-indicator.svg';
import Image from 'next/image';
import { Item } from '@/types/welfareItemType';
import { requestItems } from '@/apis/rental';

interface BottomSheetProps {
  isOpen: boolean;
  onCloseAction: () => void;
  item: Item | null;
}

export default function BottomSheet({
  isOpen,
  onCloseAction,
  item,
}: BottomSheetProps) {
  const [quantity, setQuantity] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [errors, setErrors] = useState<{ quantity?: string; time?: string }>(
    {},
  );

  const maxQuantity = item?.count || 0;
  const minHour = 10;
  const maxHour = 17;

  // 모달이 열릴 때마다 입력값 초기화
  useEffect(() => {
    if (isOpen) {
      setQuantity('');
      setHour('');
      setMinute('');
      setErrors({});
    }
  }, [isOpen]);

  // 배경 클릭 시 닫기
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCloseAction();
    }
  };

  // 수량 입력 시 검증
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuantity(value);

    const numQuantity = parseInt(value, 10);
    let errorMsg = '';

    if (Number.isNaN(numQuantity) || numQuantity <= 0) {
      errorMsg = '대여 수량을 입력해주세요.';
    } else if (numQuantity > maxQuantity) {
      errorMsg = `대여 가능한 최대 수량은 ${maxQuantity}개입니다. 다시 입력해주세요.`;
    }

    setErrors((prevErrors) => ({ ...prevErrors, quantity: errorMsg }));
  };

  // 시간 입력 시 검증
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHour(value);

    const numHour = parseInt(value, 10);
    let errorMsg = '';

    if (Number.isNaN(numHour)) {
      errorMsg = '올바른 시간을 입력해주세요.';
    } else if (numHour < minHour || numHour >= maxHour) {
      errorMsg = `대여 가능 시간은 ${minHour}:00 ~ ${maxHour}:00입니다. 다시 입력해주세요.`;
    }

    setErrors((prevErrors) => ({ ...prevErrors, time: errorMsg }));
  };

  // 분 입력 시 검증
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMinute(value);

    const numHour = parseInt(hour, 10);
    const numMinute = parseInt(value, 10);
    let errorMsg = '';

    if (Number.isNaN(numHour) || Number.isNaN(numMinute)) {
      errorMsg = '올바른 시간을 입력해주세요.';
    } else if (numHour < minHour || numHour >= maxHour) {
      errorMsg = `대여 가능 시간은 ${minHour}:00 ~ ${maxHour}:00입니다. 다시 입력해주세요.`;
    }

    setErrors((prevErrors) => ({ ...prevErrors, time: errorMsg }));
  };

  const handleRent = async () => {
    if (!item) return;
    if (
      errors.quantity ||
      errors.time ||
      quantity === '' ||
      hour === '' ||
      minute === ''
    ) {
      return;
    }

    try {
      await requestItems({
        itemId: item.itemId,
        count: parseInt(quantity, 10),
        rentalTime: {
          hour: parseInt(hour, 10),
          minute: parseInt(minute, 10),
        },
        ignoreDuplicate: false,
      });

      console.log(`${item.itemName} 대여가 완료되었습니다!`);
      onCloseAction();
    } catch (error) {
      console.error('대여 신청 실패:', error);
    }
  };

  if (!item) return null;

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        onClick={handleOverlayClick}
        className={`fixed inset-0 z-40 flex items-end justify-center bg-black-primary bg-opacity-50 transition-opacity ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      />
      <div
        className={`fixed bottom-0 z-50 flex w-full max-w-md transform flex-col items-center gap-5 rounded-t-[20px] bg-white px-[30px] pb-[30px] pt-[10px] transition-transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <IconHomeIndicator />

        <div className="flex flex-col gap-[30px]">
          {/* 닫기 버튼 */}
          <div className="flex items-center justify-between text-heading-4_M font-semibold text-black-primary">
            <div className="h-[20px] w-[20px]" />
            <h2 className="text-lg font-semibold">물품 대여</h2>
            <button type="button" onClick={onCloseAction}>
              <IconClose />
            </button>
          </div>

          {/* 아이템 정보 */}
          <section className="flex items-center gap-[17px] rounded-[20px] border-[0.5px] border-gray-border p-[15px]">
            <div className="flex aspect-square h-[40px] w-[40px] items-center justify-center rounded-full bg-gray-tertiary p-1">
              <Image
                width={26}
                height={26}
                src={item.imageUrl}
                alt={item.itemName}
              />
            </div>
            <div className="flex flex-col gap-[7px]">
              <div className="text-body-2-normal_semi font-semibold text-black-primary">
                {item.itemName}
              </div>
              <div className="flex gap-[9px] text-caption-1_midi font-medium text-gray-primary">
                <div>현재 수량</div>
                {item.count}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-[15px]">
            {/* 수량 입력 */}
            <div className="flex flex-col gap-[8px]">
              <div className="text-body-2-normal_semi font-semibold text-black-primary">
                수량
              </div>
              <input
                type="number"
                className={`rounded-[10px] border px-3.5 py-2.5 text-caption-1_midi font-medium ${
                  errors.quantity ? 'border-warning' : 'border-gray-border'
                }`}
                placeholder="0"
                value={quantity}
                onChange={handleQuantityChange}
              />
              {errors.quantity && (
                <p className="text-caption-2_midi text-warning">
                  {errors.quantity}
                </p>
              )}
            </div>

            {/* 시간 입력 */}
            <div className="flex flex-col gap-[8px]">
              <div className="text-body-2-normal_semi font-semibold text-black-primary">
                시간
              </div>
              <div className="flex items-center gap-2 text-caption-1_midi font-medium">
                <input
                  type="number"
                  className={`w-1/2 rounded-[10px] border px-3.5 py-2.5 ${
                    errors.time ? 'border-warning' : 'border-gray-border'
                  }`}
                  placeholder="HH"
                  value={hour}
                  onChange={handleHourChange}
                />
                <span>:</span>
                <input
                  type="number"
                  className={`w-1/2 rounded-[10px] border px-3.5 py-2.5 ${
                    errors.time ? 'border-warning' : 'border-gray-border'
                  }`}
                  placeholder="MM"
                  value={minute}
                  onChange={handleMinuteChange}
                />
              </div>
              {errors.time && (
                <p className="text-caption-2_midi text-warning">
                  {errors.time}
                </p>
              )}
            </div>
          </section>

          {/* 대여하기 버튼 */}
          <button
            type="button"
            onClick={handleRent}
            className={`w-full rounded-[10px] p-3 text-body-1-normal_semi font-semibold transition ${
              !errors.quantity &&
              !errors.time &&
              quantity !== '' &&
              hour !== '' &&
              minute !== ''
                ? 'bg-return-blue text-white-primary'
                : 'cursor-not-allowed bg-gray-tertiary text-gray-secondary'
            }`}
            disabled={
              !!(
                errors.quantity ||
                errors.time ||
                quantity === '' ||
                hour === '' ||
                minute === ''
              )
            }
          >
            대여하기
          </button>
        </div>
      </div>
    </>
  );
}
