# 오늘의 집 - 프로토타입

## 프로젝트 실행 순서

1. cd frontend
2. 프로젝트 설치 yarn
3. 프로젝트 실행 yarn dev
4. http://localhost:5173/

## 추가로 설치한 패키지들

-   react-router-dom
-   sass
-   env
-   TinyMCE - _텍스트 에디터_
-   Swiper - _캐러셀_

## 폴더 구조

📦src
┣ 📂assets
┃ ┣ 📜Facebook.jsx
┃ ┣ 📜Kakao.jsx
┃ ┣ 📜MainLogo.jsx
┃ ┣ 📜Naver.jsx
┃ ┗ 📜TextLogo.jsx
┣ 📂components
┃ ┣ 📂article | 게시글 등록, 삭제, 상세 하위 컴포넌트
┃ ┃ ┣ 📂css
┃ ┃ ┃ ┣ 📜ArticleAside.module.css
┃ ┃ ┃ ┣ 📜ArticleComments.module.css
┃ ┃ ┃ ┣ 📜ArticleDetail.module.css
┃ ┃ ┃ ┣ 📜ArticleMobileNav.module.css
┃ ┃ ┃ ┣ 📜ArticleWriter.module.css
┃ ┃ ┃ ┣ 📜CreateArticleGuide.module.css
┃ ┃ ┃ ┣ 📜Form.module.css
┃ ┃ ┃ ┣ 📜Hashtag.module.css
┃ ┃ ┃ ┗ 📜MainImage.module.css
┃ ┃ ┣ 📜ArticleAside.jsx
┃ ┃ ┣ 📜ArticleCommentInput.jsx
┃ ┃ ┣ 📜ArticleComments.jsx
┃ ┃ ┣ 📜ArticleDetail.jsx
┃ ┃ ┣ 📜ArticleMobileNav.jsx
┃ ┃ ┣ 📜ArticleReplyInput.jsx
┃ ┃ ┣ 📜ArticleWriter.jsx
┃ ┃ ┣ 📜CreateArticleGuide.jsx
┃ ┃ ┣ 📜CreateForm.jsx
┃ ┃ ┣ 📜CreateHashtag.jsx
┃ ┃ ┣ 📜CreateMainImage.jsx
┃ ┃ ┣ 📜EditForm.jsx
┃ ┃ ┣ 📜EditHashtag.jsx
┃ ┃ ┗ 📜EditMainImage.jsx
┃ ┣ 📂home
┃ ┃ ┣ 📂css
┃ ┃ ┣ 📂home
┃ ┃ ┃ ┣ 📂house_photo | 집 사진 하위 컴포넌트
┃ ┃ ┃ ┃ ┣ 📂css
┃ ┃ ┃ ┃ ┃ ┣ 📜HousePhotoArticleItem.module.css
┃ ┃ ┃ ┃ ┃ ┣ 📜HousePhotoArticles.module.css
┃ ┃ ┃ ┃ ┃ ┗ 📜MobileHousePhoto.module.css
┃ ┃ ┃ ┃ ┣ 📜HousePhotoArticleItem.jsx
┃ ┃ ┃ ┃ ┣ 📜HousePhotoArticles.jsx
┃ ┃ ┃ ┃ ┗ 📜MobileHousePhoto.jsx
┃ ┃ ┃ ┣ 📂housewarming_party | 집들이 하위 컴포넌트
┃ ┃ ┃ ┃ ┣ 📂css
┃ ┃ ┃ ┃ ┃ ┣ 📜HouseWarmingPartyArticleItem.module.css
┃ ┃ ┃ ┃ ┃ ┗ 📜HouseWarmingPartyArticles.module.css
┃ ┃ ┃ ┃ ┣ 📜HouseWarmingPartyArticleItem.jsx
┃ ┃ ┃ ┃ ┗ 📜HouseWarmingPartyArticles.jsx
┃ ┃ ┃ ┣ 📂knowhow | 노하우 하위 컴포넌트
┃ ┃ ┃ ┃ ┣ 📂css
┃ ┃ ┃ ┃ ┃ ┣ 📜KnowHowArticleItem.module.css
┃ ┃ ┃ ┃ ┃ ┗ 📜KnowHowArticles.module.css
┃ ┃ ┃ ┃ ┣ 📜KnowHowArticleItem.jsx
┃ ┃ ┃ ┃ ┗ 📜KnowHowArticles.jsx
┃ ┃ ┃ ┗ 📂main | 메인 하위 컴포넌트
┃ ┃ ┃ ┃ ┣ 📂css
┃ ┃ ┃ ┃ ┃ ┣ 📜AdCarousel.module.css
┃ ┃ ┃ ┃ ┃ ┣ 📜BestHousewarmingPartyArticleItem.module.css
┃ ┃ ┃ ┃ ┃ ┣ 📜BestHousewarmingPartyArticles.module.css
┃ ┃ ┃ ┃ ┃ ┣ 📜HeroArticle.module.css
┃ ┃ ┃ ┃ ┃ ┣ 📜MobileAdCarousel.module.css
┃ ┃ ┃ ┃ ┃ ┣ 📜MobileRecommendHousePhotoArticleItem.module.css
┃ ┃ ┃ ┃ ┃ ┣ 📜RecommendHousePhotoArticleItem.module.css
┃ ┃ ┃ ┃ ┃ ┗ 📜RecommendHousePhotoArticles.module.css
┃ ┃ ┃ ┃ ┣ 📜AdCarousel.jsx
┃ ┃ ┃ ┃ ┣ 📜BestHousewarmingPartyArticleItem.jsx
┃ ┃ ┃ ┃ ┣ 📜BestHousewarmingPartyArticles.jsx
┃ ┃ ┃ ┃ ┣ 📜HeroArticle.jsx
┃ ┃ ┃ ┃ ┣ 📜MobileAdCarousel.jsx
┃ ┃ ┃ ┃ ┣ 📜MobileRecommendHousePhotoArticleItem.jsx
┃ ┃ ┃ ┃ ┣ 📜RecommendHousePhotoArticleItem.jsx
┃ ┃ ┃ ┃ ┗ 📜RecommendHousePhotoArticles.jsx
┃ ┃ ┗ 📂navigation | 홈 네비게이션 하위 컴포넌트
┃ ┃ ┃ ┣ 📂css
┃ ┃ ┃ ┃ ┣ 📜CreateButton.module.css
┃ ┃ ┃ ┃ ┣ 📜HamburgerButton.module.css
┃ ┃ ┃ ┃ ┣ 📜HamburgerNav.module.css
┃ ┃ ┃ ┃ ┣ 📜HomeLink.module.css
┃ ┃ ┃ ┃ ┣ 📜Notification.module.css
┃ ┃ ┃ ┃ ┣ 📜ProfileButton.module.css
┃ ┃ ┃ ┃ ┗ 📜SearchInput.module.css
┃ ┃ ┃ ┣ 📜CreateButton.jsx
┃ ┃ ┃ ┣ 📜HamburgerButton.jsx
┃ ┃ ┃ ┣ 📜HamburgerNav.jsx
┃ ┃ ┃ ┣ 📜HomeLink.jsx
┃ ┃ ┃ ┣ 📜NotificationButton.jsx
┃ ┃ ┃ ┣ 📜ProfileButton.jsx
┃ ┃ ┃ ┗ 📜SearchInput.jsx
┃ ┣ 📂hooks
┃ ┃ ┣ 📜useConfirm.jsx
┃ ┃ ┗ 📜useInput.jsx
┃ ┣ 📂ui
┃ ┃ ┣ 📂css
┃ ┃ ┃ ┣ 📜Button.scss
┃ ┃ ┃ ┣ 📜CommentInput.module.css
┃ ┃ ┃ ┣ 📜Confirm.module.css
┃ ┃ ┃ ┣ 📜Input.scss
┃ ┃ ┃ ┗ 📜Loading.scss
┃ ┃ ┣ 📜AgreeInput.jsx
┃ ┃ ┣ 📜Button.jsx
┃ ┃ ┣ 📜CommentInput.jsx
┃ ┃ ┣ 📜Confirm.jsx
┃ ┃ ┣ 📜Input.jsx
┃ ┃ ┣ 📜Loading.jsx
┃ ┃ ┗ 📜Loadingindicator.jsx
┃ ┗ 📂widgets | 화면 요소
┃ ┃ ┣ 📂css
┃ ┃ ┃ ┣ 📜Footer.module.css
┃ ┃ ┃ ┣ 📜HomeNavigation.module.css
┃ ┃ ┃ ┣ 📜MainSubNav.scss
┃ ┃ ┃ ┣ 📜SettingSubNav.scss
┃ ┃ ┃ ┗ 📜SnsLogin.scss
┃ ┃ ┣ 📜Footer.jsx
┃ ┃ ┣ 📜HomeNavigation.jsx
┃ ┃ ┣ 📜MainSubNav.jsx
┃ ┃ ┣ 📜NonAuthHomeNavigation.jsx
┃ ┃ ┣ 📜SettingSubNav.jsx
┃ ┃ ┗ 📜SnsLogin.jsx
┣ 📂constants
┃ ┗ 📜actionTypes.js
┣ 📂css
┃ ┣ 📜_mixin.scss
┃ ┗ 📜_variable.scss
┣ 📂layout | 레이아웃
┃ ┣ 📂css
┃ ┃ ┗ 📜MyPageSideLayout.module.css
┃ ┣ 📜HomeLayout.jsx
┃ ┣ 📜MyPageLayout.jsx
┃ ┣ 📜MyPageSideLayout.jsx
┃ ┣ 📜NonAuthHomeLayout.jsx
┃ ┗ 📜SearchLayout.jsx
┣ 📂pages
┃ ┣ 📂article | 게시글 상세, 수정, 생성 화면
┃ ┃ ┣ 📂css
┃ ┃ ┃ ┗ 📜CreateArticle.module.css
┃ ┃ ┣ 📜Article.jsx
┃ ┃ ┣ 📜CreateArticle.jsx
┃ ┃ ┣ 📜EditArticle.jsx
┃ ┃ ┗ 📜loader.jsx
┃ ┣ 📂auth
┃ ┃ ┣ 📂css
┃ ┃ ┃ ┣ 📜Login.scss
┃ ┃ ┃ ┗ 📜Signup.scss
┃ ┃ ┣ 📜Agree.jsx
┃ ┃ ┣ 📜Login.jsx
┃ ┃ ┣ 📜Oauth.jsx
┃ ┃ ┗ 📜Signup.jsx
┃ ┣ 📂home | 홈 화면 (메인, 집들이, 노하우, 사진 등)
┃ ┃ ┣ 📂css
┃ ┃ ┃ ┣ 📜HousePhoto.module.css
┃ ┃ ┃ ┣ 📜HousewarmingParty.module.css
┃ ┃ ┃ ┣ 📜KnowHow.module.css
┃ ┃ ┃ ┗ 📜Main.module.css
┃ ┃ ┣ 📜HousePhoto.jsx
┃ ┃ ┣ 📜HousewarmingParty.jsx
┃ ┃ ┣ 📜KnowHow.jsx
┃ ┃ ┣ 📜Main.jsx
┃ ┃ ┗ 📜loader.jsx
┃ ┣ 📂mypage | 사용자 마이 페이지
┃ ┃ ┣ 📂css
┃ ┃ ┃ ┣ 📜UserArticles.module.css
┃ ┃ ┃ ┣ 📜UserLikeArticle.module.css
┃ ┃ ┃ ┗ 📜UserSetting.module.css
┃ ┃ ┣ 📜UserArticles.jsx
┃ ┃ ┣ 📜UserLikeArticle.jsx
┃ ┃ ┗ 📜UserSetting.jsx
┃ ┗ 📂search
┃ ┃ ┣ 📂css
┃ ┃ ┃ ┣ 📜House.scss
┃ ┃ ┃ ┣ 📜Knowhow.scss
┃ ┃ ┃ ┣ 📜Photo.scss
┃ ┃ ┃ ┗ 📜Search.scss
┃ ┃ ┣ 📜House.jsx
┃ ┃ ┣ 📜Knowhow.jsx
┃ ┃ ┣ 📜Photo.jsx
┃ ┃ ┗ 📜Search.jsx
┣ 📂redux | 리덕스
┃ ┣ 📂auth
┃ ┃ ┣ 📜action.js
┃ ┃ ┗ 📜reducer.js
┃ ┣ 📜actions.js
┃ ┣ 📜reducers.js
┃ ┗ 📜store.js
┣ 📂util
┃ ┣ 📜formats.js
┃ ┣ 📜http.js
┃ ┗ 📜resizer.js
┣ 📜App.jsx
┣ 📜index.css
┗ 📜main.jsx
