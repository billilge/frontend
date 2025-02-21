import MobileLayout from '@/components/mobile/layout';
import ImageLoginLogo from 'public/assets/images/image-login-logo.svg';

export default function SignIn() {
  return (
    <MobileLayout>
      <section className="flex flex-col items-center justify-center">
        <section className="mt-[126px] flex flex-col items-center justify-center gap-1.5">
          <div className="text-2xl font-normal">
            국민대학교 소프트웨어융합대학
          </div>
          <div className="text-3xl font-semibold">복지물품 대여 시스템</div>
        </section>
        <ImageLoginLogo />
        <button type="button">Google로 시작하기</button>
      </section>
    </MobileLayout>
  );
}
