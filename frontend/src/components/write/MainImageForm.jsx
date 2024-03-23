import { useState } from "react";
import { fetchMainImageUpload } from "../../util/http";

const MainImageForm = ({ onUserValues }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleUpload = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    // 이미지 프리뷰
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);

    fetchMainImageUpload(formData, onUserValues);
    // const file = await e.target.files[0]; //사용자가 업로드한 이미지를 비동기적으로 가져온다.
    // // console.log("imgae incoding before : ", file);
    // const suppertedFormats = ["image/jpeg", "image/png", "image/svg+xml"]; //허용한 이미지 형식 정의
    // if (!e.target.files[0]) {
    //   //만약 업로드한 이미지가 존재하지 않는다면 함수를 종료
    //   return;
    // }
    // if (!suppertedFormats.includes(file.type)) {
    //   //업로드한 이미지가 정의된 형식에 맞지 않는다면 경고창 띄우기
    //   alert(
    //     "지원되지 않은 이미지 형식입니다. JPEG, PNG형식의 이미지를 업로드해주세요."
    //   );
    //   return;
    // }
    // try {
    //   const compressedFile = await resizeFile(file); //"resizeFile"함수를 통해서 업로드한 이미지 리사이징 및 인코딩
    //   console.log("imgae incoding after : ", compressedFile);
    //   setImagePreview(String(compressedFile)); //인코딩한 이미지를 브라우저에 프리뷰 하기 위해 state 정의
    //   setUserValues(prevValues => {
    //     return { ...prevValues, preview_img: String(compressedFile) };
    //   });
    // } catch (error) {
    //   //리사이징에 실패했을시 console에 출력하게 한다.
    //   console.log("file resizing failed");
    //   console.log(error);
    // }
  };

  return (
    <>
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
    </>
  );
};

export default MainImageForm;
