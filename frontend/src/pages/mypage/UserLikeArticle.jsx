import classes from './css/UserLikeArticle.module.css'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Link } from 'react-router-dom'

const UserLikeArticle = () => {
    const token = useSelector((state) => state.Auth.token)
    const [userLikeArticle, setUserLikeArticle] = useState('')

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:3005/api/users/likes',
            Authorization: `Bearer ${token}`,
            withCredentials: true,
        })
            .then((res) => {
                console.log(res)
                setUserLikeArticle(res.data)
            })
            .catch((err) => console.log(err))
    }, [token])

    return (
        <section className={classes.section}>
            <article className={classes.title}>
                <strong>좋아요</strong>
                <span>{userLikeArticle.length}</span>
            </article>

            <ul className={classes['like-articles']}>
                {userLikeArticle.length > 0 &&
                    userLikeArticle.map((article) => {
                        console.log(article)
                        return (
                            <li key={article.Blog.blog_id} className={classes['like-article']}>
                                <article className={classes['like-article__card']}>
                                    <a href={`/post/${article.Blog.blog_id}`}>
                                        <img src={article.Blog.preview_img} alt="Article Image" />
                                    </a>
                                    {article.Blog.blog_type_code === 0 && (
                                        <Link className={classes.category} to="/housewarming_party">
                                            집들이
                                        </Link>
                                    )}
                                    {article.Blog.blog_type_code === 1 && (
                                        <Link className={classes.category} to="/know_how">
                                            노하우
                                        </Link>
                                    )}
                                    {article.Blog.blog_type_code === 2 && (
                                        <Link className={classes.category} to="/house_photo">
                                            사진
                                        </Link>
                                    )}
                                </article>
                            </li>
                        )
                    })}
            </ul>
        </section>
    )
}

export default UserLikeArticle
