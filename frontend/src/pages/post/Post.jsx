import { Await, useLoaderData } from "react-router-dom";
import PostDetail from "./PostDetail";

// * 게시글 상세 화면

const Post = () => {
  const { data } = useLoaderData();

  return <Await resolve={data}>{(loadedData) => <PostDetail data={loadedData} key={loadedData} />}</Await>;
};

export default Post;
