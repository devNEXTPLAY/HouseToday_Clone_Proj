import { Link } from 'react-router-dom';
import Carousel from './Carousel';

import './css/MainImage.scss';

const MainImage = () => {
  return (
    <main className='main'>
      <Link to='https://n.news.naver.com/mnews/article/001/0014536854?sid=104'>
        <img
          src='https://imgnews.pstatic.net/image/001/2024/02/29/AKR20240229188300073_01_i_P4_20240229215916565.jpg?type=w647'
          alt='news-image'
        />

        <div className='main__image-description'>
          <strong>
            오타니 결혼에 일본도 &apos;깜짝&apos;…정규 방송 중단하고 속보
          </strong>
          <div>
            <img
              src='https://images.unsplash.com/photo-1709833226150-8eaeb6f291d1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt='오늘의집 에디터'
            />
            <span>오늘의 집 에디터</span>
          </div>
        </div>
      </Link>

      <Carousel />
    </main>
  );
};

export default MainImage;
