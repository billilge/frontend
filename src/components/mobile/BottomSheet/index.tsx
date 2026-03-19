'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Item } from '@/types/welfareItemType';
import { requestItems } from '@/apis/rental';
import Alert from '@/components/mobile/Alert';
import { AxiosError } from 'axios';
import MessageAlert from 'src/components/mobile/MessageAlert';

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
  const [actionAlertState, setActionAlertState] = useState<{
    isAlertOpen: boolean;
  }>({
    isAlertOpen: false,
  });
  const [messageAlertState, setMessageAlertState] = useState<{
    isMessageAlertOpen: boolean;
    alertMessage: string;
  }>({
    isMessageAlertOpen: false,
    alertMessage: '',
  });

  // 버튼 중복 클릭 방지
  const [isLoading, setIsLoading] = useState(false);

  const maxQuantity = item?.count || 0;

  // 모달이 열릴 때마다 입력값 초기화
  useEffect(() => {
    if (isOpen) {
      setQuantity('');
      setHour('');
      setMinute('');
      setErrors({});
      setActionAlertState({ isAlertOpen: false });
      setMessageAlertState({ isMessageAlertOpen: false, alertMessage: '' });
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

  // 통합 시간 검증 함수
  const validateTime = (hourStr: string, minuteStr: string): string => {
    const numHour = parseInt(hourStr, 10);
    const numMinute = parseInt(minuteStr, 10);

    if (Number.isNaN(numHour) || Number.isNaN(numMinute)) {
      return '올바른 시간을 입력해주세요.';
    }

    const now = new Date();
    const inputTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      numHour,
      numMinute,
    );
    const openTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      10,
      0,
    );
    const closeTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      17,
      0,
    );

    // 점심 시간
    const lunchOpenTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      12,
      0,
    );
    const lunchCloseTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      12,
      59,
    );

    // 운영시간: 10:00 ~ 17:00
    if (inputTime < openTime || inputTime > closeTime) {
      return '대여 가능한 시간은 10:00 ~ 17:00입니다.';
    }

    // 점심시간: 12:00 ~ 12:59
    if (inputTime >= lunchOpenTime && inputTime < lunchCloseTime) {
      return '12:00 ~ 12:59은 점심시간입니다.';
    }

    // 입력 시간이 현재 시간보다 이후인지 체크
    if (inputTime <= now) {
      return '대여는 현재 시간 이후로만 가능합니다.';
    }

    // 현재 시각을 기준으로 5분 후 체크 (현재 시간이 16:55 이전일 때만 적용)
    const threshold = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      16,
      55,
    );
    if (now < threshold) {
      const fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000);
      if (inputTime < fiveMinutesLater) {
        return '대여는 현재 시간으로부터 5분 후에 가능합니다.';
      }
    }

    return '';
  };

  // 시간 입력 시 검증 (시)
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHour(value);

    const errorMsg = validateTime(value, minute);
    setErrors((prevErrors) => ({ ...prevErrors, time: errorMsg }));
  };

  // 시간 입력 시 검증 (분)
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMinute(value);

    const errorMsg = validateTime(hour, value);
    setErrors((prevErrors) => ({ ...prevErrors, time: errorMsg }));
  };

  const handleRent = async (ignoreDuplicate = false) => {
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
    if (isLoading) return;

    setIsLoading(true);

    try {
      await requestItems({
        itemId: item.itemId,
        count: parseInt(quantity, 10),
        rentalTime: {
          hour: parseInt(hour, 10),
          minute: parseInt(minute, 10),
        },
        ignoreDuplicate,
      });

      onCloseAction(); // BottomSheet를 먼저 닫고
      setTimeout(() => {
        setMessageAlertState({
          isMessageAlertOpen: true,
          alertMessage: `${item.itemName} 대여 신청이 완료되었습니다!`,
        });
      }, 100); // MessageAlert창 표시
    } catch (error) {
      if (error instanceof AxiosError) {
        onCloseAction(); // BottomSheet를 먼저 닫고

        if (error.response?.status === 409) {
          // 중복대여시 에러
          setTimeout(() => {
            setActionAlertState({ isAlertOpen: true });
          }, 300);
        } else if (error.response?.status === 500) {
          // 500 에러 발생시
          setTimeout(() => {
            setMessageAlertState({
              isMessageAlertOpen: true,
              alertMessage:
                '일시적인 서버 문제로 오류가 발생했습니다.\n 다시 시도해 주세요.',
            });
          }, 300);
        } else {
          // 이외의 서버에서 보내주는 에러 메시지 띄우기
          setTimeout(() => {
            setMessageAlertState({
              isMessageAlertOpen: true,
              alertMessage: error.response?.data.message,
            });
          }, 300);
        }
      } else {
        // Axios 에러가 아닌 경우
        onCloseAction();
        setTimeout(() => {
          setMessageAlertState({
            isMessageAlertOpen: true,
            alertMessage: '알 수 없는 오류가 발생했습니다.',
          });
        }, 300);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!item) return null;

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        onClick={handleOverlayClick}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md transform rounded-t-[16px] bg-white transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* 핸들바 */}
        <div className="flex justify-center pb-2 pt-3">
          <div className="h-[4px] w-[36px] rounded-full bg-gray-border" />
        </div>

        {/* 컨텐츠 영역 */}
        <div className="flex flex-col px-6 pb-8">
          {/* 타이틀 */}
          <h2 className="pb-5 text-[20px] font-bold leading-[29px] text-black-primary">
            물품 대여
          </h2>

          {/* 아이템 정보 */}
          <section className="mb-5 flex items-center gap-[14px] rounded-[12px] bg-gray-tertiary px-4 py-[14px]">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white">
              <Image
                width={26}
                height={26}
                src={item.imageUrl}
                alt={item.itemName}
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              <div className="text-[15px] font-semibold leading-[22px] text-black-primary">
                {item.itemName}
              </div>
              <div className="text-[13px] leading-[19px] text-gray-secondary">
                현재 수량 {item.count}
              </div>
            </div>
          </section>

          {/* 입력 폼 */}
          <section className="mb-8 flex flex-col gap-[16px]">
            {/* 수량 입력 */}
            <div className="flex flex-col gap-[6px]">
              <label
                htmlFor="rental-quantity"
                className="text-[14px] font-semibold leading-[20px] text-black-primary"
              >
                수량
              </label>
              <input
                id="rental-quantity"
                type="number"
                className={`rounded-[12px] border bg-white px-4 py-3 text-[15px] leading-[22px] outline-none transition-colors focus:border-return-blue ${
                  errors.quantity ? 'border-warning' : 'border-gray-border'
                }`}
                placeholder="0"
                value={quantity}
                onChange={handleQuantityChange}
              />
              {errors.quantity && (
                <p className="text-[12px] leading-[18px] text-warning">
                  {errors.quantity}
                </p>
              )}
            </div>

            {/* 시간 입력 */}
            <div className="flex flex-col gap-[6px]">
              <span className="text-[14px] font-semibold leading-[20px] text-black-primary">
                시간
              </span>
              <div className="flex items-center gap-2">
                <input
                  id="rental-hour"
                  type="number"
                  className={`w-1/2 rounded-[12px] border bg-white px-4 py-3 text-[15px] leading-[22px] outline-none transition-colors focus:border-return-blue ${
                    errors.time ? 'border-warning' : 'border-gray-border'
                  }`}
                  placeholder="HH"
                  value={hour}
                  onChange={handleHourChange}
                />
                <span className="text-[15px] text-gray-secondary">:</span>
                <input
                  type="number"
                  className={`w-1/2 rounded-[12px] border bg-white px-4 py-3 text-[15px] leading-[22px] outline-none transition-colors focus:border-return-blue ${
                    errors.time ? 'border-warning' : 'border-gray-border'
                  }`}
                  placeholder="MM"
                  value={minute}
                  onChange={handleMinuteChange}
                />
              </div>
              {errors.time && (
                <p className="text-[12px] leading-[18px] text-warning">
                  {errors.time}
                </p>
              )}
            </div>
          </section>

          {/* 대여하기 버튼 */}
          <button
            type="button"
            onClick={() => handleRent(false)}
            className={`w-full rounded-[12px] py-[15px] text-[16px] font-semibold transition-colors ${
              !errors.quantity &&
              !errors.time &&
              quantity !== '' &&
              hour !== '' &&
              minute !== '' &&
              !isLoading
                ? 'bg-return-blue text-white-primary active:bg-blue-600'
                : 'cursor-not-allowed bg-gray-tertiary text-gray-secondary'
            }`}
            disabled={
              !!(
                errors.quantity ||
                errors.time ||
                quantity === '' ||
                hour === '' ||
                minute === ''
              ) || isLoading
            }
          >
            대여하기
          </button>
        </div>
      </div>

      {/* 중복 대여 확인 모달 (BottomSheet 닫힌 후 Alert 표시) */}
      {actionAlertState.isAlertOpen && (
        <Alert
          content={'이 물품은 이미 대여 중이에요.\n 그래도 한 번 더 빌릴까요?'}
          ctaButtonText="대여할게요"
          otherButtonText="괜찮아요"
          isMainColor
          onClickCta={() => {
            handleRent(true);
            setActionAlertState({ isAlertOpen: false });
          }}
          onClickOther={() => setActionAlertState({ isAlertOpen: false })}
        />
      )}

      {messageAlertState.isMessageAlertOpen && (
        <MessageAlert
          content={messageAlertState.alertMessage}
          onClickClose={() =>
            setMessageAlertState({
              isMessageAlertOpen: false,
              alertMessage: '',
            })
          }
        />
      )}
    </>
  );
}
