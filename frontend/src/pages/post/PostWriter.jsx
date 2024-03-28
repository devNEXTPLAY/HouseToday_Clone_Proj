import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

import classes from "./css/PostWriter.module.css";
import axios from "axios";

const PostWriter = ({ profileImg, nickname, userId, blogId }) => {
  const token = useSelector((state) => state.Auth.token);
  const currentUser = useSelector((state) => state.Auth.userId);
  const navigate = useNavigate();

  const handleDletePost = async () => {
    await axios({
      method: "delete",
      url: "http://localhost:3005/api/blog/delete/" + blogId,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  const handlePostEdit = () => {
    navigate("/write/edit/" + blogId);
  };

  return (
    <>
      <div className={classes.writer}>
        <div className={classes.profile}>
          <Link to="/">
            <img src={profileImg} alt="프로필 사진" />
          </Link>

          <div>
            <strong>{nickname}</strong>
            <span>안녕하세요!</span>
          </div>
        </div>

        <div className={classes.buttons}>
          {userId !== currentUser && <Button>팔로우</Button>}
          {userId === currentUser && (
            <Button className={classes.edit} onClick={handlePostEdit}>
              수정
            </Button>
          )}
          {userId === currentUser && (
            <Button className={classes.delete} onClick={handleDletePost}>
              삭제
            </Button>
          )}
        </div>
      </div>

      <hr />
    </>
  );
};

export default PostWriter;
