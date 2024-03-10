## 로그인 API

-   **URL**: `/api/users/login`
-   **Method**: `POST`
-   **Status Codes**:
    -   `200 OK`: 로그인 성공
    -   `404 Not Found`: 존재하지 않는 사용자
    -   `400 Bad Request`: 비밀번호가 일치하지 않음
    -   `500 Internal Server Error`: 서버 에러
-   **Payload**: `{ email, password }`
-   **Return**: 성공 시 JWT 토큰 반환, 실패 시 메시지 반환
    -   **Token**: JWT 토큰은 `{ id, email }` 정보를 포함하며, 유효 시간은 1시간

## 회원가입 API

-   **URL**: `/api/users/register`
-   **Method**: `POST`
-   **Status Codes**:
    -   `201 Created`: 회원가입 성공
    -   `400 Bad Request`: 이미 존재하는 사용자
    -   `500 Internal Server Error`: 서버 에러
-   **Payload**: `{ email, password, nickname, agree_marketing, agree_promotion }`
-   **Return**: 성공 또는 실패 메시지 반환

## 회원탈퇴 API

-   **URL**: `/api/users/withdrawal`
-   **Method**: `DELETE`
-   **Status Codes**:
    -   `200 OK`: 회원탈퇴 성공
    -   `400 Bad Request`: 존재하지 않는 사용자 혹은 비밀번호 불일치
    -   `500 Internal Server Error`: 서버 에러
-   **Payload**: `{ password }`
-   **Return**: 성공 또는 실패 메시지 반환

## 회원정보 수정 API

-   **URL**: `/api/users/modify`
-   **Method**: `POST`
-   **Status Codes**:
    -   `200 OK`: 회원정보 수정 성공
    -   `400 Bad Request`: 필수 정보 누락
    -   `500 Internal Server Error`: 서버 에러
-   **Payload**: `{ nickname, agree_marketing, agree_promotion, phone, address, profile_img, birth_date }`
-   **Return**: 성공 또는 실패 메시지 반환
-   **Authentication Required**: Yes (`isLoggedIn` 미들웨어 사용)
-   **주의 사항**: `email`은 수정할 수 없음 / 빈 값은 ''로 전송 필수

## 비밀번호 수정 API

-   **URL**: `/api/users/password`
-   **Method**: `POST`
-   **Status Codes**:
    -   `200 OK`: 비밀번호 수정 성공
    -   `400 Bad Request`: 존재하지 않는 사용자, 비밀번호 불일치, 기존 비밀번호와 동일함
    -   `500 Internal Server Error`: 서버 에러
-   **Payload**: `{ password, newPassword }`
-   **Return**: 성공 또는 실패 메시지 반환
-   **Authentication Required**: Yes (`isLoggedIn` 미들웨어 사용)

## 주의 사항

-   로그인 및 회원정보 수정, 비밀번호 수정 API는 패스포트 인증된 사용자만 접근 가능
-   인증 시, JWT 토큰을 Header에 포함하여 요청
-   회원정보 수정 및 비밀번호 수정 API에서는 변경하고자 하는 정보만 전송, 빈 값은 ''로 전송
