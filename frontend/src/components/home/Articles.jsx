import { useQuery } from '@tanstack/react-query';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';

import './css/Articles.scss';
import { CiBookmark } from 'react-icons/ci';
import { IoIosArrowForward } from 'react-icons/io';

import Article from './Article';
import { LIST } from '../../assets/data';

// * PC 게시글
const PcArticles = () => {
  return (
    <>
      <div className='articles__container'>
        {LIST.map(article => (
          <Article
            key={article.id}
            title={article.title}
            coverImage={article.coverImage}
            content={article.content}
            author={article.author}
            date={article.date}
            viewcount={article.viewcount}
            recommend={article.recommend}
          />
        ))}
      </div>
    </>
  );
};

// * 모바일 게시글
const MobileArticles = () => {
  return (
    <Swiper
      centeredSlides={true}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      className='articles__swiper'
    >
      {LIST.map(article => (
        <SwiperSlide key={article.id} className='articles__swiper-slide'>
          <img src={article.coverImage} alt='image' />
          <div className='profile'>
            <img src='https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/168729926406224361.jpeg?w=50' />
            <strong>사용자</strong>

            <button>
              <CiBookmark />
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

// * 게시글
const Articles = () => {
  const isPc = useMediaQuery({
    query: '(min-width:769px)',
  });

  const isMobile = useMediaQuery({
    query: '(max-width:768px)',
  });

  return (
    <ul className='articles'>
      <div className='articles__title-box'>
        <div>
          <h3>이런 사진을 찾고 있나요?</h3>
          {isMobile && <p>좋아하실 만한 인테리어 콘텐츠를 추천해드려요</p>}
        </div>

        {/* 모바일 > 아이콘 */}
        {isMobile && <IoIosArrowForward />}
      </div>

      {isPc && <PcArticles />}
      {isMobile && <MobileArticles />}
    </ul>
  );
};

export default Articles;
