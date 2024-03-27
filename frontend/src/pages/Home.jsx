import MainImage from "../components/home/MainImage";
import Articles_simple from "../components/home/Articles_simple";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, updateProfileImg } from "../redux/actions";

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Auth.token);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    console.log("token=", token);

    if (token) {
      dispatch(userLogin(token));
    }
  }, [location.search]);

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const profileImg = res.data.profile_img;
        if (profileImg) {
          dispatch(updateProfileImg(profileImg));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      {/* //* 대표 이미지 및 캐러셀 */}
      <MainImage />

      {/* //* 게시글들 */}
      <Articles_simple />
    </>
  );
};

export default Home;
