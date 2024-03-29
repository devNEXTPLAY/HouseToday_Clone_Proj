// 파일 업로드
/**
 * @swagger
 * /api/common/upload:
 *   post:
 *     summary: 파일 업로드
 *     description: 파일을 서버에 업로드합니다. 이미지 파일만 허용됩니다.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 파일.
 *     responses:
 *       201:
 *         description: 파일 업로드 성공. 업로드된 파일 경로 반환.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 filePath:
 *                   type: string
 *                   description: 업로드된 파일의 서버 경로.
 *       400:
 *         description: 파일 업로드 실패. 파일이 존재하지 않거나 허용되지 않는 파일 형식.
 *       500:
 *         description: 서버 에러.
 */

// 파일 삭제
/**
 * @swagger
 * /api/common/delete:
 *   delete:
 *     summary: 파일 삭제
 *     description: 서버에 업로드된 파일을 삭제합니다. 파일 경로를 기반으로 삭제 작업을 수행합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filePath:
 *                 type: string
 *                 description: 삭제할 파일의 서버 경로.
 *     responses:
 *       200:
 *         description: 파일 삭제 성공.
 *       400:
 *         description: 파일 삭제 실패. 파일 경로가 올바르지 않음.
 *       500:
 *         description: 서버 에러.
 */

