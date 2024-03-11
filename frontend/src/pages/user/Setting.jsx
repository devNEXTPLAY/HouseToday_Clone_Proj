import './css/Setting.scss';
import Header from '../../components/widgets/Header';
import { Link } from 'react-router-dom';
import { SettingSubNav } from '../../components/widgets/SettingSubNav';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

// * 사용자 설정
const Setting = () => {
  return (
    <>
      <Header />
      <SettingSubNav select='setting' />

      <form className='form'>
        <div className='form__image-box'>
          <img
            src='https://d12zq4w4guyljn.cloudfront.net/750_750_20220126102336280_photo_32b06416ea97.jpg'
            alt='image'
          />
          <button>이미지 삭제</button>
        </div>

        <Input label='닉네임' value='정민영' />
        <Input label='이메일' type='email' value='myjeong19@naver.com' />
        <hr />

        <Input label='휴대전화번호' value='010-3957-3540' />
        <Input label='생년월일' type='date' value='1998-03-19' />
        <Input
          label='1줄 소개'
          placeholder='짧은 글로 자신을 소개해보세요. (최대 150자)'
        />

        <nav className='nav'>
          <Link>탈퇴하기</Link>

          <Button>완료</Button>
        </nav>
      </form>
    </>
  );
};

export default Setting;
