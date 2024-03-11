import './css/MainSubNav.scss';

import { Link } from 'react-router-dom';

// * 메인 서브 네비게이션

// * props select: 사용자가 선택한 화면 강조
//* ex) select='home' 서브 네비게이션에서 "홈" 강조
const MainSubNav = ({ select }) => {
  return (
    <nav className='main-nav'>
      <div className='nav__container'>
        <div>
          <Link to='/' className={select === 'home' && 'select'}>
            홈
          </Link>
          <Link to='/community' className={select === 'community' && 'select'}>
            게시글
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MainSubNav;