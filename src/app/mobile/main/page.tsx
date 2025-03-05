'use client';

import { useEffect, useState } from 'react';
import MobileLayout from '@/components/mobile/layout';
import MainHeader from '@/app/mobile/main/_components/MainHeader';
import Carousel from '@/app/mobile/main/_components/Carousel';
import WelfareItem from '@/app/mobile/main/_components/WelfareItem';
import BottomSheet from '@/components/mobile/BottomSheet';
import { getWelfareItems } from '@/apis/item';
import { WelfareItemData, Item } from '@/types/welfareItemType';
import IconSearch from 'public/assets/icons/icon-search.svg';
import { useRouter } from 'next/navigation';
import { requestNotificationPermission } from '@/utils/pushNotification';

export default function MobileMain() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [welfareItems, setWelfareItems] = useState<WelfareItemData>({
    items: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const fetchWelfareItems = async () => {
    try {
      const data = await getWelfareItems(searchQuery);
      setWelfareItems(data);
    } catch (err) {
      console.log('getWelfareItems API 오류 발생', err);
    }
  };

  // 디바운스 적용
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchWelfareItems();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.replace('/mobile/sign-in');
      return;
    }
    fetchWelfareItems();

    requestNotificationPermission();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const images = [
    {
      imgUrl: '/assets/images/carousel/pwa-notion.png',
      link: 'https://humdrum-puppet-86a.notion.site/1ab22817262580d9971cc464dc8e2c57?pvs=4',
    },
    {
      imgUrl: '/assets/images/carousel/google-form.png',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSeEi5wC3K1e-ekgudEu75OFmQEgXk474WenokYGEbJzyan3IA/viewform?usp=dialog',
    },
  ];

  const handleOpenBottomSheet = (item: Item) => {
    setSelectedItem(item);
    setIsBottomSheetOpen(true);
  };

  return (
    <MobileLayout>
      <MainHeader />
      <div className="mt-10 flex flex-col gap-[50px] px-4 pt-4">
        <Carousel images={images} />

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="text-heading-4_M font-semibold">복지 물품 목록</div>
            <div className="flex w-2/5 items-center rounded-xl bg-[#e8e9ec] px-3 py-2">
              <input
                type="text"
                className="w-full bg-transparent text-caption-1_midi outline-none"
                placeholder="물품 검색"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <IconSearch />
            </div>
          </div>
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
