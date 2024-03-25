import { Await, useLoaderData } from "react-router-dom";
import PostDetail from "./PostDetail";

import "./css/Post.scss";

// * 게시글 상세 화면

const Post = () => {
  const { data } = useLoaderData();
  console.log(data);

  return (
    <Await resolve={data}>
      {(loadedData) => <PostDetail data={loadedData} />}
    </Await>
  );
};

export default Post;
