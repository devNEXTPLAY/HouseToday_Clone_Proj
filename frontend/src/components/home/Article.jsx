import { useMediaQuery } from "react-responsive";
import { CiBookmark } from "react-icons/ci";

import "./css/Article.scss";

// * 게시글 카드

// * props
// * title: 게시글 제목
// * content: 게시글 내용
// * author: 작성자
// * date: 작성일
// * viewcount: 조회수
// * coverImage: 게시글 대표 이미지

const Article = ({ title, content, author, date, viewcount, coverImage }) => {
  const isPc = useMediaQuery({
    query: "(min-width:769px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:768px)",
  });

  return (
    <li className="article">
      <div className="article__image-box">
        <img src={coverImage} alt="coverImage" />
        <div>
          {isMobile && (
            <div className="article__profile">
              <h3>작성자</h3>
            </div>
          )}
          <CiBookmark size="36" color="#fff" />
        </div>
      </div>

      {isPc && (
        <div className="information__title">
          <h3>{title}</h3>
          <p className="content">{content}</p>
        </div>
      )}

      {isPc && (
        <div className="information">
          <strong>{author}</strong>
          <span>{date}</span>
          <span>{viewcount}</span>
        </div>
      )}
    </li>
  );
};

export default Article;
