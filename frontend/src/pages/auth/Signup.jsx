import { v4 as uuidv4 } from "uuid";

import "./css/Signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import SnsLogin from "../../components/widgets/SnsLogin";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AgreeInput from "../../components/ui/AgreeInput";

// 동의 항목 리스트
const agreeList = [
  {
    state: "age",
    checked: false,
    title: "만 14세이상입니다",
    condition: "필수",
  },
  {
    state: "service",
    checked: false,
    title: "이용약관",
    condition: "필수",
  },
  {
    state: "privacy",
    checked: false,
    title: "개인정보 수집 및 이용동의",
    condition: "필수",
  },
  {
    state: "agree_promotion",
    checked: false,
    title: "개인정보 마케팅 활용 동의",
    condition: "선택",
  },
  {
    state: "agree_promotion",
    checked: false,
    title: "이벤트, 쿠폰, 특가, 알림 메일 및 SMS 수신",
    condition: "선택",
  },
];

// * 회원가입
const Signup = () => {
  const [isAgreeAll, setIsAgreeAll] = useState(false);
  const [isAgree, setIsAgree] = useState(agreeList);

  // * 전체 동의 핸들러
  const handleIsAgreeAll = () => {
    if (isAgreeAll === false) {
      setIsAgreeAll(true);
      setIsAgree((prevIsAgree) => {
        const updateIsAgree = prevIsAgree.map((agree) => {
          return { ...agree, checked: true };
        });

        return updateIsAgree;
      });
    } else {
      setIsAgreeAll(false);
      setIsAgree((prevIsAgree) => {
        const updateIsAgree = prevIsAgree.map((agree) => {
          return { ...agree, checked: false };
        });

        return updateIsAgree;
      });
    }
  };

  // * 개별 동의 핸들러
  const handleIsAgree = (agree) => {
    setIsAgree((prevIsAgree) => {
      const updateIsAgree = prevIsAgree.map((item) => {
        if (item.title === agree.title) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
      return updateIsAgree;
    });

    console.log(isAgree);
  };

  const navigate = useNavigate();

  const [emailLocal, setEmailLocal] = useState("");
  const [domain, setDomain] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });

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
        <Input
          type="password"
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
          name="passwordConfirm"
          value={user.passwordConfirm}
          onChange={onRegistChange}
        />
        <Input
          label="닉네임"
          placeholder="별명 (2~20자)"
          description="다른 유저와 겹치지 않도록 입력해주세요.(2~20자)"
          name="nickname"
          value={user.nickname}
          onChange={onRegistChange}
        />

        <section className="agree-section">
          <h4>약관 동의</h4>
          <div className="section__container">
            <div className="agree__chackbox">
              <input
                type="checkbox"
                id="agree_all"
                name="agree_all"
                onChange={handleIsAgreeAll}
              />
              <label htmlFor="all">
                <strong>전체 동의</strong>{" "}
                <span>선택항목에 대한 동의 포함</span>
              </label>
            </div>

            <hr />

            {isAgree.map((agree) => (
              <AgreeInput
                key={agree.title}
                id={agree.state}
                title={agree.title}
                condition={agree.condition}
                checked={agree.checked}
                onChange={() => handleIsAgree(agree)}
              />
            ))}
          </div>
        </section>

        {/* //* reCAPTCHA */}
        <Button type="submit">회원가입하기</Button>
      </form>
      <p>
        이미 아이디가 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </main>
  );
};

export default Signup;
