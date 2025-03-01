'use client';

import ImageLoginLogo from 'public/assets/images/image-login-logo.svg';
import { useRef } from 'react';
import axios from 'axios';
import { postAdminLogin } from '@/services/admins';
import { handleLoginSuccess } from '@/utils/loginHandler';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const studentIdRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const validateLoginForm = (studentId: string, password: string) => {
    if (!studentId) {
      alert('학번을 입력해 주세요!');
      return false;
    }

    if (!password) {
      alert('비밀번호를 입력해 주세요!');
      return false;
    }

    const idRegex = /^\d{8}$/;
    if (!idRegex.test(studentId)) {
      alert('학번은 숫자 8자리여야 합니다.');
      return false;
    }

    return true;
  };

  const handleAdminLogin = async () => {
    const studentId = studentIdRef?.current?.value || '';
    const password = passwordRef?.current?.value || '';

    if (!validateLoginForm(studentId, password)) return;

    try {
      const data = await postAdminLogin({
        studentId,
        password,
      });

      handleLoginSuccess(data.accessToken);
      router.push('/desktop/rental-history');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;

        if (!errorResponse) {
          alert('관리자 로그인 중 오류가 발생했습니다!');
          return;
        }

        alert(errorResponse.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-row items-center justify-center gap-80 p-8 pb-20">
      <section>
        <ImageLoginLogo />
      </section>
      <section className="flex w-[512px] flex-col items-center justify-center">
        <div className="flex w-[300px] flex-col items-center justify-center gap-11 text-center">
          <div>
            <h1>국민대학교 소프트웨어융합대학</h1>
            <p className="text-3xl font-bold">복지물품 대여 시스템</p>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-5">
            <input
              className="w-full border-b-2 border-gray-secondary pb-1 pl-1 pt-1 text-start text-body-1-normal_medi placeholder-gray-secondary placeholder:text-body-1-normal_medi focus:outline-none"
              type="text"
              placeholder="학번"
              ref={studentIdRef}
            />
            <input
              className="w-full border-b-2 border-gray-secondary pb-1 pl-1 pt-1 text-start text-body-1-normal_medi placeholder-gray-secondary placeholder:text-body-1-normal_medi focus:outline-none"
              type="password"
              placeholder="비밀번호"
              ref={passwordRef}
            />
          </div>
          <div className="w-full items-center justify-center">
            <button
              className="w-full rounded bg-on-kookmin pb-2 pt-2 text-center text-body-1-normal_medi text-white"
              type="button"
              onClick={handleAdminLogin}
            >
              로그인
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
