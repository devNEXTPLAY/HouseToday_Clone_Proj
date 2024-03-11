import { FcLike } from 'react-icons/fc';
import './css/User.scss';

import { Link } from 'react-router-dom';
import Header from '../../components/widgets/Header';
import Button from '../../components/ui/Button';

const User = () => {
  return (
    <>
      <Header />
      <nav className='user-nav'>
        <Link>
          프로필
          <div className='focus'></div>
        </Link>

        <Link>설정</Link>
      </nav>

      <main>
        <section className='uesr-profile'>
          <div className='profile__card'>
            <img
              src='https://d12zq4w4guyljn.cloudfront.net/750_750_20220126102336280_photo_32b06416ea97.jpg'
              alt='프로필 사진'
            />
            <h2>사용자</h2>
            <div>
              <span>팔로워 0</span>
              <span>팔로잉 0</span>
            </div>
            <button>설정</button>

            <hr />

            <div className='card__like'>
              <FcLike />
              <strong>좋아요</strong>
              <p>0</p>
            </div>
          </div>
        </section>

        <div className='card__null'></div>

        <section className='post-list'>
          <div className='lilst__title-box'>
            <strong>게시글</strong>
            <span>0</span>
          </div>
          <article></article>
        </section>
      </main>
    </>
  );
};

export default User;
