import './css/Header.scss';

import { Link } from 'react-router-dom';
import { TextLogo } from '../../assets/TextLogo';
import Input from '../ui/Input';
import Button from '../ui/Button';

const Header = () => {
  return (
    <header className='header'>
      <Link to='/'>
        <TextLogo />
      </Link>

      <section>
        <nav>
          <Link to='/comunity'>커뮤니티</Link>
          <Link to='https://sports.news.naver.com/index'>스포츠 뉴스</Link>
        </nav>

        <Input placeholder='게시물 검색' />
        <img
          src='https://plus.unsplash.com/premium_photo-1686074443397-ff6e4825581b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D'
          alt='profile-image'
        />
        <Button>글쓰기</Button>
      </section>
    </header>
  );
};

export default Header;
