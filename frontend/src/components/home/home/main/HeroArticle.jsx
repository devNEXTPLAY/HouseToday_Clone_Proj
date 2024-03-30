import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import classes from './css/HeroArticle.module.css'

const HeroArticle = () => {
    const [post, setPost] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3005/api/blog/main')
            .then((res) => {
                console.log(res.data)
                setPost(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <Link to={`post/${post.blog_id}`} className={classes.link}>
            <img src={post.preview_img} alt="news-image" />

            <div className={classes.information}>
                <strong>{post.title}</strong>
                <div>
                    <img src={post.profile_img} alt="profile-img" />
                    <span>{post.nickname}</span>
                </div>
            </div>
        </Link>
    )
}

export default HeroArticle
