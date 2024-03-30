import { NavLink } from 'react-router-dom'

import HomeLink from './HomeLink'
import ProfileButton from './ProfileButton'

import classes from './css/Aside.module.css'

const AsideNav = ({ onOff }) => {
    return (
        <aside className={classes.aside}>
            <div className={classes.overlay} onClick={onOff} />

            <nav>
                <HomeLink />

                <ProfileButton />

                <NavLink to="/" className={({ isActive }) => (isActive ? 'select' : null)}>
                    홈
                </NavLink>
                <NavLink to="/housewarming_party" className={({ isActive }) => (isActive ? 'select' : null)}>
                    집들이
                </NavLink>
                <NavLink to="/know_how" className={({ isActive }) => (isActive ? 'select' : null)}>
                    노하우
                </NavLink>
                <NavLink to="/house_photo" className={({ isActive }) => (isActive ? 'select' : null)}>
                    사진
                </NavLink>

                <hr />
            </nav>
        </aside>
    )
}

export default AsideNav
