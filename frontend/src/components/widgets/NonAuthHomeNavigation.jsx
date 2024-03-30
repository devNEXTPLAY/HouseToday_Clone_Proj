import { Link } from 'react-router-dom'

// import { TextLogo } from "../../assets/TextLogo";
import HomeLink from '../home/navigation/HomeLink'
import SearchInput from '../home/navigation/SearchInput'
import CreateButton from '../home/navigation/CreateButton'

import classes from './css/HomeNavigation.module.css'

// * 헤더 네비게이션
const NonAuthHomeNavigation = () => {
    return (
        <header className={classes.haeder}>
            <div className={classes.container}>
                <HomeLink />

                <section className={classes.section}>
                    <SearchInput />

                    <nav className={classes.nav}>
                        <Link to="/login">로그인</Link>
                        <Link to="/signup">회원가입</Link>
                    </nav>

                    {/* //* 글쓰기 이동 링크 */}
                    <CreateButton />
                </section>
            </div>
        </header>
    )
}

export default NonAuthHomeNavigation
