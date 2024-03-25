import "./css/SnsLogin.scss";

import { Link } from "react-router-dom";

// * SVG 아이콘 참조
import { Facebook } from "../../assets/Facebook.jsx";
import { Kakao } from "../../assets/Kakao.jsx";
import { Naver } from "../../assets/Naver.jsx";

// * SNS 로그인
//* props text: text 로고 상단에 표시할 텍스트
const SnsLogin = ({ text, children }) => {
  const Rest_api_key = import.meta.env.VITE_REST_API_KEY;
  const redirect_uri = "http://localhost:5173/oauth";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleKakao = () => {
    window.location.href = kakaoURL;
  };
  // 인가코드 추출
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

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
