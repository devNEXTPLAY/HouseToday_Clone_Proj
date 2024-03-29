import './css/SettingSubNav.scss'

import { NavLink } from 'react-router-dom'

// * 설정 서브 네비게이션
// * props select: 사용자가 선택한 화면 강조
// * 예) select='profile' 서브 네비게이션에서 "프로필" 강조
export const SettingSubNav = () => {
    return (
        <nav className="user-nav">
            <NavLink to="" className={({ isActive }) => (isActive ? 'select' : null)} end>
                프로필
            </NavLink>
            <NavLink to="likes" className={({ isActive }) => (isActive ? 'select' : null)} end>
                좋아요
            </NavLink>
            <NavLink to="edit" className={({ isActive }) => (isActive ? 'select' : null)} end>
                설정
            </NavLink>
        </nav>
    )
}
