import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { Link } from "react-router-dom";

import { useInput } from "../../components/hooks/useInput";
import { FcLikePlaceholder } from "react-icons/fc";
import { CiBookmark } from "react-icons/ci";
import { HiOutlineChatBubbleBottomCenter } from "react-icons/hi2";
import { PiShareNetworkLight } from "react-icons/pi";

import Button from "../../components/ui/Button";

const PostDetail = ({ data }) => {
  const { value: commentValue, handleInputChange: handleCommentChange } = useInput("");
  const token = useSelector((state) => state.Auth.token);



  const handleComment = async () => {
    await axios({
      method: "post",
      url: "http://localhost:3005/api/comment/create",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        blog_id: data.blog_id,
        parent_id: 1,
        content: commentValue,
      },
    }).then((res) => {
      console.log("res", res);
    });
  };

  return (
    <>
      <main className="main">
        {/* //* 게시글 대표 이미지 */}
        <img className="main-image" src={data.preview_img} alt="대표 이미지" />

        <section className="post">
          {/* //* 게시글 사이드 네비게이션 */}
          <aside className="sticky-container">
            <nav className="sticky-container__inner">
              <Button className="sticky-button">
                {/* //* 북마크 아이콘 */}
                <CiBookmark />
              </Button>
              <Button className="sticky-button">
                {/* //* 좋아요 아이콘 */}
                <FcLikePlaceholder />
              </Button>
              <hr />
              <Button className="sticky-button">
                {/* //* 댓글 아이콘  */}
                <HiOutlineChatBubbleBottomCenter />
              </Button>
              <Button className="sticky-button">
                {/* //* 공유 아이콘 */}
                <PiShareNetworkLight />
              </Button>
            </nav>
          </aside>

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

            <div dangerouslySetInnerHTML={{ __html: data.contents }}>{/* //* 게시글 내용 섹션 제목 */}</div>

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
            <section className="comment">
              <div className="comment__input">
                <textarea
                  name="content"
                  id="content"
                  placeholder="댓글을 입력해주세요"
                  rows={50}
                  value={commentValue}
                  onChange={handleCommentChange}
                ></textarea>
                <button onClick={handleComment}>입력</button>
              </div>

              {/* <div className="comment__title-box">
                  <span className="title-box__title">댓글</span>
                  <span className="title-box__count">2</span>
                </div> */}

              {/* //* 댓글단 사용자 프로필 */}
              {/* <div className="comment__user">
                  <div className="user__profile">
                    <img
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
                      alt=""
                    />
  
                    <strong>포케 먹고싶당</strong>
                  </div>
  
                  <p className="comment__text">
                    구옥을 이렇게 탈바꿈하는게 쉬운일이 아닌데 정말 대단해요! 큰돈
                    안들이고 실속있게 바꾸신 모습이 멋집니당 ㅎㅎㅎ 저역시
                    체리몰딩과 싸우는중이라.. 얼마나 구석구석 다 신경쓰셨는지
                    느껴져요 ㅜㅜ 창문은 시트지 떼시고 흰색 실리콘 다시
                    쏘신건가요?
                  </p>
  
                  <div className="user__action">
                    <span>1주</span>
                    <span>좋아요</span>
                    <span>답글 달기</span>
                    <span>신고</span>
                  </div>
                </div>
  
                <div className="comment__user">
                  <div className="user__profile">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1666919621579-2fc3f6918cf6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVEJThGJUFDJUVDJUJDJTgwfGVufDB8fDB8fHww"
                      alt=""
                    />
  
                    <strong>포케 먹고싶당</strong>
                  </div>
  
                  <p className="comment__text">
                    이 글을 읽으니 포케가 먹고싶군요!
                  </p>
  
                  <div className="user__action">
                    <span>1주</span>
                    <span>좋아요</span>
                    <span>답글 달기</span>
                    <span>신고</span>
                  </div>
                </div> */}
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default PostDetail;
