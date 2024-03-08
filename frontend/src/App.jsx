import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Login = React.lazy(() => import('./pages/Login'));

const router = createBrowserRouter([
  // * 로그인 화면 http://localhost:5173/login
  { path: '/login', element: <Login /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
