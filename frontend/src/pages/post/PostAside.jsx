import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

// 아이콘
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { HiOutlineChatBubbleBottomCenter } from "react-icons/hi2";
import { PiShareNetworkLight } from "react-icons/pi";

import Button from "../../components/ui/Button";

import classes from "./css/PostAside.module.css";

const PostAside = ({ blogId }) => {
  const token = useSelector((state) => state.Auth.token);

  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    const getLike = async () => {
      axios({
        method: "get",
        url: `http://localhost:3005/api/users/like/${blogId}`,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setIsLike(res.data);
        })
        .catch((err) => console.log(err));
    };
    getLike();
  }, [token, blogId]);

  const handleLike = () => {
    axios({
      method: "post",
      url: "http://localhost:3005/api/blog/like/" + blogId,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }).then(() => setIsLike((prevIsLike) => !prevIsLike));
  };

  return (
    <aside className={classes.absolute}>
      <nav className={classes.sticky}>
        <div className={classes.auth}>
          <Button className={classes["sticky-button"]} onClick={handleLike}>
            {/* //* 좋아요 아이콘 */}
            {isLike ? <FaHeart /> : <CiHeart />}
            {!token && <Link to="/login"></Link>}
          </Button>
        </div>

        <hr />
        <a className={classes["sticky-button"]} href="#content">
          {/* //* 댓글 아이콘  */}
          <HiOutlineChatBubbleBottomCenter />
        </a>
        <Button className={classes["sticky-button"]}>
          {/* //* 공유 아이콘 */}
          <PiShareNetworkLight />
        </Button>
      </nav>
    </aside>
  );
};

export default PostAside;
