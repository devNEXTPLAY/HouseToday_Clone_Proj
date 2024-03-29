import classes from './css/UserLikeArticle.module.css'

import { useEffect, useState } from 'react'
import axios from 'axios'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const UserLikeArticle = ({ token }) => {
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
        <section>
            <article className={classes.title}>
                <strong>좋아요</strong>
                <span>{userLikeArticle.length}</span>
            </article>

            <article className={classes['like-articles']}></article>
        </section>
    )
}

export default UserLikeArticle
