import "./css/Signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import SnsLogin from "../../components/widgets/SnsLogin";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Agree from "./Agree";

// 동의 항목 리스트

// * 회원가입
const Signup = () => {
  const navigate = useNavigate();

  const [emailLocal, setEmailLocal] = useState("");
  const [domain, setDomain] = useState("");

  const [isInvalid, setIsInvalid] = useState({
    nickname: false,
    passwordConfirm: false,
  });

  const [user, setUser] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });

  useEffect(() => {}, [user.password, user.passwordConfirm]);

  // 이메일 로컬 파트 변경 핸들러
  const onEmailLocalChange = (e) => {
    setEmailLocal(e.target.value);
  };

  // 도메인 변경 핸들러
  const onDomainChange = (e) => {
    setDomain(e.target.value);
  };

  // 기타 사용자 입력 처리
  const onRegistChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });

    // 비밀번호 일치 여부
    if (e.target.name === "passwordConfirm") {
      handleInvalidPasword(e);
    }

    // 닉네임 중복 검사
    if (e.target.name === "nickname") {
      handleDuplication(e);
    }
  };

  const onRegist = (e) => {
    const registData = {
      email: `${emailLocal}@${domain}`,
      password: user.password,
      nickname: user.nickname,
      agree_marketing: 1,
      agree_promotion: 1,
      is_email_verified: 1,
    };
    axios
      .post("http://localhost:3005/api/users/register", registData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };

  const handleInvalidPasword = (e) => {
    if (user.password === e.target.value) {
      setIsInvalid((prevInvalid) => {
        return { ...prevInvalid, passwordConfirm: false };
      });
    } else {
      setIsInvalid((prevInvalid) => {
        return { ...prevInvalid, passwordConfirm: true };
      });
    }
  };

  const handleDuplication = async (e) => {
    if (e.target.name === "nickname") {
      try {
        await axios.post("http://localhost:3005/api/users/nickname", {
          [e.target.name]: e.target.value,
        });
        setIsInvalid((prevInvalid) => {
          return { ...prevInvalid, nickname: false };
        });
      } catch (error) {
        if (error.response.status === 409) {
          setIsInvalid((prevInvalid) => {
            return { ...prevInvalid, nickname: true };
          });
        }
      }
    }
  };

  return (
    <main className="signup">
      <header>
        <h1>회원가입</h1>
      </header>
      <SnsLogin text="SNS 계정으로 간편하게 회원 가입" />

      {/* //* 회원 가입 입력 폼 */}
      <form onSubmit={onRegist}>
        <Input
          label="이메일"
          id="email"
          value={emailLocal}
          placeholder="이메일"
          onChange={onEmailLocalChange}
        >
          <span>@</span>
          <select name="domain" onChange={onDomainChange}>
            <option value="">직접 입력</option>
            <option value="naver.com">naver.com</option>
            <option value="kakao.com">kakao.com</option>
          </select>
          <Button>이메일 인증하기</Button>
        </Input>

        <Input
          type="password"
          label="비밀번호"
          placeholder="비밀번호"
          description="영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요."
          name="password"
          value={user.password}
          onChange={onRegistChange}
        />
        <div className="warning-box">
          <Input
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호 확인"
            name="passwordConfirm"
            value={user.passwordConfirm}
            onChange={onRegistChange}
          />
          {user.passwordConfirm !== "" && (
            <p
              className={
                !isInvalid.passwordConfirm
                  ? "success success-password"
                  : "error error-password"
              }
            ></p>
          )}
        </div>

        <div className="warning-box">
          <Input
            label="닉네임"
            placeholder="별명 (2~20자)"
            description="다른 유저와 겹치지 않도록 입력해주세요.(2~20자)"
            name="nickname"
            value={user.nickname}
            onChange={onRegistChange}
          />
          {user.nickname !== "" && (
            <p
              className={
                !isInvalid.nickname
                  ? `success success-nickname`
                  : `error error-nickname`
              }
            ></p>
          )}
        </div>

        {/* //* 약관 동의 */}
        <Agree />

        <Button type="submit">회원가입하기</Button>
      </form>
      <p>
        이미 아이디가 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </main>
  );
};

export default Signup;
