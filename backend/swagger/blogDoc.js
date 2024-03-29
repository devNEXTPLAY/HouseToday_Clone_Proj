
// 메인 블로그 글 조회
/**
 * @swagger
 * /main:
 *   get:
 *     summary: 메인 블로그 글 조회
 *     description: 홈페이지에 표시되는 메인 블로그 글을 포함하여, 블로그의 ID, 제목, 미리보기 이미지, 작성자의 닉네임 및 프로필 사진을 가져옵니다.
 *     responses:
 *       200:
 *         description: 작성자 정보를 포함한 단일 블로그 글.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blog_id:
 *                   type: integer
 *                   description: 블로그 글의 고유 ID입니다.
 *                 title:
 *                   type: string
 *                   description: 블로그 글의 제목입니다.
 *                 preview_img:
 *                   type: string
 *                   description: 블로그 글의 미리보기 이미지 URL입니다.
 *                 nickname:
 *                   type: string
 *                   description: 작성자의 닉네임입니다.
 *                 profile_img:
 *                   type: string
 *                   description: 작성자의 프로필 이미지 URL입니다.
 *       404:
 *         description: 메인 블로그 글을 찾을 수 없습니다.
 */

// 추천 블로그 글 조회
/**
 * @swagger
 * /api/blog/recommended:
 *   get:
 *     summary: 추천 블로그 글
 *     description: 집들이, 집 사진에서 추천 글 4개씩 반환.
 *     responses:
 *       200:
 *         description: 추천 글 반환 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 housewarming:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       blog_id:
 *                         type: integer
 *                         description: 고유 ID.
 *                       title:
 *                         type: string
 *                         description: 제목.
 *                       preview_img:
 *                         type: string
 *                         description: 미리보기 이미지 URL.
 *                       nickname:
 *                         type: string
 *                         description: 작성자 닉네임.
 *                 photo_video:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       blog_id:
 *                         type: integer
 *                         description: 고유 ID.
 *                       title:
 *                         type: string
 *                         description: 제목.
 *                       preview_img:
 *                         type: string
 *                         description: 미리보기 이미지 URL.
 *                       nickname:
 *                         type: string
 *                         description: 작성자 닉네임.
 *       404:
 *         description: 추천 글 없음.
 *       500:
 *         description: 서버 에러.
 */

// 블로그 글 목록 조회
/**
 * @swagger
 * /api/blog/list/{type}:
 *   get:
 *     summary: 게시판별 블로그 글 목록
 *     description: 집들이, 노하우, 사진/영상 카테고리별 블로그 글 조회. 해시태그, 베스트 댓글 포함.
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시판 코드 (0: 집들이, 1: 노하우, 2: 사진/영상).
 *       - in: query
 *         name: code
 *         required: false
 *         schema:
 *           type: integer
 *         description: 정렬 코드 (0: 최신순, 1: 좋아요순).
 *     responses:
 *       200:
 *         description: 블로그 글 목록 반환 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   blog_id:
 *                     type: integer
 *                     description: 고유 ID.
 *                   title:
 *                     type: string
 *                     description: 제목.
 *                   preview_img:
 *                     type: string
 *                     description: 미리보기 이미지 URL.
 *                   contents:
 *                     type: string
 *                     description: 내용.
 *                   nickname:
 *                     type: string
 *                     description: 작성자 닉네임.
 *                   profile_img:
 *                     type: string
 *                     description: 작성자 프로필 이미지 URL.
 *                   intro_msg:
 *                     type: string
 *                     description: 작성자 소개 메시지.
 *                   view_count:
 *                     type: integer
 *                     description: 조회수.
 *                   like_count:
 *                     type: integer
 *                     description: 좋아요 수.
 *                   comment_count:
 *                     type: integer
 *                     description: 댓글 수.
 *                   reg_date:
 *                     type: string
 *                     format: date-time
 *                     description: 등록 날짜.
 *                   hashtag:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: 연관 해시태그.
 *                   best_comment:
 *                     type: object
 *                     properties:
 *                       content:
 *                         type: string
 *                         description: 베스트 댓글 내용.
 *                       nickname:
 *                         type: string
 *                         description: 베스트 댓글 작성자 닉네임.
 *       404:
 *         description: 글 목록 없음.
 *       500:
 *         description: 서버 에러.
 */

// 블로그 글 추가
/**
 * @swagger
 * /api/blog/create:
 *   post:
 *     summary: 블로그 글 추가
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blog_type_code:
 *                 type: integer
 *                 description: 블로그 타입 코드.
 *               title:
 *                 type: string
 *                 description: 제목.
 *               contents:
 *                 type: string
 *                 description: 내용.
 *               preview_img:
 *                 type: string
 *                 description: 미리보기 이미지 URL.
 *               hashtags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 해시태그.
 *     responses:
 *       201:
 *         description: 블로그 글 등록 성공. 블로그 ID 반환.
 *       400:
 *         description: 잘못된 요청. 필수 입력 항목 누락.
 *       500:
 *         description: 서버 에러. 글 등록 실패.
 */

// 블로그 글 수정
/**
 * @swagger
 * /api/blog/update/{bid}:
 *   put:
 *     summary: 블로그 글 수정
 *     description: 블로그 글의 제목, 내용, 미리보기 이미지 및 해시태그를 수정. 로그인 및 해당 글 작성자만 가능.
 *     parameters:
 *       - in: path
 *         name: bid
 *         required: true
 *         schema:
 *           type: integer
 *         description: 블로그 글의 고유 ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 수정할 제목.
 *               contents:
 *                 type: string
 *                 description: 수정할 내용.
 *               preview_img:
 *                 type: string
 *                 description: 수정할 미리보기 이미지 URL.
 *               hashtags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 수정할 해시태그 배열.
 *     responses:
 *       200:
 *         description: 블로그 글 수정 성공.
 *       400:
 *         description: 존재하지 않는 글이거나 작성자가 아님.
 *       500:
 *         description: 서버 에러.
 */

// 단일 블로그 글 조회
/**
 * @swagger
 * /api/blog/detail/{bid}:
 *   get:
 *     summary: 단일 블로그 글 조회
 *     description: 블로그 글의 상세 정보, 댓글 및 대댓글, 해시태그 포함. 조회 시 조회수 증가.
 *     parameters:
 *       - in: path
 *         name: bid
 *         required: true
 *         schema:
 *           type: integer
 *         description: 블로그 글의 고유 ID.
 *     responses:
 *       200:
 *         description: 블로그 글 조회 성공. 상세 정보 반환.
 *       404:
 *         description: 존재하지 않는 글.
 *       500:
 *         description: 서버 에러.
 */

// 블로그 글 삭제
/**
 * @swagger
 * /api/blog/delete/{bid}:
 *   delete:
 *     summary: 블로그 글 삭제
 *     description: 작성자만 블로그 글의 상태코드를 변경하여 삭제 처리. 실제 데이터는 삭제되지 않음.
 *     parameters:
 *       - in: path
 *         name: bid
 *         required: true
 *         schema:
 *           type: integer
 *         description: 블로그 글의 고유 ID.
 *     responses:
 *       200:
 *         description: 블로그 글 삭제 성공. 상태코드 변경됨.
 *       400:
 *         description: 존재하지 않는 글이거나 작성자가 아님.
 *       500:
 *         description: 서버 에러.
 */

// 블로그 글 좋아요
/**
 * @swagger
 * /api/blog/like/{bid}:
 *   post:
 *     summary: 블로그 좋아요
 *     description: 좋아요 안 눌렀을 경우 추가, 눌렀을 경우 취소. 로그인 필요.
 *     parameters:
 *       - in: path
 *         name: bid
 *         required: true
 *         schema:
 *           type: integer
 *         description: 좋아요 처리할 블로그 글의 고유 ID.
 *     responses:
 *       200:
 *         description: 좋아요 처리 성공.
 *       400:
 *         description: 존재하지 않는 글.
 *       500:
 *         description: 서버 에러.
 */

// 블로그 글 좋아요 누른 사용자 조회
/**
 * @swagger
 * /api/blog/likes/{bid}:
 *   get:
 *     summary: 좋아요 누른 사용자 조회
 *     description: 단일 블로그를 좋아요 누른 사용자 목록 반환.
 *     parameters:
 *       - in: path
 *         name: bid
 *         required: true
 *         schema:
 *           type: integer
 *         description: 블로그 글의 고유 ID.
 *     responses:
 *       200:
 *         description: 좋아요 누른 사용자 목록 반환 성공.
 *       404:
 *         description: 좋아요 누른 사용자 없음.
 *       500:
 *         description: 서버 에러.
 */

// 블로그 글 검색
/**
 * @swagger
 * /api/blog/search:
 *   get:
 *     summary: 블로그 글 검색
 *     description: 제목, 내용, 해시태그를 통한 블로그 글 검색.
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *         description: 검색 키워드.
 *     responses:
 *       200:
 *         description: 검색 결과 반환 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   blog_id:
 *                     type: integer
 *                     description: 블로그 글 고유 ID.
 *                   title:
 *                     type: string
 *                     description: 제목.
 *                   preview_img:
 *                     type: string
 *                     description: 미리보기 이미지 URL.
 *                   nickname:
 *                     type: string
 *                     description: 작성자 닉네임.
 *                   hashtag:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: 연관 해시태그.
 *       404:
 *         description: 검색 결과 없음.
 *       500:
 *         description: 서버 에러.
 */








