import './css/Post.scss';

import { Link } from 'react-router-dom';

import Header from '../../components/widgets/Header';
import Button from '../../components/ui/Button';

// Icon
import { FcLikePlaceholder } from 'react-icons/fc';
import { CiBookmark } from 'react-icons/ci';
import { HiOutlineChatBubbleBottomCenter } from 'react-icons/hi2';
import { PiShareNetworkLight } from 'react-icons/pi';

const Post = () => {
  return (
    <>
      <Header />

      <main className='main'>
        <nav>
          <Button>
            <CiBookmark />
          </Button>
          <Button>
            <FcLikePlaceholder />
          </Button>
          <hr />
          <Button>
            <HiOutlineChatBubbleBottomCenter />
          </Button>
          <Button>
            <PiShareNetworkLight />
          </Button>
        </nav>

        <section className='post'>
          <img
            src='https://plus.unsplash.com/premium_photo-1676320103037-fae0b1d3668d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8'
            alt='대표 이미지'
          />

          <h2>lorem</h2>

          <div className='information-user'>
            <div className='information-user__profile'>
              <Link to='/'>
                <img
                  src='https://images.unsplash.com/photo-1638996970429-389100ca2b48?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D'
                  alt='profile'
                />
              </Link>

              <div>
                <strong>작성자</strong>
                <span>Lorem ipsum dolor sit,</span>
              </div>
            </div>

            <Button>팔로우</Button>
          </div>

          <div>
            <h3> Lorem ipsum dolor </h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
              libero assumenda quod voluptatibus architecto perferendis sunt
              eius, amet repellat. Laboriosam, voluptas quisquam alias explicabo
              necessitatibus assumenda recusandae! Hic, ratione labore.
            </p>
          </div>

          <div>
            <h3>amet consectetur adipisicing elit.</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
              libero assumenda quod voluptatibus architecto perferendis sunt
              eius, amet repellat. Laboriosam, voluptas quisquam alias explicabo
              necessitatibus assumenda recusandae! Hic, ratione labore.
            </p>
          </div>

          <img
            className='warning'
            src='https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/170130919448597544.png?w=720'
            alt='Warning'
          />

          <div className='information-post'>
            <span>2023.12.21</span>
            <span>좋아요229</span>
            <span>스크랩770</span>
            <span>조회32,509</span>

            <Link>신고하기</Link>
            <hr />
          </div>

          <div className='information-user'>
            <div className='information-user__profile'>
              <Link to='/'>
                <img
                  src='https://images.unsplash.com/photo-1638996970429-389100ca2b48?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D'
                  alt='profile'
                />
              </Link>

              <div>
                <strong>작성자</strong>
                <span>Lorem ipsum dolor sit,</span>
              </div>
            </div>
            <Button>팔로우</Button>
          </div>

          <section className='comment'>
            <div className='comment__title-box'>
              <span className='title-box__title'>댓글</span>
              <span className='title-box__count'>2</span>
            </div>

            <div className='comment__user'>
              <div className='user__profile'>
                <img
                  src='https://images.unsplash.com/photo-1709403343088-732c888fdc6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8'
                  alt=''
                />

                <strong>포케 먹고싶당</strong>
              </div>

              <p className='comment__text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                distinctio natus, nisi ipsam minima rem optio qui enim
                cupiditate quo, ducimus nemo quas dolores velit odio repellat
                illum possimus voluptas.
              </p>

              <div className='user__action'>
                <span>1주</span>
                <span>좋아요</span>
                <span>답글 달기</span>
                <span>신고</span>
              </div>
            </div>

            <div className='comment__user'>
              <div className='user__profile'>
                <img
                  src='https://images.unsplash.com/photo-1709403343088-732c888fdc6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8'
                  alt=''
                />

                <strong>포케 먹고싶당</strong>
              </div>

              <p className='comment__text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                distinctio natus, nisi ipsam minima rem optio qui enim
                cupiditate quo, ducimus nemo quas dolores velit odio repellat
                illum possimus voluptas.
              </p>

              <div className='user__action'>
                <span>1주</span>
                <span>좋아요</span>
                <span>답글 달기</span>
                <span>신고</span>
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

export default Post;
