import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { userLogin } from '../../../redux/actions'

import Button from '../../ui/Button'

import classes from './css/ProfileButton.module.css'

const ProfileButton = () => {
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
                    setUser(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [token])

    // * 사용자 프로필 드롭다운 메뉴 상태
    const [isSettings, setIsSettings] = useState(false)

    // * 사용자 프로필 드롭다운 메뉴 토글
    const handleShowNav = () => setIsSettings((prevState) => !prevState)

    // * 사용자 로그아웃 토큰 삭제
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(userLogin())
        localStorage.removeItem('token')
        axios({
            method: 'get',
            url: 'http://localhost:3005/api/users/logout',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        }).catch((err) => console.log(err))
    }

    return (
        <div className={classes.container}>
            <Button className={classes.profile} onClick={handleShowNav}>
                <img src={profileImg} alt="profile-image" />
            </Button>

            <nav className={isSettings ? classes.show : classes.hide}>
                <Link to="/users/1">마이 페이지</Link>
                <Link to="/login" onClick={handleLogout}>
                    로그아웃
                </Link>
            </nav>
        </div>
    )
}

export default ProfileButton
