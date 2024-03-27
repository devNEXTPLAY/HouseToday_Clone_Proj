import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./css/UserArticles.scss";

const UserArticles = () => {
  const [articlesImg, setArticlesImg] = useState([]);
  const [blogId, setBlogId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/users/blogs", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        const previewImgs = res.data.map((item) => item.preview_img);
        setArticlesImg(previewImgs);
        const blogIds = res.data.map((item) => item.blog_id);
        setBlogId(blogIds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {articlesImg.length === 0 ? (
        <section className="post-list">
          <div className="card__null">
            <div className="lilst__title-box">
              <strong>게시글</strong>
              <span>{articlesImg.length}</span>
            </div>
            <article></article>
          </div>
        </section>
      ) : (
        <section className="post-list">
          <div className="lilst__title-box">
            <strong>게시글</strong>
            <span>{articlesImg.length}</span>
          </div>
          <section className="user-articles">
            <div className="article-images">
              <div className="image">
                <a href={`/post/${blogId[0]}`}>
                  {articlesImg[0] && (
                    <img src={articlesImg[0]} alt="Article Image" />
                  )}
                </a>
              </div>
              <div className="image">
                <a href={`/post/${blogId[1]}`}>
                  {articlesImg[1] && (
                    <img src={articlesImg[1]} alt="Article Image" />
                  )}
                </a>
              </div>
              <div className="image">
                <a href={`/post/${blogId[2]}`}>
                  {articlesImg[2] && (
                    <img src={articlesImg[2]} alt="Article Image" />
                  )}
                </a>
              </div>
              <div className="image">
                <a href={`/post/${blogId[3]}`}>
                  {articlesImg[3] && (
                    <img src={articlesImg[3]} alt="Article Image" />
                  )}
                </a>
              </div>
            </div>
            <a className="text">
              <Link to="/write">+ 게시글 올리기</Link>
            </a>
          </section>
        </section>
      )}
    </>
  );
};

export default UserArticles;
