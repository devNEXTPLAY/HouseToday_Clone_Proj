import { useMediaQuery } from "react-responsive";
import { CiBookmark } from "react-icons/ci";
import { Link } from "react-router-dom";

import "./css/Article_simple.scss";

// * 게시글 카드

// * props
// * title: 게시글 제목
// * content: 게시글 내용
// * author: 작성자
// * date: 작성일
// * viewcount: 조회수
// * coverImage: 게시글 대표 이미지

const Article = ({ title, coverImage, href }) => {
  return (
    <li className="article">
      <Link to={href}>
        <div className="article__image-box">
          <img src={coverImage} alt="coverImage" />
          <div>
            <CiBookmark size="36" color="#fff" />
          </div>
        </div>

        <div className="information__title">
          <h3>{title}</h3>
        </div>
      </Link>
    </li>
  );
};

export default Article;
