import './css/Articles.scss';

import Article from './Article';
import { LIST } from '../../assets/data';

const Articles = () => {
  return (
    <ul className='articles'>
      <h3>이런 사진을 찾고 있나요?</h3>

      <div className='articles__container'>
        {LIST.map(article => (
          <Article
            key={article.id}
            title={article.title}
            coverImage={article.coverImage}
            content={article.content}
            author={article.author}
            date={article.date}
            viewcount={article.viewcount}
            recommend={article.recommend}
          />
        ))}
      </div>
    </ul>
  );
};

export default Articles;
