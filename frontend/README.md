# 오늘의 집 - 프로토타입

## 프로젝트 실행 순서

1. cd frontend
2. 프로젝트 설치 yarn
3. 프로젝트 실행 yarn dev
4. http://localhost:5173/

## 추가로 설치한 패키지들

- react-router-dom
- sass
- env
- TinyMCE - _텍스트 에디터_
- Swiper - _캐러셀_

## 폴더 구조

📦src
┣ 📂assets  
┃ ┣ 📜Facebook.jsx _SVG_  
┃ ┣ 📜Kakao.jsx _SVG_  
┃ ┣ 📜MainLogo.jsx _SVG_  
┃ ┣ 📜Naver.jsx _SVG_  
┃ ┣ 📜TextLogo.jsx _SVG_  
┃ ┗ 📜data.js - _더미 데이터_  
┣ 📂components  
┃ ┣ 📂community  
┃ ┣ 📂home - _메인 화면_  
┃ ┃ ┣ 📂css  
┃ ┃ ┃ ┣ 📜Article.scss  
┃ ┃ ┃ ┣ 📜Articles.scss  
┃ ┃ ┃ ┣ 📜Carousel.scss  
┃ ┃ ┃ ┗ 📜MainImage.scss  
┃ ┃ ┣ 📜Article.jsx  
┃ ┃ ┣ 📜Articles.jsx  
┃ ┃ ┣ 📜Carousel.jsx  
┃ ┃ ┗ 📜MainImage.jsx  
┃ ┣ 📂ui - _재사용 빈도가 높은 컴포넌트_  
┃ ┃ ┣ 📂css  
┃ ┃ ┃ ┣ 📜Button.scss  
┃ ┃ ┃ ┣ 📜Input.scss  
┃ ┃ ┃ ┗ 📜Loading.scss  
┃ ┃ ┣ 📜Button.jsx  
┃ ┃ ┣ 📜Input.jsx  
┃ ┃ ┗ 📜Loading.jsx  
┃ ┣ 📂widgets - _재사용 빈도가 낮은 컴포넌트_  
┃ ┃ ┣ 📂css  
┃ ┃ ┃ ┣ 📜Header.scss  
┃ ┃ ┃ ┗ 📜SnsLogin.scss  
┃ ┃ ┣ 📜Header.jsx  
┃ ┃ ┗ 📜SnsLogin.jsx  
┃ ┗ 📂write  
┃ ┃ ┣ 📂css  
┃ ┃ ┃ ┗ 📜WriteEditor.scss  
┃ ┃ ┗ 📜WriteEditor.jsx _텍스트 에디터_  
┣ 📂pages  
┃ ┣ 📂auth _사용자 인증 관련_  
┃ ┃ ┣ 📂css  
┃ ┃ ┃ ┣ 📜Login.scss  
┃ ┃ ┃ ┗ 📜Signup.scss  
┃ ┃ ┣ 📜Login.jsx  
┃ ┃ ┗ 📜Signup.jsx  
┃ ┣ 📂community _커뮤니티 관련_  
┃ ┃ ┣ 📂css  
┃ ┃ ┃ ┣ 📜Post.scss  
┃ ┃ ┃ ┗ 📜Write.scss  
┃ ┃ ┣ 📜Community.jsx  
┃ ┃ ┣ 📜Post.jsx  
┃ ┃ ┣ 📜Write.jsx  
┃ ┃ ┗ 📜WriteEdit.jsx  
┃ ┣ 📂user _사용자 설정_  
┃ ┃ ┣ 📂css  
┃ ┃ ┣ 📜EditPassword.jsx  
┃ ┃ ┣ 📜PushSetting.jsx  
┃ ┃ ┗ 📜User.jsx  
┃ ┗ 📜Home.jsx _홈_  
┣ 📜App.jsx - _라우터 설정_  
┣ 📜index.css  
┗ 📜main.jsx
