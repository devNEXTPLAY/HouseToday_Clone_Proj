import { useState } from "react";
import ReplyInput from "./ReplyInput";

const Comment = ({ comment, className }) => {
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
      <li className={`comment_item ${className}`}>
        <div className="user__profile">
          <img src={comment.User.profile_img} alt="" />
          <strong>{comment.User.nickname}</strong>
        </div>

        <p className="comment__text">{comment.content}</p>

        <div className="user__action">
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
                <Comment comment={reply} className="reply" />
              </div>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Comment;
