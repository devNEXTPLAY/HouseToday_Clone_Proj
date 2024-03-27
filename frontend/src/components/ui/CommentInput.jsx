import { Link } from "react-router-dom";

import classes from "./css/CommentInput.module.css";

const CommentInput = ({ commentValue, handleCommentChange, handleSubmitComment, token, onClassName }) => {
  return (
    <div className={classes.comment}>
      <textarea
        name="content"
        id="content"
        className={onClassName}
        placeholder="댓글을 입력해주세요"
        rows={50}
        value={commentValue}
        onChange={handleCommentChange}
      ></textarea>
      <button onClick={handleSubmitComment}>입력</button>
      {!token && <Link className={classes.link} to="/login"></Link>}
    </div>
  );
};

export default CommentInput;
