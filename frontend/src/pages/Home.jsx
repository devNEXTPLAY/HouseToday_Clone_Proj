import Header from '../components/widgets/Header';
import MainImage from '../components/home/MainImage';
import Articles from '../components/home/Articles';
import MainSubNav from '../components/widgets/MainSubNav';

const Home = () => {
  return (
    <>
      {/* //*  헤더 (로고, 검색, 사용자 프로필, 글쓰기 네비게이션) */}
      <Header />

      {/* //* 헤더 하단 네비게이션   */}
      <MainSubNav select='home' />

      {/* //* 대표 이미지 및 캐러셀 */}
      <MainImage />

      {/* //* 게시글들 */}
      <Articles />
    </>
  );
};

export default Home;
