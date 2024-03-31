import axios from 'axios'
import { useState, useEffect } from 'react'
import BestHousewarmingPartyArticleItem from './BestHousewarmingPartyArticleItem'

import classes from './css/BestHousewarmingPartyArticles.module.css'

const BestHousewarmingPartyArticles = () => {
    const [articles, setArticles] = useState([])

    // * 추천 게시글 가져오기
    useEffect(() => {
        axios
            .get('http://localhost:3005/api/blog/recommended')
            .then((res) => {
                console.log(res.data)
                setArticles(res.data.housewarming)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <ul className={classes.articles}>
            <div className={classes.title}>
                <h3>이번주 집들이 BEST 💖</h3>
            </div>

            {/* <PcArticles /> */}
            <div className={classes.container}>
                <BestHousewarmingPartyArticleItem articles={articles} />
            </div>
        </ul>
    )
}

export default BestHousewarmingPartyArticles
