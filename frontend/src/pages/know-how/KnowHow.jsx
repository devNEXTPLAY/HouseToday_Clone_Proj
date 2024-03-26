import { useLoaderData, Await } from 'react-router-dom';

import "./css/KnowHow.scss";
import KnowHowArticles from "./KnowHowArticles";



const KnowHow = () => {
  const { data } = useLoaderData();


  return (
    <>
      {/* //* 게시글 목록 화면  */}
      <main className="community">
        <select name="sort" id="sort">
          <option value="">정렬</option>
          <option value="like">좋아요순</option>
        </select>


        <Await resolve={data}>
          {(loadedData) => <KnowHowArticles data={loadedData}/>}
        </Await>
        
      </main>
    </>
  );
};

export default KnowHow;
