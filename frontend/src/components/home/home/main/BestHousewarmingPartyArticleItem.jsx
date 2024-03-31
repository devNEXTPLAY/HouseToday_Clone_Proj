import { CiHeart } from 'react-icons/ci'

import { Link } from 'react-router-dom'

import classes from './css/BestHousewarmingPartyArticleItem.module.css'

const BestHousewarmingPartyArticleItem = ({ articles }) => {
    return (
        <>
            {articles.map((article) => (
                <li className={classes.article} key={article.blog_id}>
                    <Link to={`/post/${article.blog_id}`}>
                        <div className={classes.image}>
                            <img src={article.preview_img} alt={article.title} />
                            <div className={classes.like}>
                                <CiHeart size="36" color="#fff" />
                            </div>
                        </div>

                        <div className={classes.information}>
                            <h3>{article.title}</h3>
                        </div>
                    </Link>
                </li>
            ))}
        </>
    )
}

export default BestHousewarmingPartyArticleItem
