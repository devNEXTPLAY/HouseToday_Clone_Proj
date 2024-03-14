import './css/HousePhoto.scss';

import { HOUSE_PHOTO_DATA } from '../../assets/house-photo';

import HousePhotoArticle from './HousePhotoArticle';

const HousePhoto = () => {
  return (
    <>
      <main className='house-photo'>
        <ul className='card-list'>
          {HOUSE_PHOTO_DATA.map(article => (
            <HousePhotoArticle
              key={article.id}
              nickname={article.nickname}
              description={article.description}
              profileImage={article.profileImage}
              likeCount={article.likeCount}
              commentCount={article.commentCount}
              coverImage={article.coverImage}
              content={article.content}
            />
          ))}
        </ul>
      </main>
    </>
  );
};

export default HousePhoto;
