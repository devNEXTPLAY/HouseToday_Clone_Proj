import "./css/Footer.scss";

import { Link } from "react-router-dom";

import { MdOutlineArrowForwardIos } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="home__footer">
      <div className="footer__container">
        <section className="customer-service-center">
          <article>
            <Link to="/">
              고객센터 <MdOutlineArrowForwardIos />
            </Link>
          </article>

          <div className="center__contact">
            <p>
              <strong>1670-0876</strong> 09:00 ~ 18:00
            </p>
            <div>
              <li>평일: 전체 문의 상담</li>
              <li>
                토요일, 공휴일: 오늘의 집 직접배송, 이사/시공/제품설치 문의 상담
              </li>
              <li>일요일: 휴무</li>
            </div>
          </div>

          <nav className="center__contact-nav">
            <Link className="nav__link">카톡 상담(평일 09 - 18:00)</Link>
            <Link className="nav__link">이메일 문의</Link>
          </nav>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
