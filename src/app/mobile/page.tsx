import MobileLayout from '@/components/mobile/layout';
import Header from '@/components/mobile/Header';

export default function Mobile() {
  return (
    <MobileLayout>
      {/* <div className="w-full bg-main-primary">
        <h1>국민대학교 소프트웨어융합대학</h1>
        <p className="text-3xl font-bold">복지물품 대여 시스템</p>
      </div> */}
      <Header title="관리자 대시보드" />
    </MobileLayout>
  );
}
