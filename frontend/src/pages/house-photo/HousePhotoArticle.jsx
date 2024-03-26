import { Link } from "react-router-dom";

import "./css/HousePhotoArticle.scss";
// import { FcLikePlaceholder } from "react-icons/fc";
import { GrView } from "react-icons/gr";

import { AiOutlineHeart } from "react-icons/ai";

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
                <p className="description__introduction">{article.title}</p>
              </div>
            </section>
            <div className="card__image">
              <img src={article.preview_img} alt="" />
            </div>
            <div className="card__count">
              <span>
                <button>
                  <AiOutlineHeart size="24" />
                </button>
                <p>{article.like_count}</p>
              </span>

              <span>
                <button>
                  <GrView size="24" />
                </button>
                <p>{article.view_count}</p>
              </span>
            </div>

            {/* <p className="card__content"> {article}</p> */}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default HousePhotoArticle;
