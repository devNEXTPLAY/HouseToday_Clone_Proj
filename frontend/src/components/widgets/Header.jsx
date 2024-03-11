import { useState } from 'react';
import './css/Header.scss';

import { Link } from 'react-router-dom';
import { TextLogo } from '../../assets/TextLogo';
import { RxHamburgerMenu } from 'react-icons/rx';
import { CiBellOn } from 'react-icons/ci';

import Input from '../ui/Input';
import Button from '../ui/Button';

const Header = () => {
  const [isSettings, setIsSettings] = useState(false);

  const handleShowNav = () => setIsSettings(prevState => !prevState);

  return (
    <header className='header'>
      <button className='hamburger'>
        <RxHamburgerMenu />
      </button>

      <div className='header__container'>
        <Link to='/'>
          <TextLogo />
        </Link>

        <section className='container__section'>
          <Input placeholder='게시물 검색' custom='search' />
          <Button className='section__push-alarm'>
            <CiBellOn />
          </Button>

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
