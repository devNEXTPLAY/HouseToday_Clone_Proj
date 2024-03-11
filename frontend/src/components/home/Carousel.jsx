// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './css/Carousel.scss';

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const PcCarousel = () => {
  const isPc = useMediaQuery({
    query: '(min-width:769px)',
  });

  return (
    <>
      {isPc && (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Navigation, Pagination]}
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
      )}
    </>
  );
};

const MobileCarousel = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:768px)',
  });

  return (
    <>
      {isMobile && (
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
            <img src='https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170918102832075892.png?w=720' />
          </SwiperSlide>
          <SwiperSlide>
            <img src='https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170987594627091489.png?w=720' />
          </SwiperSlide>
          <SwiperSlide>
            <img src='https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170951698567935812.png?w=720' />
          </SwiperSlide>
          <SwiperSlide>
            <img src='https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170738183287379866.png?w=720' />
          </SwiperSlide>
          <SwiperSlide>
            <img src='https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/169638587159596785.png?w=720' />
          </SwiperSlide>
        </Swiper>
      )}
    </>
  );
};

export { PcCarousel, MobileCarousel };
