import { useSelector } from "react-redux";
import { useInput } from "../../components/hooks/useInput";
import axios from "axios";

import CommentInput from "../../components/ui/CommentInput";

const PostCommentInput = ({ blogId }) => {
  const token = useSelector((state) => state.Auth.token);
  const { value: commentValue, handleInputChange: handleCommentChange } = useInput("");

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
        blog_id: blogId,
        parent_id: null,
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

export default PostCommentInput;
