'use client';

import { useEffect, useState } from 'react';
import MobileLayout from '@/components/mobile/layout';
import MainHeader from '@/app/mobile/main/_components/MainHeader';
import Carousel from '@/app/mobile/main/_components/Carousel';
import WelfareItem from '@/app/mobile/main/_components/WelfareItem';
import BottomSheet from '@/components/mobile/BottomSheet';
import { getWelfareItems } from '@/apis/item';
import { WelfareItemData, Item } from '@/types/welfareItemType';

export default function MobileMain() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [welfareItems, setWelfareItems] = useState<WelfareItemData>({
    items: [],
  });

  useEffect(() => {
    const fetchWelfareItems = async () => {
      try {
        const data = await getWelfareItems();
        setWelfareItems(data);
      } catch (err) {
        console.log('getWelfareItems api 연동 오류 발생', err);
      }
    };

    fetchWelfareItems();
  }, []);

  const imageUrls = [
    '/assets/images/test.png',
    '/assets/images/test2.png',
    '/assets/images/test.png',
  ];

  const handleOpenBottomSheet = (item: Item) => {
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
            {welfareItems.items.map((item) => (
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
