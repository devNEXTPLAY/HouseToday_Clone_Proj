import './css/Community.scss';

import Articles from '../../components/home/Articles';

``;

const Community = () => {
  return (
    <>
      {/* //* 게시글 목록 화면  */}
      <main className='community'>
        <select name='sort' id='sort'>
          <option value=''>정렬</option>
          <option value='like'>좋아요순</option>
        </select>

        <span>전체 12,544</span>
        <Articles />
      </main>
    </>
  );
};

export default Community;
