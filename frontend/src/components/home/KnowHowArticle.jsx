import { CiHeart } from 'react-icons/ci'

import './css/KnowHowArticle.scss'
import { Link } from 'react-router-dom'

// * 게시글 카드

// * props
// * title: 게시글 제목
// * content: 게시글 내용
// * author: 작성자
// * date: 작성일
// * viewcount: 조회수
// * coverImage: 게시글 대표 이미지

const KnowHowArticle = ({ title, link, nickname, viewCount, likeCount, previewImage }) => {
    return (
        <Link to={`/post/${link}`}>
            <li className="article">
                <div className="article__image-box">
                    <img src={previewImage} alt="coverImage" />
                    {/* <div className="image-box__like">
            <CiHeart />
          </div> */}
                </div>

                <div className="information__title">
                    <p>{title}</p>
                </div>

                <div className="information__author">
                    <p>{nickname}</p>
                </div>

                <div className="information">
                    <div>
                        <span>조회수 {viewCount}</span>
                        <span>좋아요 {likeCount}</span>
                    </div>
                </div>
            </li>
        </Link>
    )
}

export default KnowHowArticle
