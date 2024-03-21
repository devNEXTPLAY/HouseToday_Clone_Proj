import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

// Layouts
import HomeLayout from "./layout/HomeLayout";
import NonAuthHomeLayout from "./layout/NonAuthHomeLayout";

// ! 사용자 인증 관련 화면
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));

// ! 게시글 설정 관련 화면
const Community = lazy(() => import("./pages/community/Community"));
const Write = lazy(() => import("./pages/community/Write"));
const WriteEdit = lazy(() => import("./pages/community/WriteEdit"));
const Post = lazy(() => import("./pages/community/Post"));

const HousewraimngParty = lazy(() =>
  import("./pages/housewarming-party/HousewarmingParty")
);

const HousePhoto = lazy(() => import("./pages/house-photo/HousePhoto"));

// ! 사용자 설정 관련 화면
const User = lazy(() => import("./pages/user/User"));
const Setting = lazy(() => import("./pages/user/Setting"));

// ! 홈 화면
const Home = lazy(() => import("./pages/Home"));

const Loading = lazy(() => import("./components/ui/Loading"));

const router = createBrowserRouter([
  // ! 사용자 인증 관련 화면
  // * 로그인 화면 http://localhost:5173/login
  { path: "/login", element: <Login /> },
  // * 회원가입 화면 http://localhost:5173/signup
  { path: "/signup", element: <Signup /> },

  // ! 홈 화면
  {
    index: "/",
    element: <HomeLayout />,
    children: [
      // * 홈 화면 http://localhost:5173/
      { index: true, element: <Home /> },
      // * 집들이 화면 http://localhost:5173/housewarming_party
      { path: "housewarming_party", element: <HousewraimngParty /> },
      // * 집 사진 화면 http://localhost:5173/house_photo
      { path: "house_photo", element: <HousePhoto /> },
      // * 글 목록 화면 http://localhost:5173/comunity
      { path: "community", element: <Community /> },
    ],
  },

  // ! 게시글 관련
  // * 글쓰기 화면 http://localhost:5173/write
  { path: "/write", element: <Write /> },
  // * 글 수정 화면 http://localhost:5173/write/edit/:aid
  { path: "/write/edit/:aid", element: <WriteEdit /> },

  // * 글 읽기 화면 http://localhost:5173/post/:aid
  { path: "/post/:aid", element: <Post /> },

  // ! 사용자 설정 관련 화면
  // * 마이페이지 화면 http://localhost:5173/users/:uid
  { path: "/users/:uid", element: <User /> },
  // * 설정 화면 http://localhost:5173/users/:uid/push
  { path: "/users/:uid/edit", element: <Setting /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
