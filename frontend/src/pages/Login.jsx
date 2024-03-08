import { Link } from 'react-router-dom';

import { MainLogo } from '../assets/MainLogo.jsx';
import { Facebook } from '../assets/Facebook.jsx';
import { Kakao } from '../assets/Kakao.jsx';
import { Naver } from '../assets/Naver.jsx';

import './css/Login.scss';

import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
  return (
    <main className='login'>
      <header>
        <MainLogo />
      </header>

      <form>
        <div className='form__input-box'>
          <Input placeholder='이메일' />
          <Input placeholder='비밀번호' />
        </div>

        <Button>로그인</Button>
      </form>

      <nav className='form__link-box'>
        <Link to='/signup'>비밀번호 재설정</Link>
        <Link to='/forgot-password'>회원가입</Link>
      </nav>

      <section className='form__login-box'>
        <strong>SNS 계정으로 간편 로그인/회원가입</strong>

        <nav>
          <Link>
            <Facebook />
          </Link>
          <Link>
            <Kakao />
          </Link>
          <Link>
            <Naver />
          </Link>
        </nav>

        <p>로그인에 문제가 있으신가요?</p>
      </section>
    </main>
  );
};

export default Login;
