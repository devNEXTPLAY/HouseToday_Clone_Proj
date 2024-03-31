import axios from 'axios'
import { useState, useEffect } from 'react'

// * Swiper 라이브러리 참조 (캐러셀 라이브러리)
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules

import classes from './css/MobileRecommendHousePhotoArticleItem.module.css'

{
    /* //* PC 캐러셀 */
}
const MobileRecommendHousePhotoArticleItem = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3005/api/blog/recommended')
            .then((res) => {
                console.log(res.data)
                setArticles(res.data.photo_video)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <Swiper spaceBetween={10} centeredSlides={true} className={classes.carousel}>
            {articles?.map((article) => {
                return (
                    <SwiperSlide key={article.blog_id} className={classes['swiper-slide']}>
                        <img src={article.preview_img} alt="coverImage" />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}

export default MobileRecommendHousePhotoArticleItem
