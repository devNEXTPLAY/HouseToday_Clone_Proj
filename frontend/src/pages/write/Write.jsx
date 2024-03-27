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

  const handleSubmit = async (event, userValues) => {
    event.preventDefault();
    const res = fetchPostUpload(userValues, token);
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
      <WriteEditor id="create-write" onSubmit={handleSubmit} />
    </>
  );
};

export default Write;
