import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { IoIosArrowForward } from 'react-icons/io'

import RecommendHousePhotoArticleItem from './RecommendHousePhotoArticleItem'

import classes from './css/RecommendHousePhotoArticles.module.css'
import MobileRecommendHousePhotoArticleItem from './MobileRecommendHousePhotoArticleItem'

const RecommendHousePhotoArticles = () => {
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
        <ul className={classes.articles}>
            <div className={classes.container}>
                <div className={classes.text}>
                    <h3>이런 사진을 찾고 있나요?</h3>
                    <p>좋아하실 만한 인테리어 콘텐츠를 추천해드려요</p>
                </div>

                {/* 모바일 네비게이션 버튼 */}
                <Link className={classes.link} to="/house_photo">
                    <IoIosArrowForward />
                </Link>
            </div>

            <RecommendHousePhotoArticleItem articles={articles} />

            {/* 모바일 집 사진 캐러셀 */}
            <MobileRecommendHousePhotoArticleItem articles={articles} />
        </ul>
    )
}

export default RecommendHousePhotoArticles
