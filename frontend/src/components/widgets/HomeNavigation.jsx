import SearchInput from '../home/navigation/SearchInput'
import NotificationButton from '../home/navigation/NotificationButton'
import HomeLink from '../home/navigation/HomeLink'
import ProfileButton from '../home/navigation/ProfileButton'
import CreateButton from '../home/navigation/CreateButton'
import HamburgerButton from '../home/navigation/HamburgerButton'

import classes from './css/HomeNavigation.module.css'

// * 헤더 네비게이션
const HomeNavigation = () => {
    return (
        <header className={classes.header}>
            <HamburgerButton />

            <div className={classes.container}>
                <HomeLink />

                <section className={classes.section}>
                    <SearchInput />
                    <NotificationButton />

                    {/* //* 사용자 프로필 */}
                    <ProfileButton />

                    {/* //* 글쓰기 이동 링크 */}
                    <CreateButton />
                </section>
            </div>
        </header>
    )
}

export default HomeNavigation
