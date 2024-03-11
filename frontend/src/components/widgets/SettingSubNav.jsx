import './css/SettingSubNav.scss';

import { Link } from 'react-router-dom';

// * 설정 서브 네비게이션
// * props select: 사용자가 선택한 화면 강조
// * 예) select='profile' 서브 네비게이션에서 "프로필" 강조
export const SettingSubNav = ({ select }) => {
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
