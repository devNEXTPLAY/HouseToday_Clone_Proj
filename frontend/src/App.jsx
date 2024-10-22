import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

// ! 레아이웃
import HomeLayout from './layout/HomeLayout'
import NonAuthHomeLayout from './layout/NonAuthHomeLayout'
import MyPageLayout from './layout/MyPageLayout'
import SearchLayout from './layout/SearchLayout'

// ! 홈 화면
const Main = lazy(() => import('./pages/home/Main'))

// ! 검색 화면
const Search = lazy(() => import('./pages/search/Search'))

// ! 사용자 인증 화면
const Login = lazy(() => import('./pages/auth/Login'))
const Signup = lazy(() => import('./pages/auth/Signup'))
const Oauth = lazy(() => import('./pages/auth/Oauth'))

// ! 게시글 화면
const KnowHow = lazy(() => import('./pages/home/KnowHow'))
const HousePhoto = lazy(() => import('./pages/home/HousePhoto'))
const HousewraimngParty = lazy(() => import('./pages/home/HousewarmingParty'))
import { loaderHousewarmingParty, loaderHousePhoto, loaderKnowHow } from './pages/home/loader'

// ! 게시글 쓰기, 수정, 상세
const CreateArticle = lazy(() => import('./pages/article/CreateArticle'))
const EditArticle = lazy(() => import('./pages/article/EditArticle'))
const Article = lazy(() => import('./pages/article/Article'))
import { loaderArticle } from './pages/article/loader'

// ! 사용자 설정 관련 화면
const MyPageSideLayout = lazy(() => import('./layout/MyPageSideLayout'))
const UserSetting = lazy(() => import('./pages/mypage/UserSetting'))
const UserArticles = lazy(() => import('./pages/mypage/UserArticles'))
const UserLikeArticle = lazy(() => import('./pages/mypage/UserLikeArticle'))

const queryClient = new QueryClient()

// 인증 여부에 따라 레이아웃 변경
const Layout = () => {
    const loggedIn = useSelector((state) => !!state.Auth.token)
    console.log('token', loggedIn)
    return loggedIn ? <HomeLayout /> : <NonAuthHomeLayout />
}

const router = createBrowserRouter([
    // ! 홈 화면
    {
        index: '/',
        children: [
            // ! 사용자 인증 관련 화면
            // * 로그인 화면 http://localhost:5173/login
            { path: 'login', element: <Login /> },
            // * 회원가입 화면 http://localhost:5173/signup
            { path: 'signup', element: <Signup /> },
            // * 카카오 로그인 화면 http://localhost:5173/oauth
            { path: 'oauth', element: <Oauth /> },

            // ! 홈 화면
            {
                element: <Layout />,
                children: [
                    // * 홈 화면 http://localhost:5173/
                    { index: true, element: <Main /> },
                    // * 집들이 화면 http://localhost:5173/housewarming_party
                    {
                        path: 'housewarming_party',
                        element: <HousewraimngParty />,
                        loader: loaderHousewarmingParty,
                    },
                    // * 집 사진 화면 http://localhost:5173/house_photo
                    { path: 'house_photo', element: <HousePhoto />, loader: loaderHousePhoto },
                    // * 노하우 화면 http://localhost:5173/know_how
                    { path: 'know_how', element: <KnowHow />, loader: loaderKnowHow },
                ],
            },
            // ! 검색 화면
            {
                path: 'search',
                element: <SearchLayout />,
                children: [
                    // * 검색 화면 http://localhost:5173/search
                    { index: true, element: <Search /> },
                ],
            },

            // ! 사용자 설정 관련 화면
            // * 글 읽기 화면 http://localhost:5173/post/:aid
            {
                path: 'post/:id',
                element: <Layout />,
                children: [{ index: true, element: <Article />, loader: loaderArticle }],
            },

            {
                path: 'users/:uid',
                element: <MyPageLayout />,
                children: [
                    // * 마이페이지 화면 http://localhost:5173/users/:uid
                    {
                        path: '',
                        element: <MyPageSideLayout />,

                        children: [
                            // * 마이페이지 화면 http://localhost:5173/users/:uid
                            { path: '', element: <UserArticles /> },
                            // * 좋아요 화면 http://localhost:5173/users/:uid/likes
                            { path: 'likes', element: <UserLikeArticle /> },
                        ],
                    },

                    // * 설정 화면 http://localhost:5173/users/:uid/push
                    { path: 'edit', element: <UserSetting /> },
                ],
            },

            // ! 게시글 쓰기, 수정
            {
                path: 'write',
                children: [
                    // * 글쓰기 화면 http://localhost:5173/write
                    { path: '', element: <CreateArticle /> },
                    // * 글 수정 화면 http://localhost:5173/write/edit/:aid
                    { path: 'edit/:id', element: <EditArticle /> },
                ],
            },
        ],
    },
])

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}

export default App
