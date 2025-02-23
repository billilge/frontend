'use client';

import { useState } from 'react';
import MobileLayout from '@/components/mobile/layout';
import MainHeader from '@/app/mobile/main/_components/MainHeader';
import Carousel from '@/app/mobile/main/_components/Carousel';
import WelfareItem from '@/app/mobile/main/_components/WelfareItem';
import BottomSheet from '@/components/mobile/BottomSheet';

export default function MobileMain() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const imageUrls = [
    '/assets/images/test.png',
    '/assets/images/test2.png',
    '/assets/images/test.png',
  ];

  const items = [
    {
      itemId: 12,
      itemName: '우산',
      itemType: 'RENTAL',
      count: 10,
      imageUrl: '/assets/icons/icon-test.svg',
    },
    {
      itemId: 11,
      itemName: '감자',
      itemType: 'RENTAL',
      count: 10,
      imageUrl: '/assets/icons/icon-test.svg',
    },
    {
      itemId: 13,
      itemName: '왕연진',
      itemType: 'RENTAL',
      count: 10,
      imageUrl: '/assets/icons/icon-test.svg',
    },
    {
      itemId: 3,
      itemName: '왕연진',
      itemType: 'RENTAL',
      count: 10,
      imageUrl: '/assets/icons/icon-test.svg',
    },
    {
      itemId: 1,
      itemName: '왕연진',
      itemType: 'RENTAL',
      count: 10,
      imageUrl: '/assets/icons/icon-test.svg',
    },
    {
      itemId: 14,
      itemName: '현진',
      itemType: 'RENTAL',
      count: 10,
      imageUrl: '/assets/icons/icon-test.svg',
    },
    {
      itemId: 15,
      itemName: '황현진',
      itemType: 'RENTAL',
      count: 10,
      imageUrl: '/assets/icons/icon-test.svg',
    },
    {
      itemId: 16,
      itemName: '진',
      itemType: 'RENTAL',
      count: 10,
      imageUrl: '/assets/icons/icon-test.svg',
    },
  ];

  const handleOpenBottomSheet = (item: any) => {
    setSelectedItem(item);
    setIsBottomSheetOpen(true);
  };

  return (
    <MobileLayout>
      <MainHeader name="황현진" />
      <div className="mt-10 flex flex-col gap-[50px] px-4 pt-4">
        <Carousel images={imageUrls} />

        <section className="flex flex-col gap-4">
          <div className="text-heading-4_M font-semibold">복지 물품 목록</div>
          <div className="flex flex-col gap-[9px]">
            {items.map((item) => (
              <WelfareItem
                key={item.itemId}
                itemName={item.itemName}
                imageUrl={item.imageUrl}
                count={item.count}
                onRentalClick={() => handleOpenBottomSheet(item)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Sheet */}
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onCloseAction={() => setIsBottomSheetOpen(false)}
        item={selectedItem}
      />
    </MobileLayout>
  );
}
