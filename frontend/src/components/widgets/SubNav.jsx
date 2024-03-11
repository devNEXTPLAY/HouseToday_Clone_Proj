import './css/SubNav.scss';

import { Link } from 'react-router-dom';

// Select
export const SubNav = ({ select }) => {
  return (
    <nav className='user-nav'>
      <Link to='/users/1' className={select === 'profile' && 'select'}>
        프로필
      </Link>
      <Link to='/users/1/edit' className={select === 'setting' && 'select'}>
        설정
      </Link>
    </nav>
  );
};
