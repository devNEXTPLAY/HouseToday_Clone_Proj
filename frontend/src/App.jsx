import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Login = React.lazy(() => import('./components/pages/Login'));
const Signup = React.lazy(() => import('./components/pages/Signup'));

const router = createBrowserRouter([
  // * 로그인 화면 http://localhost:5173/login
  { path: '/login', element: <Login /> },

  // * 회원가입 화면 http://localhost:5173/signup
  { path: '/signup', element: <Signup /> },
  {},
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
