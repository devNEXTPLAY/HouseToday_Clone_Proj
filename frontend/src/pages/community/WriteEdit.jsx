import './css/Write.scss';

import { Link } from 'react-router-dom';

import { TextLogo } from '../../assets/TextLogo';
import WriteEditor from '../../components/write/WriteEditor';
import Button from '../../components/ui/Button';

//* 게시글 수정
const WriteEdit = () => {
  return (
    <>
      <header className='header'>
        <Link to='/'>
          <TextLogo />
        </Link>

        <div className='header__button-box'>
          <Button>임시저장</Button>
          <Button>업로드</Button>
        </div>
      </header>

      {/* //* 게시글 에디터 */}
      <WriteEditor />
    </>
  );
};

export default WriteEdit;
