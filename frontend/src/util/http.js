import axios from "axios";

// 게시글 업로드
export const fetchPostUpload = async (userValues, token) => {
  try {
    await axios({
      method: "post",
      url: "http://localhost:3005/api/blog/create",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        blog_type_code: userValues.blog_type_code,
        title: userValues.title,
        contents: userValues.contents,
        preview_img: userValues.preview_img,
        hashtags: userValues.hashtags,
      },
    });
  } catch (error) {
    new Error("오류가 발생했습니다.", error);
  }
};

// 게시글 수정
export const fetchPostEdit= async (userValues, token, blogId) => {
  try {
    await axios({
      method: "post",
      url: "http://localhost:3005/api/blog/edit" + blogId,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        blog_type_code: userValues.blog_type_code,
        title: userValues.title,
        contents: userValues.contents,
        preview_img: userValues.preview_img,
        hashtags: userValues.hashtags,
      },
    });
  } catch (error) {
    new Error("오류가 발생했습니다.", error);
  }
};


// 게시글 대표 이미지 업로드
export const fetchMainImageUpload = async (formData, onUserValues) => {
  await axios
    .post("http://localhost:3005/api/common/upload", formData)
    .then(res => {
      const imageUrl = `http://localhost:3005/${res.data.filePath}`;
      onUserValues(prevValues => {
        return { ...prevValues, preview_img: imageUrl };
      });
    });
};

// 게시글 콘텐츠 이미지 업로드
export const fetchPostUploadImage = async (formData, quillRef) => {
  await axios.post("http://localhost:3005/api/common/upload", formData).then(
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
};
