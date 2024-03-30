import { Link } from 'react-router-dom'

import { CiHeart } from 'react-icons/ci'

const RecommendHousePhotoArticleItem = ({ articles }) => {
    console.log(articles)

    return (
        <div className="photo__container">
            {articles?.map((article) => (
                <li className="article_photo" key={article.blog_id}>
                    <Link to={`/post/${article.blog_id}`}>
                        <div className="article__image-box">
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
