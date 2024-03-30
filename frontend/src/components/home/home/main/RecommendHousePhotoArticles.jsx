import axios from 'axios'
import { useState, useEffect } from 'react'

import RecommendHousePhotoArticleItem from './RecommendHousePhotoArticleItem'

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
        <ul className="articles">
            <div className="articles__title-box">
                <div>
                    <h3>이런 사진을 찾고 있나요?</h3>
                    <p>좋아하실 만한 인테리어 콘텐츠를 추천해드려요</p>
                </div>
            </div>

            <RecommendHousePhotoArticleItem articles={articles} />
        </ul>
    )
}

export default RecommendHousePhotoArticles
