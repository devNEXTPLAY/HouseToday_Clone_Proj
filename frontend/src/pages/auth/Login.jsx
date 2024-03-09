import { Link } from 'react-router-dom';

// SVG 아이콘 참조
import { MainLogo } from '../../assets/MainLogo';

import './css/Login.scss';

// widgets 컴포넌트 참조

import SnsLogin from '../../components/widgets/SnsLogin';

// * UI 컴포넌트 참조
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Login = () => {
  return (
    <main className='login'>
      <header>
        <MainLogo />
      </header>

      <form>
        <div className='form__input-box'>
          <Input placeholder='이메일' type='email' />
          <Input placeholder='비밀번호' type='password' />
        </div>

        <Button>로그인</Button>
      </form>

      <nav className='form__link-box'>
        <Link to='/password'>비밀번호 재설정</Link>
        <Link to='/signup'>회원가입</Link>
      </nav>

      <SnsLogin text='SNS 계정으로 간편 로그인/회원가입'>
        <Link>로그인에 문제가 있으신가요?</Link>
      </SnsLogin>
    </main>
  );
};

document.title = '로그인 | 라이프스타일 슈퍼앱, 오늘의 집';

export default Login;
