import { useState, useEffect } from 'react'
import axios from 'axios'

// API 호출을 담당할 커스텀 훅
export const useArticles = (keyword) => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        // 키워드가 없거나 섹션 키가 지정되지 않았으면 요청하지 않음
        if (!keyword) return

        const fetchArticles = async () => {
            try {
                const response = await axios.get(`http://localhost:3005/api/blog/search?keyword=${keyword}`)
                setArticles(response)
                console.log('Fetched articles: ', response)
            } catch (err) {
                console.error('Fetching articles failed: ', err)
            }
        }

        fetchArticles()
    }, [keyword])

    return articles
}
