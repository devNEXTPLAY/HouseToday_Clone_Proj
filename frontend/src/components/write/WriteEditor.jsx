import './css/WriteEditor.scss';

// * TinyMCE: 텍스트 에디터 라이브러리
import { Editor } from '@tinymce/tinymce-react';
import Input from '../ui/Input';

// * 게시글 에디터

const WriteEditor = () => {
  const handleUpload = e => e.preventDefault();

  return (
    <form className='form'>
      {/* //* 대표 이미지 업로드 */}
      <section className='form__main-image-upload'>
        <input type='file' />
        <p>
          드래그앤 드롭이나 추가하기 버튼으로 <br /> 커버사진을 업로드 해주세요.
        </p>
        <button onClick={handleUpload}>커버사진 추가하기</button>
      </section>

      <Input placeholder='제목을 입력해주세요.' />

      {/* //* // * TinyMCE: 텍스트 에디터 라이브러리 */}
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        id='write-editor'
        init={{
          plugins:
            'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject('See docs to implement AI Assistant')
            ),
        }}
        initialValue=''
      />
    </form>
  );
};

export default WriteEditor;
