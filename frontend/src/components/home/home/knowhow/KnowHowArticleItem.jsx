import { Link } from 'react-router-dom'

import classes from './css/KnowHowArticleItem.module.css'
import { CiHeart } from 'react-icons/ci'

const KnowHowArticleItem = ({ article }) => {
    return (
        <Link to={`/post/${article.blog_id}`}>
            <li className={classes.li}>
                <div className={classes.image}>
                    <img className={classes.img} src={article.preview_img} alt="coverImage" />

                    <button className={classes.button}>
                        <CiHeart size="36" />
                    </button>
                </div>

                <div className={classes.information}>
                    <div className={classes.title}>
                        <p>{article.title}</p>
                        <p className={classes.nickname}>{article.nickname}</p>
                    </div>

                    <div className={classes.count}>
                        <span>조회수 {article.view_count}</span>
                        <span>좋아요 {article.like_count}</span>
                    </div>
                </div>
            </li>
        </Link>
    )
}

export default KnowHowArticleItem
