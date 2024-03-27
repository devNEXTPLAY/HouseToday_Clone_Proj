import { useState } from "react";

import ReplyInput from "./ReplyInput";

import classes from "./css/PostComments.module.css";

const PostComments = ({ comment }) => {
  const [isReply, setIsReply] = useState(false);
  const [isReplyList, setIsReplyList] = useState(false);

  const handleToggleComment = () => {
    console.log("handleToggleComment");
    setIsReply((prevIsReply) => !prevIsReply);
  };

  const handleShowReply = () => {
    setIsReplyList((prevIsReplyList) => !prevIsReplyList);
  };

  return (
    <>
      <li className={classes.li}>
        <div className={classes.user}>
          <img src={comment.User.profile_img} alt="" />
          <strong>{comment.User.nickname}</strong>
        </div>

        <p>{comment.content}</p>

        <div className={classes.actions}>
          <span>{comment.reg_date}</span>
          <span>좋아요</span>
          <span>신고</span>
          {comment.Replies?.length > 0 && <span onClick={handleShowReply}>답글 {comment.Replies?.length}</span>}
          <span onClick={handleToggleComment}>답글 달기</span>
        </div>
      </li>

      {isReply && <ReplyInput commentBlogId={comment.blog_id} commentId={comment.comment_id} />}
      {isReplyList && (
        <ul>
          {comment.Replies.map((reply) => {
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
