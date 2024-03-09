import './css/Articles.scss';

import Article from './Article';
import { LIST } from '../../assets/data';

const Articles = () => {
  return (
    <ul className='articles'>
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
    </ul>
  );
};

export default Articles;
