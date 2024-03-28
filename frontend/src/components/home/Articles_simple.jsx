import axios from "axios";
import { useEffect, useState } from "react";

import "./css/Articles.scss";

import Article_simple from "./Article_simple";
import { LIST } from "../../assets/data";

// * PC 게시글
const PcArticles = () => {
  const [articles, setArticles] = useState([]);

  // * 추천 게시글 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:3005/api/blog/recommended")
      .then((res) => {
        console.log(res.data);
        setArticles(res.data);
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
    <ul className="articles">
      <div className="articles__title-box">
        <div>
          <h3>이런 사진을 찾고 있나요?</h3>
        </div>
      </div>

      <PcArticles />
    </ul>
  );
};

export default Articles;
