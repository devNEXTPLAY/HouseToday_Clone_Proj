import Resizer from "./resizer";
import { useState } from "react";
import "./css/WriteEditor.scss";

// * TinyMCE: 텍스트 에디터 라이브러리
import { Editor } from "@tinymce/tinymce-react";
import Input from "../ui/Input";

const resizeFile = file =>
  new Promise(resolve => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      uri => {
        resolve(uri);
      },
      "base64"
    );
  });

// * 게시글 에디터
const WriteEditor = ({ id, onSubmit }) => {
  const [userValues, setUserValues] = useState({
    blog_type_code: 0,
    title: "",
    contents: "",
    preview_img: "",
    hashtags: [],
  });

  const [hashtagValeue, setHashTagValue] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleUpload = async e => {
    // const reader = new FileReader();
    // reader.onload = () => {
    //   const base64 = reader.result;
    //   setUploadedImage(base64);
    // };
    // reader.readAsDataURL(file);
    const file = await e.target.files[0]; //사용자가 업로드한 이미지를 비동기적으로 가져온다.
    // console.log("imgae incoding before : ", file);
    const suppertedFormats = ["image/jpeg", "image/png", "image/svg+xml"]; //허용한 이미지 형식 정의
    if (!e.target.files[0]) {
      //만약 업로드한 이미지가 존재하지 않는다면 함수를 종료
      return;
    }
    if (!suppertedFormats.includes(file.type)) {
      //업로드한 이미지가 정의된 형식에 맞지 않는다면 경고창 띄우기
      alert(
        "지원되지 않은 이미지 형식입니다. JPEG, PNG형식의 이미지를 업로드해주세요."
      );
      return;
    }
    try {
      const compressedFile = await resizeFile(file); //"resizeFile"함수를 통해서 업로드한 이미지 리사이징 및 인코딩
      console.log("imgae incoding after : ", compressedFile);
      setImagePreview(String(compressedFile)); //인코딩한 이미지를 브라우저에 프리뷰 하기 위해 state 정의
      setUserValues(prevValues => {
        return { ...prevValues, preview_img: String(compressedFile) };
      });
    } catch (error) {
      //리사이징에 실패했을시 console에 출력하게 한다.
      console.log("file resizing failed");
      console.log(error);
    }
  };

  // 해시태그 입력
  const handleChangeHashTagValue = event => setHashTagValue(event.target.value);

  // 해시태그 추가
  const handleAddHashTag = event => {
    // 중복 방지
    const duplicateHashtag = userValues.hashtags.includes(hashtagValeue);

    if (duplicateHashtag) {
      return;
    }

    if (event.key === "Enter" && hashtagValeue.length > 1) {
      setUserValues(prevValues => {
        const updateHashtags = [...prevValues.hashtags, hashtagValeue];
        return {
          ...prevValues,
          hashtags: updateHashtags,
        };
      });

      setHashTagValue("");
    }
  };

  // 해시태그 삭제
  const handleRemoveHashTag = hashtagKey => {
    setUserValues(prevValues => {
      return {
        ...prevValues,
        hashtags: prevValues.hashtags.filter(tag => tag !== hashtagKey),
      };
    });
  };

  // 해시태그 추가시, 엔터키로 인한 폼 전송 방지
  const handleStopSubmit = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      return false;
    }
  };

  return (
    <form
      className="form"
      id={id}
      onKeyDown={handleStopSubmit}
      onSubmit={event => onSubmit(event, userValues)}
    >
      {/* //* 대표 이미지 업로드 */}
      <section className="form__main-image-upload">
        <input
          type="file"
          name="preview_img"
          id="preview_img"
          onChange={handleUpload}
          accept="image/*"
        />

        {/* 이미지 추가 전 */}
        {!imagePreview && (
          <>
            <p>
              드래그앤 드롭이나 추가하기 버튼으로 <br /> 대표사진을 업로드
              해주세요.
            </p>
            <button>대표사진 추가하기</button>
          </>
        )}

        {/* 이미지 추가 후 추가한 이미지 보여주기 */}
        {imagePreview && (
          <>
            <button className="button-change" type="button">
              대표 이미지 변경하기
            </button>
            <img src={imagePreview} alt="대표 이미지" />
          </>
        )}
      </section>

      {/* 제목 */}
      <Input
        name="title"
        placeholder="제목을 입력해주세요."
        onChange={event =>
          setUserValues(prevValues => {
            return { ...prevValues, [event.target.name]: event.target.value };
          })
        }
      />

      {/* 카테고리 */}
      <div className="select-box">
        <div>
          <label htmlFor="select__option">카테고리</label>
          <select
            id="select__option"
            onChange={event =>
              setUserValues(prevValues => {
                return { ...prevValues, blog_tpye_code: event.target.value };
              })
            }
          >
            <option value="0">집들이</option>
            <option value="1">노하우</option>
            <option value="2">사진 / 영상</option>
          </select>
        </div>

        {userValues.hashtags.length > 0 && (
          <ul className="hashtag-list">
            {userValues.hashtags.map(tag => {
              return (
                <li key={tag}>
                  <button
                    type="button"
                    onClick={() => handleRemoveHashTag(tag)}
                  >{`# ${tag}`}</button>
                </li>
              );
            })}
          </ul>
        )}

        {userValues.hashtags.length < 3 && (
          <input
            type="text"
            id="hashtag"
            placeholder="태그를 입력하세요."
            value={hashtagValeue}
            onChange={handleChangeHashTagValue}
            onKeyDown={handleAddHashTag}
          />
        )}
      </div>

      {/* //* // * TinyMCE: 텍스트 에디터 라이브러리 */}
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        id="write-editor"
        onEditorChange={contents =>
          setUserValues(prevValues => {
            return { ...prevValues, contents };
          })
        }
        init={{
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
      />
    </form>
  );
};

export default WriteEditor;
