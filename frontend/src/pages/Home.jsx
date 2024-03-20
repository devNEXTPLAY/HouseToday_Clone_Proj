import MainImage from '../components/home/MainImage';
import Articles_simple from '../components/home/Articles_simple';

const Home = () => {
  return (
    <>
      {/* //* 대표 이미지 및 캐러셀 */}
      <MainImage />

      {/* //* 게시글들 */}
      <Articles_simple />
    </>
  );
};

export default Home;
