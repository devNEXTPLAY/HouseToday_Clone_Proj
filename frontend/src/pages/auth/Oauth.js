import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";

const Oauth = () => {
  const navigate = useNavigate();
  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:5173/oauth";
  const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
  const code = new URL(window.location.href).searchParams.get("code");

  const getToken = async () => {
    //쿼리 문자열은 URL에서 ? 뒤에 붙는 값을 의미하며 그 쿼리 문자열을 전달하기 위하여 qs를 썼습니다.
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET,
      // 이것들은 kakao 측에서 정해준 형식이므로 key값은 꼭 똑같이 써야합니다!
    });

    try {
      const res = await axios
        .post("https://kauth.kakao.com/oauth/token", payload)
        .then((res) => {
          console.log("토큰", res);
          const { access_token } = res.data;
          axios
            .post(
              `https://kapi.kakao.com/v2/user/me`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              }
            )
            .then((res) => {
              console.log("2", res);
              const nickname = res.data.kakao_account.profile.nickname;
              console.log("nickname", nickname);
            });
        });

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return null;
};
export default Oauth;
