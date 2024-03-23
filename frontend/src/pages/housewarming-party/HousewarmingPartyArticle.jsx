import "./css/HousewarmingPartyArticle.scss";
import { Link } from "react-router-dom";

const HousewarmingPartyArticle = ({
  title,
  author,
  likeCount,
  viewCount,
  coverImage,
  profileImage,
}) => {
  return (
    <li className="housewarming-party-card">
      <div className="card__image">
        <img src={coverImage} alt="집들이 대표 이미지" />
      </div>

      <div className="card__description-box">
        <h3>{title}</h3>

        <Link className="card__profile">
          <img src={profileImage} alt="프로필 이미지" />
          <strong>{author}</strong>
        </Link>

        <div className="card__counter-container">
          <span>좋아요 {likeCount}</span>
          <div className="circle"></div>
          <span>조회 {viewCount}</span>
        </div>
      </div>
    </li>
  );
};

export default HousewarmingPartyArticle;
