## 댓글 API 명세서

### 댓글 추가 API

-   **URL**: `/api/comment/create`
-   **Method**: `POST`
-   **Status Codes**:
    -   `201 Created`: 댓글 추가 성공
    -   `400 Bad Request`: 존재하지 않는 블로그 글이거나 필수 정보 누락
    -   `500 Internal Server Error`: 서버 에러
-   **Payload**: `{ blog_id, parent_id (optional), contents }`
-   **Return**: 성공 또는 실패 메시지 반환
-   **Authentication Required**: 예 (`isLoggedIn` 미들웨어 사용)

### 댓글 수정 API

---

-   **URL**: `/api/comment/update`
-   **Method**: `PATCH`
-   **Status Codes**:
    -   `200 OK`: 댓글 수정 성공
    -   `400 Bad Request`: 존재하지 않는 댓글이거나 권한이 없음
    -   `500 Internal Server Error`: 서버 에러
-   **Payload**: `{ comment_id, contents }`
-   **Return**: 성공 또는 실패 메시지 반환
-   **Authentication Required**: 예 (`isLoggedIn` 미들웨어 사용)
-   **주의 사항**: 수정할 댓글의 ID와 새로운 내용을 전송해야 함

### 댓글 삭제 API

---

-   **URL**: `/api/comment/delete/:cid`
-   **Method**: `DELETE`
-   **Status Codes**:
    -   `200 OK`: 댓글 삭제 (Soft Delete) 성공
    -   `400 Bad Request`: 존재하지 않는 댓글이거나 권한이 없음
    -   `500 Internal Server Error`: 서버 에러
-   **Return**: 성공 또는 실패 메시지 반환
-   **Authentication Required**: 예 (`isLoggedIn` 미들웨어 사용)
-   **주의 사항**: `comment_status_code`를 사용하여 Soft Delete 구현

### 댓글 좋아요 API

---

-   **URL**: `/api/comment/like`
-   **Method**: `POST`
-   **Status Codes**:
    -   `200 OK`: 좋아요 추가 또는 취소 성공
    -   `400 Bad Request`: 존재하지 않는 댓글
    -   `500 Internal Server Error`: 서버 에러
-   **Payload**: `{ comment_id }`
-   **Return**: 성공 또는 실패 메시지 반환
-   **Authentication Required**: 예 (`isLoggedIn` 미들웨어 사용)
-   **주의 사항**: 댓글에 대한 좋아요는 사용자가 이미 누른 경우 좋아요를 취소하고, 그렇지 않은 경우 좋아요를 추가

### 주의 사항

---

-   모든 API는 인증된 사용자만 접근 가능. JWT 토큰을 Header에 포함하여 요청해야 함
-   댓글 추가, 수정, 삭제 API는 해당 댓글 또는 블로그 글에 대한 권한이 있는 사용자만 사용 가능.
-   댓글 삭제는 Soft Delete 방식을 사용하여 데이터베이스에서 실제로 데이터를 삭제하지 않고, 삭제된 것처럼 처리.
