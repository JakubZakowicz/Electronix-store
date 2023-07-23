import React, { CSSProperties, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.css';

import VR1 from '../../images/vr1.png';
import VR2 from '../../images/vr2.png';
import VR3 from '../../images/vr3.png';
import VR4 from '../../images/vr4.png';
import VR5 from '../../images/vr5.png';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { Box } from '@mui/material';

const SwiperGallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  return (
    <Box>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as CSSProperties}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <Image src={VR1} alt="VR" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={VR2} alt="VR" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={VR3} alt="VR" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={VR4} alt="VR" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={VR5} alt="VR" />
        </SwiperSlide>
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
         <SwiperSlide>
          <Image src={VR1} alt="VR" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={VR2} alt="VR" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={VR3} alt="VR" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={VR4} alt="VR" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={VR5} alt="VR" />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default SwiperGallery;
