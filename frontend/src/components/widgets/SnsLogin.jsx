import './css/SnsLogin.scss';

import { Link } from 'react-router-dom';

import { Facebook } from '../../assets/Facebook.jsx';
import { Kakao } from '../../assets/Kakao.jsx';
import { Naver } from '../../assets/Naver.jsx';

const SnsLogin = ({ text, children }) => {
  return (
    <section className='login-box'>
      <strong>{text}</strong>

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

      {children}

      <div className='form__border-bottom'></div>
    </section>
  );
};

export default SnsLogin;
