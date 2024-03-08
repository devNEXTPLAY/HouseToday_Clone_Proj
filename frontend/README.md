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
┣ 📂assets - _SVG 파일들_  
┃ ┣ 📜Facebook.jsx  
┃ ┣ 📜Kakao.jsx  
┃ ┣ 📜MainLogo.jsx  
┃ ┣ 📜Naver.jsx  
┃ ┗ 📜TextLogo.jsx  
┣ 📂components  
┃ ┣ 📂home  
┃ ┃ ┣ 📂css  
┃ ┃ ┃ ┣ 📜Article.scss  
┃ ┃ ┃ ┣ 📜Articles.scss  
┃ ┃ ┃ ┣ 📜Carousel.scss  
┃ ┃ ┃ ┗ 📜MainImage.scss  
┃ ┃ ┣ 📜Article.jsx  
┃ ┃ ┣ 📜Articles.jsx  
┃ ┃ ┣ 📜Carousel.jsx  
┃ ┃ ┗ 📜MainImage.jsx  
┃ ┣ 📂ui - _재사용 빈도 높은 컴포넌트들_  
┃ ┃ ┣ 📂css  
┃ ┃ ┃ ┣ 📜Button.scss  
┃ ┃ ┃ ┗ 📜Input.scss  
┃ ┃ ┣ 📜Button.jsx  
┃ ┃ ┗ 📜Input.jsx  
┃ ┣ 📂widgets - _재사용 빈도 낮은 컴포넌트들_  
┃ ┃ ┣ 📂css  
┃ ┃ ┃ ┣ 📜Header.scss  
┃ ┃ ┃ ┗ 📜SnsLogin.scss  
┃ ┃ ┣ 📜Header.jsx  
┃ ┃ ┗ 📜SnsLogin.jsx  
┃ ┗ 📂write - _텍스트 에디터_  
┃ ┃ ┣ 📂css  
┃ ┃ ┃ ┗ 📜WriteEditor.scss  
┃ ┃ ┗ 📜WriteEditor.jsx  
┣ 📂pages - _화면_
┃ ┣ 📂css  
┃ ┃ ┣ 📜Login.scss  
┃ ┃ ┣ 📜Signup.scss  
┃ ┃ ┗ 📜Write.scss  
┃ ┣ 📜Home.jsx  
┃ ┣ 📜Login.jsx  
┃ ┣ 📜Signup.jsx  
┃ ┣ 📜Write.jsx  
┃ ┗ 📜WriteModify.jsx  
┣ 📜App.jsx - _라우터 설정_
┣ 📜index.css  
┗ 📜main.jsx
