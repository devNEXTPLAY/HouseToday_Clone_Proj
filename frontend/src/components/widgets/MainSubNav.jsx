import './css/MainSubNav.scss';

import { NavLink } from 'react-router-dom';

// * 메인 서브 네비게이션

// * props select: 사용자가 선택한 화면 강조
//* 예) select='home' 서브 네비게이션에서 "홈" 강조
const MainSubNav = () => {
  return (
    <nav className='main-nav'>
      <div className='nav__container'>
        <div>
          <NavLink
            to=''
            className={({ isActive }) => (isActive ? 'select' : null)}
          >
            홈
          </NavLink>
          <NavLink
            to='community'
            className={({ isActive }) => (isActive ? 'select' : null)}
          >
            게시글
          </NavLink>
          <NavLink
            to='housewarming_party'
            className={({ isActive }) => (isActive ? 'select' : null)}
          >
            집들이
          </NavLink>
          <NavLink
            to='house_photo'
            className={({ isActive }) => (isActive ? 'select' : null)}
          >
            집사진
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default MainSubNav;
