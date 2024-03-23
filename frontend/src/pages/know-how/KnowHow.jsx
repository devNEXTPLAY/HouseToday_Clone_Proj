import "./css/KnowHow.scss";

import Articles_simple from "../../components/home/Articles_simple";

``;

const KnowHow = () => {
  return (
    <>
      {/* //* 게시글 목록 화면  */}
      <main className="community">
        <select name="sort" id="sort">
          <option value="">정렬</option>
          <option value="like">좋아요순</option>
        </select>

        <span>전체 12,544</span>
        <Articles_simple />
      </main>
    </>
  );
};

export default KnowHow;
