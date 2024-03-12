import './css/Community.scss';

import Articles from '../../components/home/Articles';
import Header from '../../components/widgets/Header';
import MainSubNav from '../../components/widgets/MainSubNav';
``;

const Community = () => {
  return (
    <>
      <Header />
      <MainSubNav select='community' />

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
