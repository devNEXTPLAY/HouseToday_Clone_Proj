// 댓글 추가
/**
 * @swagger
 * /api/comment/create:
 *   post:
 *     summary: 댓글 추가
 *     description: 사용자가 블로그 글에 대한 댓글을 추가합니다. 대댓글을 추가할 경우 parent_id 사용.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blog_id:
 *                 type: integer
 *                 description: 댓글을 달 블로그 글의 ID.
 *               parent_id:
 *                 type: integer
 *                 description: 대댓글의 경우, 부모 댓글의 ID.
 *               content:
 *                 type: string
 *                 description: 댓글 내용.
 *     responses:
 *       201:
 *         description: 댓글 추가 성공.
 *       400:
 *         description: 존재하지 않는 블로그 글. 댓글 추가 실패.
 *       500:
 *         description: 서버 에러.
 */

// 댓글 수정
/**
 * @swagger
 * /api/comment/create:
 *   post:
 *     summary: 댓글 추가
 *     description: 사용자가 블로그 글에 댓글을 추가합니다. 대댓글 추가 시 parent_id 사용.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blog_id:
 *                 type: integer
 *                 description: 댓글을 추가할 블로그 글의 ID.
 *               parent_id:
 *                 type: integer
 *                 description: 대댓글의 경우 부모 댓글의 ID. 첫 댓글인 경우 null.
 *               content:
 *                 type: string
 *                 description: 댓글 내용.
 *     responses:
 *       201:
 *         description: 댓글 추가 성공.
 *       400:
 *         description: 존재하지 않는 블로그 글이거나 잘못된 요청.
 *       500:
 *         description: 서버 에러.
 */

// 댓글 삭제
/**
 * @swagger
 * /api/comment/delete:
 *   delete:
 *     summary: 댓글 삭제
 *     description: 사용자가 자신의 댓글을 삭제합니다. 실제로 데이터베이스에서 댓글을 제거하지는 않고, 상태를 '삭제됨'으로 변경합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment_id:
 *                 type: integer
 *                 description: 삭제할 댓글의 ID.
 *     responses:
 *       200:
 *         description: 댓글 삭제 성공.
 *       400:
 *         description: 존재하지 않는 댓글이거나 삭제 권한이 없는 경우.
 *       500:
 *         description: 서버 에러.
 */

// 댓글 좋아요
/**
 * @swagger
 * /api/comment/like:
 *   post:
 *     summary: 댓글 좋아요 처리
 *     description: 사용자가 댓글에 좋아요를 추가하거나 좋아요를 취소합니다. 이미 좋아요가 되어 있으면 좋아요 취소, 아니면 좋아요 추가.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment_id:
 *                 type: integer
 *                 description: 좋아요를 추가할 댓글의 ID.
 *     responses:
 *       200:
 *         description: 좋아요 추가 또는 취소 성공.
 *       400:
 *         description: 존재하지 않는 댓글이거나 잘못된 요청.
 *       500:
 *         description: 서버 에러.
 */





