import { Outlet } from 'react-router-dom';

import HomeNavigation from '../components/widgets/HomeNavigation';
import MainSubNav from '../components/widgets/MainSubNav';

const HomeLayout = () => {
  return (
    <>
      <HomeNavigation />
      <MainSubNav />
      <Outlet />
    </>
  );
};

export default HomeLayout;
