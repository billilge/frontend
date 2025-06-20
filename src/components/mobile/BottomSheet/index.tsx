'use client';

import React, { useState, useEffect } from 'react';
import IconClose from 'public/assets/icons/bottom-sheet/icon-close.svg';
import IconHomeIndicator from 'public/assets/icons/bottom-sheet/icon-home-indicator.svg';
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
                className={`rounded-[10px] border px-3.5 py-2.5 text-base font-medium ${
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
              <div className="flex items-center gap-2 text-base font-medium">
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
            onClick={() => handleRent(false)}
            className={`w-full rounded-[10px] p-3 text-body-1-normal_semi font-semibold transition ${
              !errors.quantity &&
              !errors.time &&
              quantity !== '' &&
              hour !== '' &&
              minute !== '' &&
              !isLoading
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
