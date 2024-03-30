import axios from 'axios'
import { useEffect, useState } from 'react'

import './css/Search.scss'

import House from './House'
import Photo from './Photo'
import Knowhow from './Knowhow'

const PhotoArticles = () => {
    const [articles, setArticles] = useState([])

    // * 집사진 추천 게시글 가져오기
    useEffect(() => {
        axios
            .get('http://localhost:3005/api/blog/search?keyword=d')
            .then((res) => {
                console.log(res.data)
                setArticles(res.data.photo_video.slice(0, 8))
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <div className="photo__container">
                {articles.map((article) => (
                    <Photo key={article.blog_id} coverImage={article.preview_img} href={`/post/${article.blog_id}`} />
                ))}
            </div>
        </>
    )
}

const KnowHowArticles = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3005/api/blog/search?keyword=d')
            .then((res) => {
                console.log(res.data)
                setArticles(res.data.tip.slice(0, 4))
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <div className="articles__container">
                {articles.map((data) => (
                    <Knowhow
                        key={data.id}
                        link={data.id}
                        title={data.title}
                        previewImage={data.coverImage}
                        nickname={data.author}
                        viewCount={data.viewcount}
                        likeCount={data.recommend}
                    />
                ))}
            </div>
        </>
    )
}

const PcArticles = () => {
    const [articles, setArticles] = useState([])

    // * 추천 게시글 가져오기
    useEffect(() => {
        axios
            .get('http://localhost:3005/api/blog/search?keyword=ㅇ')
            .then((res) => {
                console.log(res.data)
                setArticles(res.data.housewarming.slice(0, 3))
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <div className="articles__container">
                {articles.map((article) => (
                    <House
                        key={article.blog_id}
                        title={article.title}
                        coverImage={article.preview_img}
                        href={`/post/${article.blog_id}`}
                    />
                ))}
            </div>
        </>
    )
}

const Search = () => {
    return (
        <>
            <ul className="photo__articles">
                <div className="articles__title-box">
                    <div>
                        <p>사진</p>
                    </div>
                </div>

                <PhotoArticles />
            </ul>

            <ul className="tip__articles">
                <div className="articles__title-box">
                    <div>
                        <p>노하우 콘텐츠</p>
                    </div>
                </div>

                <KnowHowArticles />
            </ul>

            <ul className="house__articles">
                <div className="articles__title-box">
                    <div>
                        <p>집들이 콘텐츠</p>
                    </div>
                </div>

                <PcArticles />
            </ul>
        </>
    )
}

export default Search
