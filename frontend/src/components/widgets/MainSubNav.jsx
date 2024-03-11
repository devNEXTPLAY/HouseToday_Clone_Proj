import './css/MainSubNav.scss';

import { Link } from 'react-router-dom';

const MainSubNav = ({ select }) => {
  return (
    <nav className='main-nav'>
      <div className='nav__container'>
        <div>
          <Link to='/' className={select === 'home' && 'select'}>
            프로필
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
