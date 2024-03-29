import "./css/MainImage.scss";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { PcCarousel, MobileCarousel } from "./Carousel";

// * 대표 이미지
const MainImage = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/blog/main")
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="home">
      {/* //* 대표 이미지 */}
      <Link
        to={post ? `post/${post.blog_id}` : "post/1"}
        className="home__image-box"
      >
        <img
          src={
            post
              ? post.preview_img
              : "https://image.ohou.se/i/bucketplace-v2-development/uploads/projects/cover_images/170588586613109074.jpg?w=1700&h=1020&c=c"
          }
          alt="news-image"
        />

        <div className="main__image-description">
          <strong>
            {post ? post.title : "40된 구옥! 페인트칠만으로 환해졌죠?"}
          </strong>
          <div>
            <img
              src="https://images.unsplash.com/photo-1709833226150-8eaeb6f291d1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="profile-img"
            />
            <span>{post ? post.nickname : "오늘의집 에디터"}</span>
          </div>
        </div>
      </Link>

      {/* //* PC 캐러셀 */}
      <PcCarousel />

      {/* //* 모바일 캐러셀 */}
      <MobileCarousel />
    </main>
  );
};

export default MainImage;
