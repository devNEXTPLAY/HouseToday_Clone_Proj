import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

import classes from "./css/PostWriter.module.css";

const PostWriter = ({ profileImg, nickname }) => {
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

        <Button>팔로우</Button>
      </div>

      <hr />
    </>
  );
};

export default PostWriter;
