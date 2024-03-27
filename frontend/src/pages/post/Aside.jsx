import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

import { HiOutlineChatBubbleBottomCenter } from "react-icons/hi2";
import { PiShareNetworkLight } from "react-icons/pi";

import Button from "../../components/ui/Button";

const Aside = ({ blogId }) => {
  const token = useSelector((state) => state.Auth.token);

  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    const getLike = async () => {
      // http://localhost:3005/api/users/likes
      axios({
        method: "get",
        url: "http://localhost:3005/api/users/likes",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res=> {
        const getLikePost = res.data.filter((like) => like.blog_id === blogId).length
        if(getLikePost >= 1) {
          setIsLike(true);
          return false;
        } 
        if(getLikePost <= 0) {
          setIsLike(false);
          return false;
        } 
      }
        
        ).catch((err) => {
        console.log(err);
      });
    };
    getLike();
  }, [token, blogId]);

  //   http://localhost:3005/api/blog/like/:bid
  const handleLike = () => {
    axios({
      method: "post",
      url: "http://localhost:3005/api/blog/like/" + blogId,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }).then(() => 
      setIsLike(prevIsLike => !prevIsLike)
    );
  };

  return (
    <aside className="sticky-container">
      <nav className="sticky-container__inner">
        <Button className="sticky-button" onClick={handleLike}>
          {/* //* 좋아요 아이콘 */}
          {isLike ? <FaHeart /> : <CiHeart />}
        </Button>
        <hr />
        <a className="sticky-button" href="#content">
          {/* //* 댓글 아이콘  */}
          <HiOutlineChatBubbleBottomCenter />
        </a>
        <Button className="sticky-button">
          {/* //* 공유 아이콘 */}
          <PiShareNetworkLight />
        </Button>
      </nav>
    </aside>
  );
};

export default Aside;
