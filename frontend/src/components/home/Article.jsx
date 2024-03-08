import { FcLike } from 'react-icons/fc';

import './css/Article.scss';

const Article = ({
  title,
  content,
  author,
  date,
  viewcount,
  recommend,
  coverImage,
}) => {
  return (
    <li className='article'>
      <div className='article__image-box'>
        <img src={coverImage} alt='coverImage' />
        <div>
          <FcLike />
          <p>{recommend}</p>
        </div>
      </div>

      <h3>{title}</h3>
      <p className='content'>{content}</p>
      <div className='information'>
        <strong>{author}</strong>
        <span>{date}</span>
        <span>{viewcount}</span>
      </div>
    </li>
  );
};

export default Article;
