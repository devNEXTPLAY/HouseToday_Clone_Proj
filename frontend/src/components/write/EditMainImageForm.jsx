import { useState, useEffect } from "react";
import { fetchMainImageUpload } from "../../util/http";

const EditMainImageForm = ({ onUserValues, previewImg }) => {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setImagePreview(previewImg);
  }, [previewImg]);

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

      <button className="button-change" type="button">
        대표 이미지 변경하기
      </button>
      <img src={imagePreview} alt="대표 이미지" />
    </>
  );
};

export default EditMainImageForm;
