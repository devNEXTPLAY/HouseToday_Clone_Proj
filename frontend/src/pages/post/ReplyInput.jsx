import { useSelector } from "react-redux";

import axios from "axios";
import { useInput } from "../../components/hooks/useInput";
import CommentInput from "../../components/ui/CommentInput";

const ReplyInput = ({ commentBlogId, commentId }) => {
  const { value: commentValue, handleInputChange: handleCommentChange } = useInput("");
  const token = useSelector((state) => state.Auth.token);


  const handleSubmitComment = async () => {
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
    <CommentInput commentValue={commentValue} handleCommentChange={handleCommentChange} handleSubmitComment={handleSubmitComment} token={token} />
  );
};

export default ReplyInput;
