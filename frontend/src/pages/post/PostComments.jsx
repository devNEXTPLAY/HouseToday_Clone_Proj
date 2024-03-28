import axios from "axios";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useInput } from "../../components/hooks/useInput";

import ReplyInput from "./ReplyInput";

import classes from "./css/PostComments.module.css";
import CommentInput from "../../components/ui/CommentInput";

const PostComments = ({ comment }) => {
  const { value: commentValue, handleInputChange: handleCommentChange } = useInput(comment?.content);
  const [isEdit, setIsEdit] = useState(false);

  const [isReply, setIsReply] = useState(false);
  const [isReplyList, setIsReplyList] = useState(false);

  const currentUser = useSelector((state) => state.Auth.user);
  const token = useSelector((state) => state.Auth.token);

  const handleToggleComment = () => setIsReply((prevIsReply) => !prevIsReply);

  const handleShowReply = () => setIsReplyList((prevIsReplyList) => !prevIsReplyList);

  const handleIsEdit = () => setIsEdit((prevIsEdit) => !prevIsEdit);

  const handleEditComment = async () => {
    await axios({
      method: "patch",
      url: "http://localhost:3005/api/comment/update",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        comment_id: comment.comment_id,
        contents: commentValue,
      },
    }).then((res) => {
      console.log("res", res);
    });
  };

  const handleDeleteComment = async () => {
    await axios({
      method: "delete",
      url: "http://localhost:3005/api/comment/delete",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        comment_id: comment.comment_id,
      },
    }).then((res) => {
      console.log("res", res);
    });
  };

  const handleLikeComment = async () => {
    await axios({
      method: "post",
      url: "http://localhost:3005/api/comment/like",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        comment_id: comment.comment_id,
      },
    }).then((res) => {
      console.log("res", res);
    });
  };

  return (
    <>
      <li className={classes.li}>
        <div className={classes.user}>
          <img src={comment.User.profile_img} alt="" />
          <strong>{comment.User.nickname}</strong>
        </div>

        {!isEdit && <p>{comment.content}</p>}
        {isEdit && (
          <CommentInput commentValue={commentValue} handleCommentChange={handleCommentChange} handleSubmitComment={handleEditComment} token={token} />
        )}

        <div className={classes.actions}>
          <span>{comment.reg_date}</span>
          <span onClick={handleLikeComment}>좋아요</span>
          <span>신고</span>
          {comment.Replies?.length > 0 && <span onClick={handleShowReply}>답글 {comment.Replies?.length}</span>}
          <span onClick={handleToggleComment}>답글 달기</span>
          {currentUser === comment.user_id && <span onClick={handleIsEdit}>수정</span>}
          {currentUser === comment.user_id && <span onClick={handleDeleteComment}>삭제</span>}
        </div>
      </li>

      {isReply && <ReplyInput commentBlogId={comment.blog_id} commentId={comment.comment_id} />}
      {isReplyList && (
        <ul>
          {comment?.Replies.map((reply) => {
            return (
              <div key={reply.comment_id}>
                <PostComments comment={reply} />
              </div>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default PostComments;
