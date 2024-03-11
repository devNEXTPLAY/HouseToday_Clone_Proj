import { useState } from 'react';
import './css/Header.scss';

import { Link } from 'react-router-dom';
import { TextLogo } from '../../assets/TextLogo';
import Input from '../ui/Input';
import Button from '../ui/Button';

const Header = () => {
  const [isSettings, setIsSettings] = useState(false);

  const handleShowNav = () => setIsSettings(prevState => !prevState);

  return (
    <header className='header'>
      <div className='header__container'>
        <Link to='/'>
          <TextLogo />
        </Link>

        <section>
          <div className=''>
            <nav>
              <Link to='/comunity'>커뮤니티</Link>
              <Link to='https://sports.news.naver.com/index'>스포츠 뉴스</Link>
            </nav>
          </div>

          <Input placeholder='게시물 검색' />

          <div className='header__profile-box'>
            <Button className='header__profile' onClick={handleShowNav}>
              <img
                src='https://d12zq4w4guyljn.cloudfront.net/750_750_20220126102336280_photo_32b06416ea97.jpg'
                alt='profile-image'
              />
            </Button>
            <nav
              className={isSettings ? 'header__profile-dropdown' : 'isDisplay'}
            >
              <Link to='/users/1'>마이 페이지</Link>
            </nav>
          </div>

          <Link to='/write'>
            <Button>글쓰기</Button>
          </Link>
        </section>
      </div>
    </header>
  );
};

export default Header;
