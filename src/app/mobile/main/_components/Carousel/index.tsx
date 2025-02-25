'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselProps {
  images: string[]; // 이미지 URL 배열
  onClick?: () => void;
}

export default function Carousel({ images, onClick }: CarouselProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div onClick={onClick} className="w-full rounded-[20px]">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="rounded-lg shadow-lg"
      >
        {images.map((src, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SwiperSlide key={index}>
            {/* 이미지의 크기가 맞지 않을 때 화면을 꽉채우게 할건지, 비율을 유지할 건지 정하기 */}
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="h-[168px] w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
