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
              src='https://product.cdn.cevaws.com/var/storage/images/_aliases/reference/media/feliway-2017/images/kor-kr/1_gnetb-7sfmbx49emluey4a/6341829-1-kor-KR/1_gNETb-7SfMBX49EMLUeY4A.jpg'
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
    </header>
  );
};

export default Header;
