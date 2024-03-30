// * Swiper 라이브러리 참조 (캐러셀 라이브러리)
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import classes from './css/MobileAdCarousel.module.css'

/* //* 모바일 캐러셀 */
export const MobileAdCarousel = () => {
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
            className={classes.mobile}
        >
            <SwiperSlide>
                <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170918102832075892.png?w=720" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170987594627091489.png?w=720" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170951698567935812.png?w=720" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170738183287379866.png?w=720" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/169638587159596785.png?w=720" />
            </SwiperSlide>
        </Swiper>
    )
}
