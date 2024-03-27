import parse from "html-react-parser";

import { Link } from "react-router-dom";

import Button from "../../components/ui/Button";
import Comment from "./Comment";
import Aside from "./Aside";
import PostComment from "./PostComment";

const PostDetail = ({ data }) => {
  return (
    <>
      <main className="main">
        {/* //* 게시글 대표 이미지 */}
        <img className="main-image" src={data.preview_img} alt="대표 이미지" />

        <section className="post">
          {/* //* 게시글 사이드 네비게이션 */}

          <Aside blogId={data.blog_id} />

          {/* //* 게시글 콘텐츠 */}
          <section className="content">
            {/* //* 게시글 제목 */}
            <h2>{data.title}</h2>

            <hr />

            {/* //* 게시글 작성자 정보: 프로필 사진, 소개말, 팔로우 버튼*/}
            <div className="information-user">
              <div className="information-user__profile">
                <Link to="/">
                  <img
                    src="https://images.unsplash.com/photo-1638996970429-389100ca2b48?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D"
                    alt="profile"
                  />
                </Link>

                <div>
                  <strong>{data.User.nickname}</strong>
                  <span>안녕하세요!</span>
                </div>
              </div>

              <Button>팔로우</Button>
            </div>

            <div>{parse(data.contents)}</div>

            <img
              className="warning"
              src="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/170130919448597544.png?w=720"
              alt="Warning"
            />

            {/* //* 게시글 정보: 작성일, 좋아요수, 스크랩수, 조회수 */}
            <div className="information-post">
              <span>{data.reg_date}</span>
              <span>좋아요 {data.like_count}</span>
              <span>조회 {data.view_count}</span>

              <Link>신고하기</Link>
              <hr />
            </div>

            {/* //* 게시글 작성자 정보 상단과 동일 */}
            <div className="information-user">
              <div className="information-user__profile">
                <Link to="/">
                  <img
                    src="https://images.unsplash.com/photo-1638996970429-389100ca2b48?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D"
                    alt="profile"
                  />
                </Link>

                <div>
                  <strong>{data.User.nickname}</strong>
                  <span>안녕하세요.</span>
                </div>
              </div>
              <Button>팔로우</Button>
            </div>
            <hr />

            {/* //* 게시글 댓글 */}
            <section className="comment" id="comment">
              <PostComment blogId={data.blog_id} />
              <div className="comment__title-box">
                <span className="title-box__title">댓글</span>
                <span className="title-box__count">{data.comments.length}</span>
              </div>
              <ul>
                {data.comments.map((comment) => {
                  return (
                    <div key={comment.comment_id}>
                      <Comment comment={comment} />
                    </div>
                  );
                })}
              </ul>
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default PostDetail;
