import MainImage from "../components/home/MainImage";
import Articles_simple from "../components/home/Articles_simple";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions";

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    console.log("token=", token);

    if (token) {
      dispatch(userLogin(token));
    }
  }, [location.search]);

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
