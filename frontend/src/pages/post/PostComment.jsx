import { useSelector } from "react-redux";
import { useInput } from "../../components/hooks/useInput";
import axios from "axios";
import { Link } from "react-router-dom";

import classes from "./css/PostComment.module.css";

const PostComment = ({ blogId }) => {
  const token = useSelector((state) => state.Auth.token);
  const { value: commentValue, handleInputChange: handleCommentChange } = useInput("");

  const handleComment = async () => {
    await axios({
      method: "post",
      url: "http://localhost:3005/api/comment/create",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        blog_id: blogId,
        parent_id: null,
        content: commentValue,
      },
    }).then((res) => {
      console.log("res", res);
    });
  };

  return (
    <>
      <div className={classes.comment}>
        <textarea
          name="content"
          id="content"
          placeholder="댓글을 입력해주세요"
          rows={50}
          value={commentValue}
          onChange={handleCommentChange}
        ></textarea>
        <button onClick={handleComment}>입력</button>
        {!token && <Link className={classes.link} to="/login"></Link>}
      </div>
    </>
  );
};

export default PostComment;
