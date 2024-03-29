import { Link } from 'react-router-dom'
import parse from 'html-react-parser'

import './css/HousePhotoArticle.scss'
// import { FcLikePlaceholder } from "react-icons/fc";
import { GrView } from 'react-icons/gr'
import { IoChatbubbleOutline } from 'react-icons/io5'

import { AiOutlineHeart } from 'react-icons/ai'

const HousePhotoArticle = ({ data }) => {
    return (
        <ul className="card-list">
            {data?.map((article) => (
                <Link key={article.blog_id} to={`/post/${article.blog_id}`}>
                    <li className="house-photo-card">
                        <section className="profile">
                            <img src={article.profile_img} alt="프로필 사진" />
                            <div className="profile__description">
                                <div className="description__nickname">
                                    <strong>{article.nickname}</strong>
                                    <span></span>
                                    <button>팔로우</button>
                                </div>
                                {/* 소개 */}
                                <p className="description__introduction">{article.intro_msg}</p>
                            </div>
                        </section>
                        <div className="card__image-container">
                            <img src={article.preview_img} alt="" className="card__image" />
                            <div className="image__view-count">조회수 {article.view_count}</div>
                        </div>
                        <div className="card__count">
                            <span>
                                <button>
                                    <AiOutlineHeart size="24" />
                                </button>
                                <p>{article.like_count}</p>
                            </span>

                            {/* 댓글수 */}
                            <span>
                                <button>
                                    <IoChatbubbleOutline size="24" />
                                </button>
                                <p>{article.comment_count}</p>
                            </span>
                        </div>

                        {/* 게시글 내용 */}
                        <p className="card__content"> {parse(article.contents)}</p>

                        {/* 댓글이 있을 때만 보이도록 */}
                        {article.best_comment.content && (
                            <div className="card__comment-container">
                                <img src={article.best_comment.profile_img} alt="댓글 작성자 프로필 사진" />
                                <div className="card__comment">
                                    <p className="card__comment-nickname">{article.best_comment.nickname}</p>
                                    <p>{article.best_comment.content}</p>
                                </div>
                            </div>
                        )}
                    </li>
                </Link>
            ))}
        </ul>
    )
}

export default HousePhotoArticle
