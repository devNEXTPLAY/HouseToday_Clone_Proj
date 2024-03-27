import parse from "html-react-parser";
import { Link } from "react-router-dom";

import PostComments from "./PostComments";
import PostAside from "./PostAside";
import PostCommentInput from "./PostCommentInput";

import Button from "../../components/ui/Button";

import classes from "./css/PostDetail.module.css";
import PostWriter from "./PostWriter";

const PostDetail = ({ data }) => {
  return (
    <>
      <main className={classes.main}>
        {/* //* 게시글 대표 이미지 */}
        <img className={classes["preview-img"]} src={data.preview_img} alt="대표 이미지" />

        <section className={classes.post}>
          {/* //* 게시글 사이드 네비게이션 */}

          <PostAside blogId={data.blog_id} />

          {/* //* 게시글 콘텐츠 */}
          <section className={classes.section}>
            {/* //* 게시글 제목 */}
            <h2>{data.title}</h2>

            <hr />

            {/* //* 게시글 작성자 정보: 프로필 사진, 소개말, 팔로우 버튼*/}
            <PostWriter profileImg={data.User.profile_img} nickname={data.User.nickname} userId={data.User.user_id} blogId={data.blog_id} />

            <div>{parse(data.contents)}</div>

            <img
              className={classes["warning-img"]}
              src="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/170130919448597544.png?w=720"
              alt="Warning"
            />

            {/* //* 게시글 정보: 작성일, 좋아요수, 스크랩수, 조회수 */}
            <div className={classes.actions}>
              <span>{data.reg_date}</span>
              <span>좋아요 {data.like_count}</span>
              <span>조회 {data.view_count}</span>

              <Link>신고하기</Link>
              <hr />
            </div>

            {/* //* 게시글 작성자 정보 상단과 동일 */}
            <PostWriter profileImg={data.User.profile_img} nickname={data.User.nickname} userId={data.User.user_id} blogId={data.blog_id} />

            {/* //* 게시글 댓글 */}
            <article className={classes.comments} id="comment">
              <PostCommentInput blogId={data.blog_id} />
              <div className={classes.information}>
                <span className="title-box__title">댓글</span>
                <span className="title-box__count">{data.comments.length}</span>
              </div>
              <ul className={classes["comment-list"]}>
                {data.comments.map((comment) => (
                  <div key={comment.comment_id}>
                    <PostComments comment={comment} />
                  </div>
                ))}
              </ul>
            </article>
          </section>
        </section>
      </main>
    </>
  );
};

export default PostDetail;
