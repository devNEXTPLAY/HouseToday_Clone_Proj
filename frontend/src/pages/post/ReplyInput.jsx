import { useSelector } from "react-redux";

import axios from "axios";
import { useInput } from "../../components/hooks/useInput";

const ReplyInput = ({ commentBlogId, commentId }) => {
  const { value: commentValue, handleInputChange: handleCommentChange } = useInput("");
  const token = useSelector((state) => state.Auth.token);

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
        blog_id: commentBlogId,
        parent_id: commentId,
        content: commentValue,
      },
    }).then((res) => {
      console.log("res", res);
    });
  };

  return (
    <>
      <div className="comment__input">
        <textarea
          name="content"
          id="content"
          placeholder="댓글을 입력해주세요"
          rows={50}
          value={commentValue}
          onChange={handleCommentChange}
        ></textarea>
        <button onClick={handleComment}>입력</button>
      </div>
    </>
  );
};

export default ReplyInput;
