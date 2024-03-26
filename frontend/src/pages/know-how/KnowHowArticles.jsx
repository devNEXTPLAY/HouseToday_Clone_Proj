import KnowHowArticle from "./KnowHowArticle";
import "./css/KnowHowArticles.scss";

// * 게시글
const KnowHowArticles = ({ data }) => {
  return (
    <ul className="articles">
      <span>전체 {data.length}</span>

      <li className="articles__container">
        {data?.map((article) => (
          <KnowHowArticle
            key={article.blog_id}
            link={article.blog_id}
            title={article.title}
            previewImage={article.preview_img}
            nickname={article.nickname}
            viewCount={article.view_count}
            likeCount={article.like_count}
          />
        ))}
      </li>
    </ul>
  );
};

export default KnowHowArticles;
