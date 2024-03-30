import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

import HomeLink from './HomeLink'
import ProfileButton from './ProfileButton'

import classes from './css/HamburgerNav.module.css'
import { useSelector } from 'react-redux'

const HamburgerNav = ({ onOff }) => {
    const [user, setUser] = useState({})
    const userId = useSelector((state) => state.Auth.userId)

    console.log(user)

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
                    setUser(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [token])

    return (
        <aside className={classes.aside}>
            <div className={classes.overlay} onClick={onOff} />

            <nav className={classes.nav}>
                <HomeLink />
                {token && (
                    <section className={classes.profile}>
                        <img src={profileImg} alt={user.nickname} />
                        <span>{user.nickname}</span>
                    </section>
                )}

                {!token && (
                    <nav className={classes.nav__auth}>
                        <Link to="/login">로그인</Link>
                        <Link to="/signup">회원가입</Link>
                    </nav>
                )}

                <hr />

                <nav className={classes.nav__sub}>
                    <ProfileButton />

                    <NavLink to="/" className={({ isActive }) => (isActive ? 'select' : null)}>
                        홈
                    </NavLink>
                    <NavLink to="/housewarming_party" className={({ isActive }) => (isActive ? 'select' : null)}>
                        집들이
                    </NavLink>
                    <NavLink to="/know_how" className={({ isActive }) => (isActive ? 'select' : null)}>
                        노하우
                    </NavLink>
                    <NavLink to="/house_photo" className={({ isActive }) => (isActive ? 'select' : null)}>
                        사진
                    </NavLink>
                </nav>

                <hr />
                <nav className={classes.mypage}>
                    <Link to={`/users/${userId}`}>마이페이지</Link>
                    <Link to={`/users/${userId}/likes`}>좋아요</Link>
                </nav>
            </nav>
        </aside>
    )
}

export default HamburgerNav
