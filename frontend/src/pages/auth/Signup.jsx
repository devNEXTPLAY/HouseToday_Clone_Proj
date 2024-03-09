import './css/Signup.scss';
import { Link } from 'react-router-dom';

import SnsLogin from '../../components/widgets/SnsLogin';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Signup = () => {
  return (
    <main className='signup'>
      <header>
        <h1>회원가입</h1>
      </header>
      <SnsLogin text='SNS 계정으로 간편하게 회원 가입' />

      <form>
        <Input label='이메일' id='email' placeholder='이메일'>
          <span>@</span>
          <select name='' id=''>
            <option value=''>직접 입력</option>
            <option value='naver.com'>naver.com</option>
          </select>
          <Button>이메일 인증하기</Button>
        </Input>

        <Input
          label='비밀번호'
          placeholder='비밀번호'
          description='영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.'
        />
        <Input label='비밀번호 확인' placeholder='비밀번호 확인' />
        <Input
          label='닉네임'
          placeholder='별명 (2~20자)'
          description='다른 유저와 겹치지 않도록 입력해주세요.(2~20자)'
        />

        <Button>-----reCAPTCHA-----</Button>
        <Button>회원가입하기</Button>
      </form>
      <p>
        이미 아이디가 있으신가요? <Link to='/login'>로그인</Link>
      </p>
    </main>
  );
};

export default Signup;
