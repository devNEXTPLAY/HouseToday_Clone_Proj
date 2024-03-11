import { useMediaQuery } from 'react-responsive';
import { CiBookmark } from 'react-icons/ci';

import './css/Article.scss';

const Article = ({ title, content, author, date, viewcount, coverImage }) => {
  const isPc = useMediaQuery({
    query: '(min-width:769px)',
  });

  const isMobile = useMediaQuery({
    query: '(max-width:768px)',
  });

  return (
    <li className='article'>
      <div className='article__image-box'>
        <img src={coverImage} alt='coverImage' />
        <div>
          {isMobile && (
            <div className='article__profile'>
              <h3>작성자</h3>
            </div>
          )}
          <CiBookmark />
        </div>
      </div>

      {isPc && (
        <div className='information__title'>
          <h3>{title}</h3>
          <p className='content'>{content}</p>
        </div>
      )}

      {isPc && (
        <div className='information'>
          <strong>{author}</strong>
          <span>{date}</span>
          <span>{viewcount}</span>
        </div>
      )}
    </li>
  );
};

export default Article;
