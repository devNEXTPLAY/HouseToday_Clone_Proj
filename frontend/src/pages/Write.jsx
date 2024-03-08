import './css/Write.scss';

import { TextLogo } from '../assets/TextLogo';
import WriteEditor from '../components/write/WriteEditor';
import Button from '../components/ui/Button';

const Write = () => {
  return (
    <>
      <header className='header'>
        <TextLogo />

        <div className='header__button-box'>
          <Button>임시저장</Button>
          <Button>업로드</Button>
        </div>
      </header>

      <WriteEditor />
    </>
  );
};

export default Write;
