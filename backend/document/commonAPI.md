# 파일 업로드 API

-   **URL**: `/api/common/upload`
-   **Method**: `POST`
-   **ContentType**: `multipart/form-data`
-   **필요한 필드**:
    -   `file`: 업로드할 파일. 이미지 파일만 허용되며, 파일 크기는 5MB를 초과할 수 없습니다.
-   **Status Codes**:
    -   `201 Created`: 파일 업로드 성공. 파일 경로를 반환합니다.
    -   `400 Bad Request`: 파일 업로드 실패. 파일이 없거나, 허용되지 않는 파일 형식, 또는 파일 크기 제한을 초과한 경우입니다.
    -   `500 Internal Server Error`: 서버 측 에러로 파일 업로드에 실패한 경우.

### 성공 응답 예시

```json
{
	"filePath": "public/upload/images/20230101-example.jpg",
	"message": "파일 업로드 성공"
}
```

### 실패 응답 예시

```json
{
	"message": "파일이 없습니다."
}
```

### 추가 정보

-   업로드된 파일은 public/upload/images/ 디렉토리에 저장. 파일명은 업로드 날짜와 원본 파일명을 조합하여 생성
-   이 API는 이미지 파일(image/ MIME 타입)만 허용. 다른 형식의 파일을 업로드 시도 시, 400 Bad Request 응답 반환
-   업로드 가능한 최대 파일 크기는 5MB.

# 파일 삭제 API

-   **URL**: `/api/common/delete`
-   **Method**: `DELETE`
-   **Description**: 서버에 저장된 파일을 삭제합니다.
-   **Payload**:
    -   `filePath`: 삭제할 파일의 서버 경로입니다.
-   **Success Response**:
    -   **Code**: `200 OK`
    -   **Content**:
        ```json
        {
        	"message": "파일 삭제 성공"
        }
        ```
-   **Error Response**:
    -   파일 경로가 제공되지 않거나, 지정된 파일이 서버에 존재하지 않는 경우:
        -   **Code**: `400 Bad Request` 또는 다른 적절한 에러 코드
        -   **Content**:
            ```json
            {
            	"message": "에러 메시지"
            }
            ```

## 주의 사항

-   파일 삭제 API 호출 시, 정확한 `filePath`를 요청 본문에 포함시켜야 함. `filePath`는 서버 상의 파일 위치를 정확히 지정해야 하며, 잘못된 경로를 제공할 경우 파일 삭제 실패
-   해당 API를 사용할 때는 충분한 권한 검사와 유효성 검사 수행 요구
