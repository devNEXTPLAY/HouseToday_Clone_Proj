import { Link } from 'react-router-dom'

import classes from './css/HouseWarmingPartyArticleItem.module.css'

const HouseWarmingPartyArticleItem = ({ article }) => {
    return (
        <Link to={`/post/${article.blog_id}`} key={article.blog_id}>
            <li className={classes.li}>
                <div className={classes.image}>
                    <img src={article.preview_img} alt="집들이 대표 이미지" />
                </div>

                <div className={classes.information}>
                    <h3>{article.title}</h3>

                    <div className={classes.profile}>
                        <img src={article.profile_img} alt="프로필 이미지" />
                        <strong>{article.nickname}</strong>
                    </div>

                    <div className={classes.count}>
                        <span>좋아요 {article.like_count}</span>
                        <div className={classes.circle}></div>
                        <span>조회 {article.view_count}</span>
                    </div>
                </div>
            </li>
        </Link>
    )
}

export default HouseWarmingPartyArticleItem
