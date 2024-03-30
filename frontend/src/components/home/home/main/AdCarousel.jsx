// * Swiper 라이브러리 참조 (캐러셀 라이브러리)
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import classes from './css/AdCarousel.module.css'

{
    /* //* PC 캐러셀 */
}
const AdCarousel = () => {
    return (
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
            className={classes.carousel}
        >
            <SwiperSlide>
                <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170918113938998192.png?w=720" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170918258485705627.png?w=720" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170918261601518163.png?w=720" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170951968214434675.png?w=720" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/banners/home_banner/170918236551977507.png?w=720" />
            </SwiperSlide>
        </Swiper>
    )
}

export default AdCarousel
