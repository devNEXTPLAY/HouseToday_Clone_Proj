import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { fetchPostUpload } from "../../util/http";

import "./css/Write.scss";

import { TextLogo } from "../../assets/TextLogo";
import Guide from "../../components/write/Guide";
import WriteEditor from "../../components/write/WriteEditor";
import Button from "../../components/ui/Button";

// * 게시글 작성
const Write = () => {
  const token = useSelector((state) => state.Auth.token);
  const navigate = useNavigate();
  const [isInvalid, setIsInvalid] = useState({
    title: false,
    contents: false,
    preview_img: false,
  });

  const handleSubmit = async (event, userValues) => {
    event.preventDefault();

    if (!isInvalid.title || !isInvalid.contents || !isInvalid.preview_img) {
      return;
    }

    const res = await fetchPostUpload(userValues, token);
    console.log("res:", res);
    navigate(`/post/${res}`);
  };

  return (
    <>
      <header className="header">
        <Link to="/">
          <TextLogo />
        </Link>

        <div className="header__button-box">
          <Button>임시저장</Button>
          <Button type="submit" form="create-write">
            업로드
          </Button>
        </div>
      </header>

      <Guide />

      {/* //* 게시글 에디터 */}
      <WriteEditor id="create-write" onSubmit={handleSubmit} isInvalid={isInvalid} onIsInvalid={setIsInvalid} />
    </>
  );
};

export default Write;
