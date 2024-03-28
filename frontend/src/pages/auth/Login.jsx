import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { userLogin, userOriginalId } from "../../redux/actions";

// * 폼 유효성 검사
import { useFormik } from "formik";
import * as Yup from "yup";

// SVG 아이콘 참조
import { MainLogo } from "../../assets/MainLogo";

import "./css/Login.scss";

// widgets 컴포넌트 참조

import SnsLogin from "../../components/widgets/SnsLogin";

// * UI 컴포넌트 참조
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

// * 로그인
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({ email: "", password: "" });

  const onLoginChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onLogin = (e) => {
    axios
      .post("http://localhost:3005/api/users/login", user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.status);
        if (res.status === 200) {
          // 전역데이터에 토큰/로그인 정보 저장
          dispatch(userLogin(res.data.token));
          dispatch(userOriginalId(res.data.userId));
        }
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          alert("존재하지 않는 사용자입니다.");
        } else if (err.response.status === 400) {
          alert("비밀번호가 일치하지 않습니다.");
        }
      });
    e.preventDefault();
  };

  return (
    <main className="login">
      <header>
        <MainLogo />
      </header>

      {/* //* 로그인 입력 폼 */}
      <form onSubmit={onLogin}>
        <div className="form__input-box">
          <input className="input__email" placeholder="이메일" type="email" name="email" value={user.email} onChange={onLoginChange} />
          <input className="input__password" placeholder="비밀번호" type="password" name="password" value={user.password} onChange={onLoginChange} />
        </div>

        <Button type="submit">로그인</Button>
      </form>

      <nav className="form__link-box">
        <Link to="/password">비밀번호 재설정</Link>
        <Link to="/signup">회원가입</Link>
      </nav>

      {/* //* SNS 로그인 */}
      <SnsLogin text="SNS 계정으로 간편 로그인/회원가입">
        <Link>로그인에 문제가 있으신가요?</Link>
      </SnsLogin>
    </main>
  );
};

document.title = "로그인 | 라이프스타일 슈퍼앱, 오늘의 집";

export default Login;
