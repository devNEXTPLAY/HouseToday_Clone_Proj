// import Resizer from "./resizer";
import { useState, useMemo, useRef } from "react";
import axios from "axios";
import "./css/WriteEditor.scss";

// * TinyMCE: 텍스트 에디터 라이브러리
// import { Editor } from "@tinymce/tinymce-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Input from "../ui/Input";
import HashtagForm from "./HashtagForm";
import MainImageForm from "./MainImageForm";

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "background",
  "color",
  "link",
  "image",
  "video",
  "width",
];

// const resizeFile = file =>
//   new Promise(resolve => {
//     Resizer.imageFileResizer(
//       file,
//       300,
//       300,
//       "JPEG",
//       100,
//       0,
//       uri => {
//         resolve(uri);
//       },
//       "base64"
//     );
//   });

// * 게시글 에디터
const WriteEditor = ({ id, onSubmit }) => {
  const [userValues, setUserValues] = useState({
    blog_type_code: 0,
    title: "",
    contents: "",
    preview_img: "",
    hashtags: [],
  });

  const quillRef = useRef();

  const imageHandler = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        axios.post("http://localhost:3005/api/common/upload", formData).then(
          res => {
            const imageUrl = `http://localhost:3005/${res.data.filePath}`;

            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range.index, "image", imageUrl);
            editor.setSelection(range.index + 1);
          },
          error => {
            console.log(error);
          }
        );
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image"],
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const handleUpdateContent = event => {
    setUserValues(prevValues => {
      return { ...prevValues, contents: event };
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
        <MainImageForm onUserValues={setUserValues} />
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

        {/* 해시태그 입력 폼 */}
        <HashtagForm userValues={userValues} onUserValues={setUserValues} />
      </div>

      {/* TinyMCE API 사용량 초과로 ReactQuill 변경 주말 중 업데이트 예정 */}
      {/* 구현 기술, 드래그앤 드랍 이미지 추가 ......... */}
      <ReactQuill
        ref={quillRef}
        theme="snow"
        placeholder="내용을 입력해주세요."
        value={userValues.contents}
        style={{ width: "720px", height: "300px" }}
        onChange={handleUpdateContent}
        formats={formats}
        modules={modules}
      />
    </form>
  );
};

export default WriteEditor;
