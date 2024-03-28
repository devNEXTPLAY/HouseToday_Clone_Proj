import axios from "axios";
import { useEffect, useState } from "react";

import "./css/Articles.scss";

import Article_simple from "./Article_simple";
import { LIST } from "../../assets/data";

// * PC 게시글
const PcArticles = () => {
  useEffect(() => {
    axios
      .get("http://localhost:3005/api/blog/recommended")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="articles__container">
        {LIST.map((article) => (
          <Article_simple
            key={article.id}
            title={article.title}
            coverImage={article.coverImage}
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
