import { useState } from "react";
import { Link } from "react-router-dom";

import "./css/HomeNavigation.scss";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { TextLogo } from "../../assets/TextLogo";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiBellOn } from "react-icons/ci";

// * 헤더 네비게이션
const NonAuthHomeNavigation = () => {
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

          <div className="header__auth">
            <Link to="/login">로그인</Link>
            <Link to="/signup" className="link__margin">
              회원가입
            </Link>
          </div>

          {/* //* 글쓰기 이동 링크 */}
          <Link to="/login">
            <Button>글쓰기</Button>
          </Link>
        </section>
      </div>
    </header>
  );
};

export default NonAuthHomeNavigation;
