import { v4 as uuid } from 'uuid';
import { useState, useEffect } from 'react';
import './css/WriteEditor.scss';

// * TinyMCE: 텍스트 에디터 라이브러리
import { Editor } from '@tinymce/tinymce-react';
import Input from '../ui/Input';

// * 게시글 에디터

const WriteEditor = ({ id, onSubmit }) => {
  const [userValues, setUserValues] = useState({
    title: '',
    preview_img: null,
    content: '',
    blog_tpye_code: 0,
    hashtag: [],
  });

  const [hashtagValeue, setHashTagValue] = useState('');

  useEffect(() => {
    console.log(userValues.hashtag);
  }, [userValues.hashtag]);

  // 사진 업로드 반영
  const handleUpload = e => {
    const {
      target: { files },
    } = e;

    const thisFile = files[0];
    const reader = new FileReader();
    reader.onloadend = file => {
      const {
        currentTarget: { result },
      } = file;
      setUserValues(prevValues => {
        return { ...prevValues, image: result };
      });
    };
    reader.readAsDataURL(thisFile);
  };

  const handleChangeHashTagValue = event => {
    setHashTagValue(event.target.value);
  };

  // 해시태그 추가
  const handleAddHashTag = event => {
    if (event.key === 'Enter' && hashtagValeue.length > 1) {
      setUserValues(prevValues => {
        return {
          ...prevValues,
          hashtag: [
            ...prevValues.hashtag,
            {
              id: hashtagValeue + uuid(),
              value: hashtagValeue,
            },
          ],
        };
      });
      setHashTagValue('');
    }
  };

  // 해시태그 삭제
  const handleRemoveHashTag = hashtagKey => {
    setUserValues(prevValues => {
      return {
        ...prevValues,
        hashtag: prevValues.hashtag.filter(tag => tag.id !== hashtagKey),
      };
    });
  };

  // 해시태그 추가시, 엔터키로 인한 폼 전송 방지
  const handleStopSubmit = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      return false;
    }
  };

  return (
    <form
      className='form'
      id={id}
      onKeyDown={handleStopSubmit}
      onSubmit={event => onSubmit(event, userValues)}
    >
      {/* //* 대표 이미지 업로드 */}
      <section className='form__main-image-upload'>
        <input
          type='file'
          name='preview_img'
          onChange={handleUpload}
          accept='image/*'
        />

        {/* 이미지 추가 전 */}
        {!userValues.image && (
          <>
            <p>
              드래그앤 드롭이나 추가하기 버튼으로 <br /> 대표사진을 업로드
              해주세요.
            </p>
            <button>대표사진 추가하기</button>
          </>
        )}

        {/* 이미지 추가 후 추가한 이미지 보여주기 */}
        {userValues.image && (
          <>
            <button className='button-change' type='button'>
              대표 이미지 변경하기
            </button>
            <img src={userValues.image} alt='대표 이미지' />
          </>
        )}
      </section>

      {/* 제목 */}
      <Input
        name='title'
        placeholder='제목을 입력해주세요.'
        onChange={event =>
          setUserValues(prevValues => {
            return { ...prevValues, [event.target.name]: event.target.value };
          })
        }
      />

      {/* 카테고리 */}
      <div className='select-box'>
        <div>
          <label htmlFor='select__option'>카테고리</label>
          <select
            id='select__option'
            onChange={event =>
              setUserValues(prevValues => {
                return { ...prevValues, blog_tpye_code: event.target.value };
              })
            }
          >
            <option value='0'>집들이</option>
            <option value='1'>노하우</option>
            <option value='2'>사진 / 영상</option>
          </select>
        </div>

        {userValues.hashtag.length > 0 && (
          <ul className='hashtag-list'>
            {userValues.hashtag.map(tag => {
              return (
                <li key={tag.id}>
                  <button
                    type='button'
                    onClick={() => handleRemoveHashTag(tag.id)}
                  >{`# ${tag.value}`}</button>
                </li>
              );
            })}
          </ul>
        )}

        {userValues.hashtag.length >= 0 && userValues.hashtag.length < 3 && (
          <input
            type='text'
            id='hashtag'
            placeholder='태그를 입력하세요.'
            value={hashtagValeue}
            onChange={handleChangeHashTagValue}
            onKeyDown={handleAddHashTag}
          />
        )}
      </div>

      {/* //* // * TinyMCE: 텍스트 에디터 라이브러리 */}
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        id='write-editor'
        onEditorChange={content =>
          setUserValues(prevValues => {
            return { ...prevValues, content };
          })
        }
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
      />
    </form>
  );
};

export default WriteEditor;
