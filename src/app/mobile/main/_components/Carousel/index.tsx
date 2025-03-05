'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselProps {
  images: Array<{ imgUrl: string; link: string }>; // 이미지 URL, link 배열
}

export default function Carousel({ images }: CarouselProps) {
  const handleClickCarousel = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="w-full rounded-[20px]">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="rounded-lg shadow-lg"
      >
        {images.map((item, index) => (
          <SwiperSlide key={item.imgUrl}>
            {/* 이미지의 크기가 맞지 않을 때 화면을 꽉채우게 할건지, 비율을 유지할 건지 정하기 */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <img
              src={item.imgUrl}
              alt={`Slide ${index + 1}`}
              onClick={() => handleClickCarousel(item.link)}
              className="h-[168px] w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
