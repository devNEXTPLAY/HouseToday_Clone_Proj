import { CiBookmark } from "react-icons/ci";
import { Link } from "react-router-dom";

import "./css/Photo_simple.scss";

// * 게시글 카드

// * props
// * title: 게시글 제목
// * content: 게시글 내용
// * author: 작성자
// * date: 작성일
// * viewcount: 조회수
// * coverImage: 게시글 대표 이미지

const Photo_simple = ({ coverImage, href }) => {
  return (
    <li className="article_photo">
      <Link to={href}>
        <div className="article__image-box">
          <img src={coverImage} alt="coverImage" />
          <div>
            <CiBookmark size="36" color="#fff" />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Photo_simple;
