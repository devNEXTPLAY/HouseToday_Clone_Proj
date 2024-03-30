import { useSelector } from 'react-redux'
import { Link, useParams, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import './css/MyPageSideLayout.scss'
import { AiOutlineHeart } from 'react-icons/ai'

import classes from './css/MyPageSideLayout.module.css'

// * 사용자 프로필 설정
const MyPageSideLayout = () => {
    const { uid } = useParams()
    const [likes, setLikes] = useState(0)
    const [user, setUser] = useState({})

    const token = useSelector((state) => state.Auth.token)
    const profileImg = useSelector((state) => state.Auth.profile_img)

    useEffect(() => {
        if (token) {
            axios
                .get('http://localhost:3005/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                })
                .then((res) => {
                    console.log(res)
                    setUser(res.data)
                })
                .catch((err) => console.log(err))
        }
    }, [token])

    useEffect(() => {
        if (token) {
            axios
                .get('http://localhost:3005/api/users/likes', {
                    withCredentials: true,
                })
                .then((res) => {
                    console.log(res)
                    setLikes(res.data.length)
                })
                .catch((err) => console.log(err))
        }
    }, [token])

    return (
        <aside className={classes.aside}>
            {/* //* 사용자 프로필  */}
            <section className={classes.profile}>
                <div className={classes.card}>
                    <img src={profileImg} alt="프로필 사진" />
                    <h2>{user.nickname}</h2>
                    <div>
                        <span>팔로워 0</span>
                        <span>팔로잉 0</span>
                    </div>
                    <button>
                        <Link to={`/users/${uid}/edit`}>설정</Link>
                    </button>

                    <hr />

                    <div className={classes.card__like}>
                        <AiOutlineHeart size="24" />
                        <strong>좋아요</strong>
                        <p>{likes}</p>
                    </div>
                </div>
            </section>

            <div className={classes.card__null}></div>

            {/* //* 사용자 게시글  */}
            <Outlet />
        </aside>
    )
}

export default MyPageSideLayout
