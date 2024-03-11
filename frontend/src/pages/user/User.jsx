import './css/User.scss';
import { FcLike } from 'react-icons/fc';

import Header from '../../components/widgets/Header';
import { SettingSubNav } from '../../components/widgets/SettingSubNav';

// * 사용자 프로필 설정
const User = () => {
  return (
    <>
      <Header />
      <SettingSubNav select='profile' />

      {/* //* 사용자 프로필  */}
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

        {/* //* 사용자 게시글  */}
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
