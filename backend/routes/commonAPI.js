var express = require("express");
var router = express.Router();

var multer = require("multer");
var moment = require("moment");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid"); // UUID 생성을 위한 라이브러리
const winston = require("winston"); // 로깅 라이브러리
const errorMiddleware = require("../middlewares/errorMiddleware.js");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/passportMiddleware.js");

var storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "public/upload/images/");
	},
	filename(req, file, cb) {
		const date = moment().format("YYYYMMDD");
		const uniqueSuffix = uuidv4();
		cb(null, `${date}-${uniqueSuffix}-${file.originalname}`);
	},
});

// upload file filter (image only)
var fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new Error("허용되지 않는 파일 형식입니다."), false);
	}
};

var Upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 30, // 30MB
	},
	fileFilter: fileFilter,
});

/**
 * @swagger
 * /api/common/upload:
 *   post:
 *     summary: 파일 업로드
 */
router.post("/upload", Upload.single("file"), (req, res, next) => {
	if (req.file) {
		const filePath = req.file.path.replace(/\\/g, "/");
		res.status(201).json({
			filePath: filePath,
			message: "파일 업로드 성공",
		});
	} else {
		next(new Error("파일 업로드 실패: 파일이 존재하지 않거나 허용되지 않는 파일 형식입니다."));
	}
});

/**
 * @swagger
 * /api/common/delete:
 *   delete:
 *     summary: 파일 삭제
 */
router.delete("/delete", isLoggedIn, async (req, res, next) => {
	var { filePath } = req.body;
	filePath = filePath.split("http://localhost:3005/").pop();
	try {
		if (filePath && filePath.startsWith("public/upload/images/")) {
			await fs.unlink(filePath);
			res.status(200).json({
				message: "파일 삭제 성공",
			});
		} else {
			throw new Error("파일 삭제 실패: 파일 경로가 존재하지 않습니다.");
		}
	} catch (error) {
		next(error);
	}
});

router.use(errorMiddleware);
module.exports = router;
