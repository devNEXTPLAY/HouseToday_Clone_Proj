import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./css/User.scss";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import UserArticles from "../../components/widgets/UserArticles";

// * 사용자 프로필 설정
const User = () => {
  const { uid } = useParams();

  const [user, setUser] = useState({});
  const [likes, setLikes] = useState(0);

  const token = useSelector((state) => state.Auth.token);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3005/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3005/api/users/likes", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setLikes(res.data.length);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      {/* //* 사용자 프로필  */}
      <main>
        <section className="uesr-profile">
          <div className="profile__card">
            <img src={user.profile_img} alt="프로필 사진" />
            <h2>{user.nickname}</h2>
            <div>
              <span>팔로워 0</span>
              <span>팔로잉 0</span>
            </div>
            <button>
              <Link to={`/users/${uid}/edit`}>설정</Link>
            </button>

            <hr />

            <div className="card__like">
              <AiOutlineHeart size="24" />
              <strong>좋아요</strong>
              <p>{likes}</p>
            </div>
          </div>
        </section>

        <div className="card__null"></div>

        {/* //* 사용자 게시글  */}
        <UserArticles />
      </main>
    </>
  );
};

export default User;
