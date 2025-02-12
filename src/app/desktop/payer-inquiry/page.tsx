import Sidebar from '@/components/desktop/SideBar';
import Search from '@/components/desktop/Search';
import TableComponent from './_components/TableComponent';

const dummyData = [
  { name: '조다운', student_id: '20223139', admin: true },
  { name: '조다운', student_id: '20223139', admin: true },
  { name: '조다운', student_id: '20223139', admin: false },
];

export default function PayerInquiryPage() {
  return (
    <div className="flex flex-col justify-center gap-8 px-64">
      <div className="pt-20 text-center">
        <p className="text-2xl">학생회비 납부자 조회하기</p>
      </div>
      <div className="flex justify-center gap-4">
        <Search />
        <Sidebar
          triggerText="새로운 납부자 추가하기"
          title="Settings"
          description="Manage your preferences"
        >
          <p>Here you can change your account settings.</p>
        </Sidebar>
      </div>
      <TableComponent data={dummyData} />
    </div>
  );
}
