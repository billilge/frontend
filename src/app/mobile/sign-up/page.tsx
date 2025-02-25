'use client';

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import postSignUp from '@/services/sign-up';
import { decode } from 'js-base64';

export default function SignUp() {
  const router = useRouter();

  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleStudentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentName(e.target.value);
  };

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(e.target.value);
  };

  const validateForm = () => {
    const nameRegex = /^[가-힣]{2,5}$/;
    if (!nameRegex.test(studentName)) {
      alert('이름은 한글 2~5자로 입력해 주세요.');
      return false;
    }

    const idRegex = /^\d{8}$/;
    if (!idRegex.test(studentId)) {
      alert('학번은 숫자 8자리여야 합니다.');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    const email = localStorage.getItem('email');
    if (!email) {
      alert('이메일 정보가 없습니다. 다시 로그인해 주세요.');
      return;
    }

    try {
      const data = await postSignUp({
        email,
        studentId,
        name: studentName,
      });

      const userInfo = { name: studentName, id: studentId, role: 'USER' };

      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(userInfo));

      router.push('/mobile/main');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
      }
      console.error(e);
    }
  };

  return (
    <section className="relative flex h-dvh w-full flex-col items-center justify-start overflow-hidden">
      <section className="mt-20 flex w-11/12 flex-col items-start">
        <div className="text-heading-3_M font-semibold">
          복지물품 대여 시스템
        </div>
        <div className="text-heading-2_M font-bold">
          빌릴게에 오신 것을 환영합니다!
        </div>
      </section>
      <section className="mt-[50px] flex w-11/12 flex-col items-start gap-6">
        <section className="flex w-full flex-col gap-1.5">
          <div>이름을 입력해 주세요.</div>
          <input
            placeholder="이름을 정확히 입력해 주세요."
            className="flex w-full rounded-xl border px-3.5 py-4"
            value={studentName}
            onChange={handleStudentNameChange}
          />
        </section>
        <section className="flex w-full flex-col gap-1.5">
          <div>학번을 입력해 주세요.</div>
          <input
            placeholder="8자 모두 입력해 주세요."
            className="flex w-full rounded-xl border px-3.5 py-4"
            value={studentId}
            onChange={handleStudentIdChange}
          />
        </section>
      </section>

      <button
        className="absolute bottom-7 flex w-11/12 justify-between rounded-2xl border bg-on-kookmin px-6 py-4 text-white-primary"
        type="button"
        onClick={handleSignUp}
      >
        <div className="h-6 w-6" />
        <div className="flex font-medium">작성 완료</div>
        <div className="h-6 w-6" />
      </button>
    </section>
  );
}
