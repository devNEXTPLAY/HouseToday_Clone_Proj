import { Outlet } from "react-router-dom";

import HomeNavigation from "../components/widgets/HomeNavigation";
import MainSubNav from "../components/widgets/MainSubNav";
import Footer from "../components/home/Footer";

const HomeLayout = () => {
  return (
    <>
      <HomeNavigation />
      <MainSubNav />
      <Outlet />

      <Footer />
    </>
  );
};

export default HomeLayout;
