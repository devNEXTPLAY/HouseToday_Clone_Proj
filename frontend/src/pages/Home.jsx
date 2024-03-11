import Header from '../components/widgets/Header';
import MainImage from '../components/home/MainImage';
import Articles from '../components/home/Articles';
import MainSubNav from '../components/widgets/MainSubNav';

const Home = () => {
  return (
    <>
      <Header />
      <MainSubNav select='home' />
      <MainImage />
      <Articles />
    </>
  );
};

export default Home;
