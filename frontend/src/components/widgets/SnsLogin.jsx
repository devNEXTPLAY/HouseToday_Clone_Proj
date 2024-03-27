import "./css/SnsLogin.scss";
import { Link } from "react-router-dom";

// * SVG 아이콘 참조
import { Facebook } from "../../assets/Facebook.jsx";
import { Kakao } from "../../assets/Kakao.jsx";
import { Naver } from "../../assets/Naver.jsx";

// * SNS 로그인
//* props text: text 로고 상단에 표시할 텍스트
const SnsLogin = ({ text, children }) => {
  const handleKakao = () => {
    window.location.href = "http://localhost:3005/api/users/kakao";
  };

  return (
    <section className="login-box">
      <strong>{text}</strong>

      <nav>
        <Link>
          <Facebook />
        </Link>
        <a onClick={handleKakao}>
          <Kakao />
        </a>
        <Link>
          <Naver />
        </Link>
      </nav>

      {children}

      <div className="form__border-bottom"></div>
    </section>
  );
};

export default SnsLogin;
