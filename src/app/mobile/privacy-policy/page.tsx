'use client';

import MobileLayout from '@/components/mobile/layout';
import Header from '@/components/mobile/Header';
import privacyPolicy from './privacyPolicyData';

export default function UserRentalList() {
  return (
    <MobileLayout>
      <Header title="개인정보 이용약관" menu={false} />

      {/* 반납이 필요한 물품 */}
      <div className="relative h-full px-[15px] pb-12 pt-[17px]">
        <div className="pb-[7px] text-caption-2_midi font-medium text-gray-secondary">
          최종 수정일: 2025년 3월 5일
        </div>
        <div className="whitespace-pre-line rounded-[10px] border border-[#D9D9D9] bg-white px-3.5 py-[18px] text-caption-1_semi">
          <h1>{privacyPolicy.title1}</h1>
          <h1>{privacyPolicy.title2}</h1>
          {privacyPolicy.sections.map((section) => (
            <div key={section.title}>
              <h2>{section.title}</h2>
              {section.content.map((text) =>
                typeof text === 'object' ? (
                  <>
                    <h3 key={text.title}>{text.title}</h3>
                    <ul className="list-disc px-3.5">
                      {text.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p key={text}>{text}</p>
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex h-12 items-center justify-center bg-[#F3F4F6]">
        <div className="text-body-2-normal_medi">© wink</div>
      </div>
    </MobileLayout>
  );
}
