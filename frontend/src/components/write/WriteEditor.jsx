import './css/WriteEditor.scss';

import { Editor } from '@tinymce/tinymce-react';
import Input from '../ui/Input';

const WriteEditor = () => {
  return (
    <form className='form'>
      <Input placeholder='제목을 입력해주세요.' />

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
