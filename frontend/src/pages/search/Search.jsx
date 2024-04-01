import './css/Search.scss'
import React, { useState, useEffect } from 'react'

import House from './House'
import Photo from './Photo'
import Knowhow from './Knowhow'
import { useArticles } from '../../components/hooks/useArticles'

const PhotoArticles = ({ articles }) => {
    const photos = articles?.photo_video?.slice(0, 8) || []

    return (
        <>
            <div className="photo__container">
                {photos.map((article) => (
                    <Photo key={article.blog_id} coverImage={article.preview_img} href={`/post/${article.blog_id}`} />
                ))}
            </div>
        </>
    )
}

const KnowHowArticles = ({ articles }) => {
    const tips = articles?.tip?.slice(0, 4) || []

    return (
        <>
            <div className="tip__container">
                {tips.map((data) => (
                    <Knowhow
                        key={data.blog_id}
                        link={data.blog_id}
                        title={data.title}
                        previewImage={data.preview_img}
                        nickname={data.user_nickname}
                        viewCount={data.view_count}
                        likeCount={data.like_count}
                    />
                ))}
            </div>
        </>
    )
}

const PcArticles = ({ articles }) => {
    const housewarmings = articles?.housewarming?.slice(0, 3) || []

    return (
        <>
            <div className="articles__container">
                {housewarmings.map((article) => (
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
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        const params = new URLSearchParams(window.location.search).get('keyword')
        setKeyword(params)
    }, [])

    const articles = useArticles(keyword)
    console.log(articles)

    return (
        <>
            <ul className="photo__articles">
                <div className="articles__title-box">
                    <div>
                        <p>사진</p>
                    </div>
                </div>

                <PhotoArticles articles={articles.data} />
            </ul>

            <hr />

            <ul className="tip__articles">
                <div className="articles__title-box">
                    <div>
                        <p>노하우 콘텐츠</p>
                    </div>
                </div>

                <KnowHowArticles articles={articles.data} />
            </ul>

            <hr />

            <ul className="house__articles">
                <div className="articles__title-box">
                    <div>
                        <p>집들이 콘텐츠</p>
                    </div>
                </div>

                <PcArticles articles={articles.data} />
            </ul>
        </>
    )
}

export default Search
