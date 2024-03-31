import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, updateProfileImg } from '../../redux/actions'

import classes from './css/Main.module.css'
import HeroArticle from '../../components/home/home/main/HeroArticle'
import AdCarousel from '../../components/home/home/main/AdCarousel'
import { MobileAdCarousel } from '../../components/home/home/main/MobileAdCarousel'
import RecommendHousePhotoArticles from '../../components/home/home/main/RecommendHousePhotoArticles'
import BestHousewarmingPartyArticles from '../../components/home/home/main/BestHousewarmingPartyArticles'

const Main = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const token = useSelector((state) => state.Auth.token)

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const token = searchParams.get('token')
        console.log('token=', token)

        if (token) {
            dispatch(userLogin(token))
        }
    }, [location.search])

    useEffect(() => {
        axios
            .get('http://localhost:3005/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            })
            .then((res) => {
                const profileImg = res.data.profile_img
                if (profileImg) {
                    dispatch(updateProfileImg(profileImg))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    })

    return (
        <main className={classes.main}>
            {/* //* 대표 이미지 및 캐러셀 */}
            <section className={classes.section}>
                <HeroArticle />

                <AdCarousel />
                {/* 모바일 캐러셀 */}
                <MobileAdCarousel />
            </section>

            {/* //* 게시글들 */}
            <RecommendHousePhotoArticles />
            <BestHousewarmingPartyArticles />
        </main>
    )
}

export default Main
