// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './css/Carousel.scss';

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const Carousel = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Navigation, Pagination]}
      className='mySwiper'
    >
      <SwiperSlide>
        <img src='https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170918113938998192.png?w=720' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170918258485705627.png?w=720' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170918261601518163.png?w=720' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170951968214434675.png?w=720' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170918236551977507.png?w=720' />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
