import './css/HousePhotoArticle.scss';
import { FcLikePlaceholder } from 'react-icons/fc';
import { HiOutlineChatBubbleBottomCenter } from 'react-icons/hi2';

const HousePhotoArticle = ({
  nickname,
  description,
  profileImage,
  likeCount,
  commentCount,
  coverImage,
  content,
}) => {
  return (
    <li className='house-photo-card'>
      <section className='profile'>
        <img src={profileImage} alt='프로필 사진' />
        <div className='profile__description'>
          <div className='description__nickname'>
            <stong>{nickname}</stong>
            <span></span>
            <button>팔로우</button>
          </div>
          <p className='description__introduction'>{description}</p>
        </div>
      </section>
      <div className='card__image'>
        <img src={coverImage} alt='' />
      </div>
      <div className='card__count'>
        <span>
          <button>
            <FcLikePlaceholder />
          </button>
          <p>{likeCount}</p>
        </span>

        <span>
          <button>
            <HiOutlineChatBubbleBottomCenter />
          </button>
          <p>{commentCount}</p>
        </span>
      </div>

      <p className='card__content'> {content}</p>
    </li>
  );
};

export default HousePhotoArticle;
