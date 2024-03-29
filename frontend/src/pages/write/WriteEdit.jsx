import "./css/Write.scss";

import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { TextLogo } from "../../assets/TextLogo";
import Button from "../../components/ui/Button";

import { fetchPostEdit } from "../../util/http";
import EditWrite from "../../components/write/EditWrite";

//* 게시글 수정
const WriteEdit = () => {
  const token = useSelector((state) => state.Auth.token);
  const param = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (event, userValues) => {
    event.preventDefault();
    fetchPostEdit(userValues, token, param.id);
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <Link to="/">
          <TextLogo />
        </Link>

        <div className="header__button-box">
          <Button>임시저장</Button>
          <Button type="submit" form="edit-write">
            업로드
          </Button>
        </div>
      </header>

      {/* //* 게시글 에디터 */}
      <EditWrite id="edit-write" onSubmit={handleSubmit} paramId={param.id} />
    </>
  );
};

export default WriteEdit;
