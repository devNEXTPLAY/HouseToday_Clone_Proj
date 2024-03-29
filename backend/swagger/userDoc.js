// 사용자 로그인
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: 로그인
 *     description: 사용자 로그인. 성공 시 JWT 토큰 반환.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 사용자 이메일.
 *               password:
 *                 type: string
 *                 description: 비밀번호.
 *     responses:
 *       200:
 *         description: 로그인 성공. JWT 토큰 반환.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT 토큰.
 *                 userId:
 *                   type: integer
 *                   description: 사용자 ID.
 *                 message:
 *                   type: string
 *                   description: 성공 메시지.
 *       404:
 *         description: 존재하지 않는 사용자입니다.
 *       400:
 *         description: 비밀번호가 일치하지 않습니다.
 *       500:
 *         description: 서버 에러. 로그인 실패.
 */

// 카카오 로그인
/**
 * @swagger
 * /api/users/kakao:
 *   get:
 *     summary: 카카오 로그인
 *     description: 카카오 계정으로 로그인. 성공 시 JWT 토큰 반환.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 카카오 로그인 성공. 사용자를 토큰이 포함된 URL로 리다이렉트.
 *       500:
 *         description: 서버 에러. 로그인 실패.
 */

// 카카오 로그인 콜백
/**
 * @swagger
 * /api/users/oauth/kakao:
 *   get:
 *     summary: 카카오 로그인 콜백
 *     description: 카카오 로그인 후 콜백 처리. 성공 시 JWT 토큰 발급 및 리다이렉트.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 카카오 로그인 콜백 처리 성공. 토큰 발급 및 리다이렉트.
 *       500:
 *         description: 서버 에러. 콜백 처리 실패.
 */

// 회원가입
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: 회원가입
 *     description: 이메일, 비밀번호, 닉네임을 사용한 회원가입. 마케팅 및 프로모션 동의 포함.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 사용자 이메일.
 *               password:
 *                 type: string
 *                 description: 비밀번호.
 *               nickname:
 *                 type: string
 *                 description: 닉네임.
 *               agree_marketing:
 *                 type: boolean
 *                 description: 마케팅 동의 여부.
 *               agree_promotion:
 *                 type: boolean
 *                 description: 프로모션 동의 여부.
 *               is_email_verified:
 *                 type: boolean
 *                 description: 이메일 검증 여부.
 *     responses:
 *       201:
 *         description: 회원가입 성공.
 *       400:
 *         description: 이미 존재하는 사용자 또는 잘못된 요청.
 *       500:
 *         description: 서버 에러.
 */

// 회원탈퇴
/**
 * @swagger
 * /api/users/withdrawal:
 *   delete:
 *     summary: 회원탈퇴
 *     description: 사용자 회원탈퇴 처리. 로그인 필요.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호.
 *     responses:
 *       200:
 *         description: 회원탈퇴 성공.
 *       400:
 *         description: 존재하지 않는 사용자 또는 비밀번호 불일치.
 *       500:
 *         description: 서버 에러.
 */

// 회원정보 수정
/**
 * @swagger
 * /api/users/modify:
 *   patch:
 *     summary: 회원정보 수정
 *     description: 사용자의 닉네임, 마케팅 동의, 프로모션 동의, 전화번호, 주소, 프로필 이미지, 생년월일, 소개 메시지를 수정.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: 닉네임.
 *               agree_marketing:
 *                 type: boolean
 *                 description: 마케팅 동의 여부.
 *               agree_promotion:
 *                 type: boolean
 *                 description: 프로모션 동의 여부.
 *               phone:
 *                 type: string
 *                 description: 전화번호.
 *               address:
 *                 type: string
 *                 description: 주소.
 *               profile_img:
 *                 type: string
 *                 description: 프로필 이미지 URL.
 *               intro_msg:
 *                 type: string
 *                 description: 소개 메시지.
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 description: 생년월일.
 *     responses:
 *       200:
 *         description: 회원정보 수정 성공.
 *       400:
 *         description: 존재하지 않는 사용자.
 *       500:
 *         description: 서버 에러.
 */

// 비밀번호 수정
/**
 * @swagger
 * /api/users/password:
 *   post:
 *     summary: 비밀번호 수정
 *     description: 사용자의 비밀번호를 수정합니다. 현재 비밀번호 확인 후 새 비밀번호로 변경.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: 현재 비밀번호.
 *               newPassword:
 *                 type: string
 *                 description: 새 비밀번호.
 *     responses:
 *       200:
 *         description: 비밀번호 수정 성공.
 *       400:
 *         description: 존재하지 않는 사용자, 비밀번호 불일치, 기존 비밀번호와 동일한 경우.
 *       500:
 *         description: 서버 에러.
 */

// 로그아웃
/**
 * @swagger
 * /api/users/logout:
 *   get:
 *     summary: 로그아웃
 *     description: 사용자 로그아웃 처리. 세션 또는 토큰을 클리어합니다.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 로그아웃 성공.
 *       500:
 *         description: 로그아웃 과정에서 서버 에러 발생.
 */

// 이메일 중복 확인
/**
 * @swagger
 * /api/users/email:
 *   get:
 *     summary: 이메일 중복확인
 *     description: 사용자 이메일의 중복 여부를 확인합니다. 회원가입 시 사용 가능한 이메일인지 검사.
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: 확인할 이메일 주소.
 *     responses:
 *       200:
 *         description: 사용 가능한 이메일. 중복 없음.
 *       400:
 *         description: 이미 존재하는 이메일. 중복.
 *       500:
 *         description: 서버 에러.
 */

// 닉네임 중복 확인
/**
 * @swagger
 * /api/users/nickname:
 *   post:
 *     summary: 닉네임 중복확인
 *     description: 사용자 닉네임의 중복 여부를 확인합니다. 회원가입 시 사용 가능한 닉네임인지 검사.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: 확인할 닉네임.
 *     responses:
 *       200:
 *         description: 사용 가능한 닉네임. 중복 없음.
 *       409:
 *         description: 이미 존재하는 닉네임. 중복.
 *       500:
 *         description: 서버 에러.
 */

// 사용자 정보 조회
/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: 사용자 정보 조회
 *     description: 로그인한 사용자의 정보를 조회합니다. 비밀번호를 제외한 사용자 정보 반환.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 사용자 정보 조회 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                   description: 사용자 고유 ID.
 *                 email:
 *                   type: string
 *                   description: 이메일 주소.
 *                 nickname:
 *                   type: string
 *                   description: 닉네임.
 *                 phone:
 *                   type: string
 *                   description: 전화번호. AES 암호화 해제된 상태로 반환.
 *                 profile_img:
 *                   type: string
 *                   description: 프로필 이미지 URL.
 *                 birth_date:
 *                   type: string
 *                   format: date
 *                   description: 생년월일.
 *                 agree_marketing:
 *                   type: boolean
 *                   description: 마케팅 동의 여부.
 *                 agree_promotion:
 *                   type: boolean
 *                   description: 프로모션 동의 여부.
 *                 intro_msg:
 *                   type: string
 *                   description: 소개 메시지.
 *       400:
 *         description: 존재하지 않는 사용자.
 *       500:
 *         description: 서버 에러.
 */

// 사용자 작성 블로그 조회
/**
 * @swagger
 * /api/users/blogs:
 *   get:
 *     summary: 사용자 작성 게시글 조회
 *     description: 로그인한 사용자가 작성한 게시글 목록을 조회합니다. 게시글은 등록일 내림차순으로 정렬됩니다.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 사용자 작성 게시글 목록 조회 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   blog_id:
 *                     type: integer
 *                     description: 게시글 고유 ID.
 *                   title:
 *                     type: string
 *                     description: 게시글 제목.
 *                   contents:
 *                     type: string
 *                     description: 게시글 내용.
 *                   preview_img:
 *                     type: string
 *                     description: 미리보기 이미지 URL.
 *                   reg_date:
 *                     type: string
 *                     format: date-time
 *                     description: 게시글 등록일.
 *       500:
 *         description: 서버 에러.
 */

// 사용자가 좋아요한 블로그 조회
/**
 * @swagger
 * /api/users/likes:
 *   get:
 *     summary: 사용자가 좋아요를 누른 게시글 조회
 *     description: 로그인한 사용자가 좋아요를 누른 게시글 목록을 조회합니다. 좋아요한 날짜 내림차순으로 정렬됩니다.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 사용자가 좋아요를 누른 게시글 목록 조회 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   blog_id:
 *                     type: integer
 *                     description: 게시글 고유 ID.
 *                   title:
 *                     type: string
 *                     description: 게시글 제목.
 *                   contents:
 *                     type: string
 *                     description: 게시글 내용.
 *                   preview_img:
 *                     type: string
 *                     description: 미리보기 이미지 URL.
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: 좋아요 누른 날짜.
 *       500:
 *         description: 서버 에러.
 */

// 게시글 좋아요 여부 조회
/**
 * @swagger
 * /api/users/like/{blog_id}:
 *   get:
 *     summary: 게시글 좋아요 여부 조회
 *     description: 로그인한 사용자가 특정 게시글에 좋아요를 눌렀는지 여부를 조회합니다.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: blog_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 게시글의 고유 ID.
 *     responses:
 *       200:
 *         description: 좋아요 여부 반환. true는 좋아요를 누른 상태, false는 누르지 않은 상태.
 *       500:
 *         description: 서버 에러.
 */

// 팔로우 처리
/**
 * @swagger
 * /api/users/follow:
 *   post:
 *     summary: 팔로우 처리
 *     description: 다른 사용자를 팔로우하거나 팔로우를 취소합니다. 이미 팔로우 상태일 경우 팔로우 취소, 아닐 경우 팔로우 추가.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followee_id:
 *                 type: integer
 *                 description: 팔로우될 사용자의 고유 ID.
 *     responses:
 *       200:
 *         description: 팔로우 추가 또는 취소 성공.
 *       400:
 *         description: 잘못된 요청. 유효하지 않은 사용자 ID 등.
 *       500:
 *         description: 서버 에러.
 */

// 팔로잉 목록 조회
/**
 * @swagger
 * /api/users/followings:
 *   get:
 *     summary: 팔로잉 목록 조회
 *     description: 로그인한 사용자가 팔로우하고 있는 사용자의 목록을 조회합니다.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 팔로잉 목록 조회 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   followee_id:
 *                     type: integer
 *                     description: 팔로우되는 사용자의 고유 ID.
 *                   Followee:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: integer
 *                         description: 사용자 고유 ID.
 *                       nickname:
 *                         type: string
 *                         description: 사용자 닉네임.
 *                       profile_img:
 *                         type: string
 *                         description: 사용자 프로필 이미지 URL.
 *       500:
 *         description: 서버 에러.
 */



















