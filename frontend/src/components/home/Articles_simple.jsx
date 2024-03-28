import axios from "axios";
import { useEffect, useState } from "react";

import "./css/Articles.scss";

import Article_simple from "./Article_simple";
import Photo_simple from "./Photo_simple";
import { LIST } from "../../assets/data";

const PhotoArticles = () => {
  const [articles, setArticles] = useState([]);

  // * 추천 게시글 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:3005/api/blog/recommended")
      .then((res) => {
        console.log(res.data);
        setArticles(res.data.photo_video);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="photo__container">
        {articles.map((article) => (
          <Photo_simple
            key={article.blog_id}
            coverImage={article.preview_img}
            href={`/post/${article.blog_id}`}
          />
        ))}
      </div>
    </>
  );
};

// * PC 집들이 게시글
const PcArticles = () => {
  const [articles, setArticles] = useState([]);

  // * 추천 게시글 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:3005/api/blog/recommended")
      .then((res) => {
        console.log(res.data);
        setArticles(res.data.housewarming);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="articles__container">
        {articles.map((article) => (
          <Article_simple
            key={article.blog_id}
            title={article.title}
            coverImage={article.preview_img}
            href={`/post/${article.blog_id}`}
          />
        ))}
      </div>
    </>
  );
};

// * 게시글
const Articles = () => {
  return (
    <>
      <ul className="articles">
        <div className="articles__title-box">
          <div>
            <h3>이런 사진을 찾고 있나요?</h3>
            <p>좋아하실 만한 인테리어 콘텐츠를 추천해드려요</p>
          </div>
        </div>

        <PhotoArticles />
      </ul>

      <ul className="articles">
        <div className="articles__title-box">
          <div>
            <h3>이번주 집들이 BEST 💖</h3>
          </div>
        </div>

        <PcArticles />
      </ul>
    </>
  );
};

export default Articles;
