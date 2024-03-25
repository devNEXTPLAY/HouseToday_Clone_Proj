import { useState, useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";

import NonAuthHomeNavigation from "../components/widgets/NonAuthHomeNavigation";
import MainSubNav from "../components/widgets/MainSubNav";
import Footer from "../components/home/Footer";

const NonAuthHomeLayout = () => {
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setCurrentScrollY(window.scrollY);
    setPrevScrollY(currentScrollY);
  }, [currentScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <NonAuthHomeNavigation />
      {
        <MainSubNav
          onClass={
            currentScrollY < prevScrollY || currentScrollY < 50
              ? "show"
              : "hide"
          }
        />
      }
      <Outlet />
      <Footer />
    </>
  );
};

export default NonAuthHomeLayout;
