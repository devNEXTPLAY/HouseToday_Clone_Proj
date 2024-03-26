import { useState } from "react";
import ReplyInput from "./ReplyInput";

const Comment = ({ comment }) => {
  const [isReply, setIsReply] = useState(false);

  const handleToggleComment = () => {
    setIsReply((prevIsReply) => !prevIsReply);
  };

  return (
    <>
      <li className="comment_item">
        <div className="user__profile">
          <img src={comment.User.profile_img} alt="" />
          <strong>{comment.User.nickname}</strong>
        </div>

        <p className="comment__text">{comment.content}</p>

        <div className="user__action">
          <span>{comment.reg_date}</span>
          <span>좋아요</span>
          {/* 여기서 toggleReplyInput를 호출합니다. */}
          <span onClick={handleToggleComment}>답글 달기</span>
          <span>신고</span>
        </div>

        {/* 선택된 댓글에만 ReplyInput을 렌더링합니다. */}
      </li>

      {isReply && <ReplyInput commentBlogId={comment.blog_id} commentId={comment.comment_id} />}
    </>
  );
};

export default Comment;
