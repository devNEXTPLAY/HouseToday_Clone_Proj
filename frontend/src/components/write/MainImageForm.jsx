import { useState } from "react";
import { fetchMainImageUpload } from "../../util/http";

const MainImageForm = ({ onUserValues }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleUpload = async (e) => {
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
  };

  return (
    <>
      <input type="file" name="preview_img" id="preview_img" onChange={handleUpload} accept="image/*" />

      {/* 이미지 추가 전 */}
      {!imagePreview && (
        <>
          <p>
            드래그앤 드롭이나 추가하기 버튼으로 <br /> 대표사진을 업로드 해주세요.
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
