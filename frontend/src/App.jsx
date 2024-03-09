import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Community from './pages/community/Community';

// ! Auth
const Login = React.lazy(() => import('./pages/auth/Login'));
const Signup = React.lazy(() => import('./pages/auth/Signup'));

// ! Community
const Write = React.lazy(() => import('./pages/community/Write'));
const WriteEdit = React.lazy(() => import('./pages/community/WriteEdit'));
const Post = React.lazy(() => import('./pages/community/Post'));

// ! User
const User = React.lazy(() => import('./pages/user/User'));
const EditPassword = React.lazy(() => import('./pages/user/EditPassword'));
const PushSetting = React.lazy(() => import('./pages/user/PushSetting'));

// ! Home
const Home = React.lazy(() => import('./pages/Home'));

const Loading = React.lazy(() => import('./components/ui/Loading'));

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
  // * 비밀번호 수정 화면 http://localhost:5173/users/:uid/edit/password
  { path: '/users/:uid/edit/password', element: <EditPassword /> },
  // * 푸시 설정 화면 http://localhost:5173/users/:uid/push
  { path: '/users/:uid/push', element: <PushSetting /> },

  // ! Loading
  { path: '/loading', element: <Loading /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
