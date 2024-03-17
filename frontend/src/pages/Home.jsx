import MainImage from "../components/home/MainImage";
import Articles from "../components/home/Articles";
import Articles_simple from "../components/home/Articles_simple";

const Home = () => {
  return (
    <>
      {/* //* 헤더 하단 네비게이션   */}

      {/* //* 대표 이미지 및 캐러셀 */}
      <MainImage />

      {/* //* 게시글들 */}
      <Articles_simple />
    </>
  );
};

export default Home;
