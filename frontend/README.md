# 오늘의 집 - 프로토타입

## 프로젝트 실행 순서

1. cd frontend
2. 프로젝트 설치 yarn
3. 프로젝트 실행 yarn dev
4. http://localhost:5173/

## 추가로 설치한 패키지들

- react-router-dom
- sass

## 폴더 구조

📦src  
┣ 📂assets - _SVG 파일 (Facbook, Kakao, MainLogo, Naver)_  
┃ ┣ 📜Facebook.jsx  
┃ ┣ 📜Kakao.jsx  
┃ ┣ 📜MainLogo.jsx  
┃ ┗ 📜Naver.jsx  
┣ 📂components  
┃ ┣ 📂ui - _재사용 빈도가 높은 컴포넌트_  
┃ ┃ ┣ 📂css  
┃ ┃ ┃ ┣ 📜Button.scss  
┃ ┃ ┃ ┗ 📜Input.scss  
┃ ┃ ┣ 📜Button.jsx  
┃ ┃ ┗ 📜Input.jsx  
┃ ┗ 📂widgets - _재사용 빈도가 낮은 컴포넌트_  
┃ ┃ ┣ 📂css  
┃ ┃ ┃ ┗ 📜SnsLogin.scss  
┃ ┃ ┗ 📜SnsLogin.jsx  
┣ 📂pages  
┃ ┣ 📂css  
┃ ┃ ┣ 📜Login.scss  
┃ ┃ ┗ 📜Signup.scss  
┃ ┣ 📜Login.jsx  
┃ ┗ 📜Signup.jsx  
┣ 📜App.jsx - _라우터 설정_  
┣ 📜index.css  
┗ 📜main.jsx
