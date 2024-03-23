import Loadingindicator from "./Loadingindicator";
import "./css/Loading.scss";

//* 로딩 화면
const Loading = ({ title = "Loading . . ." }) => {
  return (
    <main className="main">
      <Loadingindicator title={title} />
    </main>
  );
};

export default Loading;
