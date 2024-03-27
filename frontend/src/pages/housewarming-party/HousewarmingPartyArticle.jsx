import "./css/HousewarmingPartyArticle.scss";
import { Link } from "react-router-dom";

const HousewarmingPartyArticle = ({ data }) => {

  return (
    <ul className="card-list">
      {data?.map((article) => (
        <Link to={`/post/${article.blog_id}`} key={article.blog_id}>
          <li className="housewarming-party-card">
            <div className="card__image">
              <img src={article.preview_img} alt="집들이 대표 이미지" />
            </div>

            <div className="card__description-box">
              <h3>{article.title}</h3>

              <Link className="card__profile">
                <img src={article.profile_img} alt="프로필 이미지" />
                <strong>{article.nickname}</strong>
              </Link>

              <div className="card__counter-container">
                <span>좋아요 {article.like_count}</span>
                <div className="circle"></div>
                <span>조회 {article.view_count}</span>
              </div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default HousewarmingPartyArticle;
