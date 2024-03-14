import { useState } from 'react';
import { Link } from 'react-router-dom';

import './css/HomeNavigation.scss';

import Input from '../ui/Input';
import Button from '../ui/Button';

import { TextLogo } from '../../assets/TextLogo';
import { RxHamburgerMenu } from 'react-icons/rx';
import { CiBellOn } from 'react-icons/ci';

// * 헤더 네비게이션
const HomeNavigation = () => {
  // * 사용자 프로필 드롭다운 메뉴 상태
  const [isSettings, setIsSettings] = useState(false);

  // * 사용자 프로필 드롭다운 메뉴 토글
  const handleShowNav = () => setIsSettings(prevState => !prevState);

  return (
    <header className='main-header'>
      <button className='hamburger'>
        {/* //* 햄버거 아이콘 */}
        <RxHamburgerMenu />
      </button>

      <div className='header__container'>
        <Link to='/'>
          {/* //* 오늘의 집 로고 */}
          <TextLogo />
        </Link>

        <section className='container__section'>
          <Input placeholder='게시물 검색' custom='search' />
          <Button className='section__push-alarm'>
            {/* //* 검색 로고 */}
            <CiBellOn />
          </Button>

          {/* //* 사용자 프로필 */}
          <div className='header__profile-box'>
            <Button className='header__profile' onClick={handleShowNav}>
              <img
                src='https://d12zq4w4guyljn.cloudfront.net/750_750_20220126102336280_photo_32b06416ea97.jpg'
                alt='profile-image'
              />
            </Button>

            {/* //* 사용자 프로필 드롭다운 메뉴 */}
            <nav
              className={isSettings ? 'header__profile-dropdown' : 'isDisplay'}
            >
              <Link to='/users/1'>마이 페이지</Link>
            </nav>
          </div>

          {/* //* 글쓰기 이동 링크 */}
          <Link to='/write'>
            <Button>글쓰기</Button>
          </Link>
        </section>
      </div>
    </header>
  );
};

export default HomeNavigation;
