import React, { CSSProperties, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Box } from '@mui/material';
import { Image as ImageType } from '@/src/utils/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.css';

interface SwiperGalleryProps {
  images?: ImageType[];
}

const SwiperGallery = ({ images }: SwiperGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  return (
    <Box>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images?.map(({ id, url }) => (
          <SwiperSlide key={id}>
            <Image src={url} width={730} height={730} alt="VR" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images?.map(({ id, url }) => (
          <SwiperSlide key={id}>
            <Image src={url} width={730} height={730} alt="VR" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SwiperGallery;
