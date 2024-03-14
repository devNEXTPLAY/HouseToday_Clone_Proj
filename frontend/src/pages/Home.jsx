import MainImage from '../components/home/MainImage';
import Articles from '../components/home/Articles';

const Home = () => {
  return (
    <>
      {/* //* 헤더 하단 네비게이션   */}

      {/* //* 대표 이미지 및 캐러셀 */}
      <MainImage />

      {/* //* 게시글들 */}
      <Articles />
    </>
  );
};

export default Home;
