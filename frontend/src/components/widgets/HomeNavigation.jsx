import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/actions";

import "./css/HomeNavigation.scss";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { TextLogo } from "../../assets/TextLogo";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiBellOn } from "react-icons/ci";

// * 헤더 네비게이션
const HomeNavigation = () => {
  const [user, setUser] = useState({});

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
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // * 사용자 프로필 드롭다운 메뉴 상태
  const [isSettings, setIsSettings] = useState(false);

  // * 사용자 프로필 드롭다운 메뉴 토글
  const handleShowNav = () => setIsSettings((prevState) => !prevState);

  // * 사용자 로그아웃 토큰 삭제
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogin());
    localStorage.removeItem("token");
    axios({
      method: "get",
      url: "http://localhost:3005/api/users/logout",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }).catch((err) => console.log(err));
  };

  return (
    <header className="main-header">
      <button className="hamburger">
        {/* //* 햄버거 아이콘 */}
        <RxHamburgerMenu />
      </button>

      <div className="header__container">
        <Link to="/">
          {/* //* 오늘의 집 로고 */}
          <TextLogo />
        </Link>

        <section className="container__section">
          <Input placeholder="게시물 검색" custom="search" />
          <Button className="section__push-alarm">
            {/* //* 검색 로고 */}
            <CiBellOn />
          </Button>

          {/* //* 사용자 프로필 */}
          <div className="header__profile-box">
            <Button className="header__profile" onClick={handleShowNav}>
              <img src={user.profile_img} alt="profile-image" />
            </Button>

            {/* //* 사용자 프로필 드롭다운 메뉴 */}
            <nav className={isSettings ? "header__profile-dropdown" : "isDisplay"}>
              <Link to="/users/1">마이 페이지</Link>
              <Link to="/login" onClick={handleLogout}>
                로그아웃
              </Link>
            </nav>
          </div>

          {/* //* 글쓰기 이동 링크 */}
          <Link to="/write">
            <Button>글쓰기</Button>
          </Link>
        </section>
      </div>
    </header>
  );
};

export default HomeNavigation;
