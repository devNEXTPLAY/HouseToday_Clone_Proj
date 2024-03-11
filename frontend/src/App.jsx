import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Community from './pages/community/Community';

// ! Auth
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));

// ! Community
const Write = lazy(() => import('./pages/community/Write'));
const WriteEdit = lazy(() => import('./pages/community/WriteEdit'));
const Post = lazy(() => import('./pages/community/Post'));

// ! User
const User = lazy(() => import('./pages/user/User'));
const Setting = lazy(() => import('./pages/user/Setting'));

// ! Home
const Home = lazy(() => import('./pages/Home'));

const Loading = lazy(() => import('./components/ui/Loading'));

const router = createBrowserRouter([
  // ! Home
  { path: '/', element: <Home /> },

  // ! Auth
  // * 로그인 화면 http://localhost:5173/login
  { path: '/login', element: <Login /> },
  // * 회원가입 화면 http://localhost:5173/signup
  { path: '/signup', element: <Signup /> },

  // ! Community
  // * 글쓰기 화면 http://localhost:5173/write
  { path: '/write', element: <Write /> },
  // * 글 수정 화면 http://localhost:5173/write/edit/:aid
  { path: '/write/edit/:aid', element: <WriteEdit /> },
  // * 글 읽기 화면 http://localhost:5173/post/:aid
  { path: '/post/:aid', element: <Post /> },
  // * 글 목록 화면 http://localhost:5173/comunity
  { path: '/community', element: <Community /> },

  // ! User
  // * 마이페이지 화면 http://localhost:5173/users/:uid
  { path: '/users/:uid', element: <User /> },
  // * 설정 화면 http://localhost:5173/users/:uid/push
  { path: '/users/:uid/edit', element: <Setting /> },

  // ! Loading
  { path: '/loading', element: <Loading /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
