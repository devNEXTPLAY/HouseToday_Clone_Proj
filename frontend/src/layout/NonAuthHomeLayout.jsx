import { Outlet } from "react-router-dom";

import NonAuthHomeNavigation from "../components/widgets/NonAuthHomeNavigation";
import MainSubNav from "../components/widgets/MainSubNav";

const NonAuthHomeLayout = () => {
  return (
    <>
      <NonAuthHomeNavigation />
      <MainSubNav />
      <Outlet />
    </>
  );
};

export default NonAuthHomeLayout;
