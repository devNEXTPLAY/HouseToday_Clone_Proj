import { Link } from 'react-router-dom'

import parse from 'html-react-parser'

import { IoChatbubbleOutline } from 'react-icons/io5'
import { AiOutlineHeart } from 'react-icons/ai'

import classes from './css/MobileHousePhoto.module.css'

const MobileHousePhoto = ({ article }) => {
    return (
        <Link key={article.blog_id} to={`/post/${article.blog_id}`}>
            <li className={classes.li}>
                <section className={classes.profile}>
                    <img src={article.profile_img} alt="프로필 사진" />
                    <div className={classes.profile__information}>
                        <div className={classes.profile__nickname}>
                            <strong>{article.nickname}</strong>
                            <span></span>
                            <button>팔로우</button>
                        </div>
                        {/* 소개 */}
                        <p className={classes.profile__introduction}>{article.intro_msg}</p>
                    </div>
                </section>
                <p className={classes.contents}> {parse(article.contents)}</p>

                <div className={classes.thumbnail}>
                    <img src={article.preview_img} alt="" />
                    <div className={classes['thumbnail__view-count']}>조회수 {article.view_count}</div>
                </div>
                <div className={classes.count}>
                    <span>
                        <button className={classes.count__button}>
                            <AiOutlineHeart size="24" />
                        </button>
                        <p className={classes.count__text}>{article.like_count}</p>
                    </span>

                    {/* 댓글수 */}
                    <span>
                        <button className={classes.count__button}>
                            <IoChatbubbleOutline size="24" />
                        </button>
                        <p className={classes.count__text}>{article.comment_count}</p>
                    </span>
                </div>
            </li>
        </Link>
    )
}

export default MobileHousePhoto
