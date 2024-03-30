import { Link } from 'react-router-dom'

import { CiHeart } from 'react-icons/ci'

import classes from './css/RecommendHousePhotoArticleItem.module.css'

const RecommendHousePhotoArticleItem = ({ articles }) => {
    console.log(articles)

    return (
        <div className={classes.container}>
            {articles?.map((article) => (
                <li className={classes.li} key={article.blog_id}>
                    <Link to={`/post/${article.blog_id}`}>
                        <div className={classes.image}>
                            <img src={article.preview_img} alt="coverImage" />
                            <div>
                                <CiHeart size="36" color="#fff" />
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </div>
    )
}

export default RecommendHousePhotoArticleItem
