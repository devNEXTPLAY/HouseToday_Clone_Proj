import './css/HousewarmingParty.scss';

import { HOUSEWARMING_PARTY_DATA } from '../../assets/housewarming-party';
import HousewarmingPartyArticle from './HousewarmingPartyArticle';

const HousewarmingParty = () => {
  return (
    <>
      <mian className='housewraming-party'>
        <select name='sort' id='sort'>
          <option value=''>정렬</option>
          <option value='like'>좋아요순</option>
        </select>

        <span>조회 12,453</span>

        <ul className='card-list'>
          {HOUSEWARMING_PARTY_DATA.map(article => (
            <HousewarmingPartyArticle
              key={article.id}
              title={article.title}
              author={article.author}
              likeCount={article.likeCount}
              viewCount={article.viewCount}
              coverImage={article.coverImage}
              profileImage={article.profileImage}
            />
          ))}
        </ul>
      </mian>
    </>
  );
};

export default HousewarmingParty;
