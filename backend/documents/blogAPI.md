## 메인 블로그 게시글 조회 API

---

-   **URL**: `/api/blog/main`
-   **Method**: `GET`
-   **설명**: 알고리즘에 의해 선정된 메인 블로그 게시글의 정보 조회
-   **Status Code**:
    -   `200 OK`: 성공적으로 메인 블로그 게시글 정보 조회.
    -   `404 Not Found`: 메인 블로그 게시글을 찾을 수 없음.
    -   `500 Internal Server Error`: 서버 오류.

## 블로그 게시글 생성 API

---

-   **URL**: `/api/blog/create`
-   **Method**: `POST`
-   **설명**: 새로운 블로그 게시글을 생성. 사용자 인증 필요
-   **Payload**: `{ blog_type_code, title, contents, preview_img }`
-   **Status Code**:
    -   `201 Created`: 게시글이 성공적으로 생성됨.
    -   `400 Bad Request`: 필수 데이터 누락 또는 잘못된 데이터 입력.
    -   `500 Internal Server Error`: 서버 오류.

## 블로그 게시글 수정 API

-   **URL**: `/api/blog/update/:bid`
-   **Method**: `PUT`
-   **설명**: 기존 블로그 게시글을 수정. 게시글의 작성자만 수정 가능
-   **Payload**: `{ title, contents, preview_img }`
-   **Status Code**:
    -   `200 OK`: 게시글이 성공적으로 수정됨.
    -   `400 Bad Request`: 요청이 잘못됨 (예: 작성자가 아님).
    -   `500 Internal Server Error`: 서버 오류.

## 단일 블로그 게시글 상세 조회 API

-   **URL**: `/api/blog/detail/:bid`
-   **Method**: `GET`
-   **설명**: 단일 블로그 게시글과 관련된 상세 정보 및 댓글, 대댓글 정보 조회. 조회수 자동 증가
-   **Status Code**:
    -   `200 OK`: 성공적으로 게시글 상세 정보 조회.
    -   `404 Not Found`: 게시글을 찾을 수 없음.
    -   `500 Internal Server Error`: 서버 오류.

## 블로그 게시글 삭제 API

-   **URL**: `/api/blog/delete/:bid`
-   **Method**: `DELETE`
-   **설명**: 블로그 게시글을 삭제. 실제로 삭제되지 않고, 상태 코드를 변경하여 삭제 처리. 게시글의 작성자만 삭제 가능
-   **Status Code**:
    -   `200 OK`: 게시글이 성공적으로 삭제 처리됨.
    -   `400 Bad Request`: 요청이 잘못됨 (예: 작성자가 아님).
    -   `500 Internal Server Error`: 서버 오류.

## 블로그 게시글 좋아요/좋아요 취소 API

-   **URL**: `/api/blog/like/:bid`
-   **Method**: `POST`
-   **설명**: 블로그 게시글에 대해 좋아요를 누르거나 이미 눌렀다면 좋아요를 취소합니다. 사용자 인증이 필요합니다.
-   **Status Code**:
    -   `200 OK`: 좋아요 또는 좋아요 취소 처리 성공.
    -   `400 Bad Request`: 존재하지 않는 게시글에 대한 요청.
    -   `500 Internal Server Error`: 서버 오류.
