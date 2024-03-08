// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './css/Carousel.scss';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';

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
      modules={[Autoplay, Navigation]}
      className='mySwiper'
    >
      <SwiperSlide>
        <img src='https://img6.yna.co.kr/photo/yna/YH/2024/03/07/PYH2024030711930006300_P4.jpg' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='https://images.unsplash.com/photo-1529768167801-9173d94c2a42?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFzZWJhbGx8ZW58MHx8MHx8fDA%3D' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFzZWJhbGx8ZW58MHx8MHx8fDA%3D' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='https://images.unsplash.com/photo-1591444539769-2518e73d1090?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhc2ViYWxsfGVufDB8fDB8fHww' />
      </SwiperSlide>
      <SwiperSlide>
        <img src='https://images.unsplash.com/photo-1563299796-b729d0af54a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJhc2ViYWxsfGVufDB8fDB8fHww' />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
