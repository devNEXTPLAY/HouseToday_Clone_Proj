import { Link } from 'react-router-dom'

import { MdOutlineArrowForwardIos } from 'react-icons/md'

import classes from './css/Footer.module.css'

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <section className={classes.information}>
                    <article>
                        <Link to="/">
                            고객센터 <MdOutlineArrowForwardIos />
                        </Link>
                    </article>

                    <div className={classes.contact}>
                        <p>
                            <strong>1670-0876</strong> 09:00 ~ 18:00
                        </p>
                        <div>
                            <li>평일: 전체 문의 상담</li>
                            <li>토요일, 공휴일: 오늘의 집 직접배송, 이사/시공/제품설치 문의 상담</li>
                            <li>일요일: 휴무</li>
                        </div>
                    </div>

                    <nav className={classes.nav}>
                        <Link className="nav__link">카톡 상담(평일 09 - 18:00)</Link>
                        <Link className="nav__link">이메일 문의</Link>
                    </nav>
                </section>
            </div>
        </footer>
    )
}

export default Footer
