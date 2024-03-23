var express = require("express");
var router = express.Router();

var multer = require("multer");
var moment = require("moment");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid"); // UUID 생성을 위한 라이브러리
const winston = require("winston"); // 로깅 라이브러리
const errorMiddleware = require("../middlewares/errorMiddleware.js");

const logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	transports: [new winston.transports.File({ filename: "combined.log" })],
});

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

// 파일 업로드 API
// http://localhost:3005/api/common/upload
// Status: 201 Created / 400 Bad Request / 500 Internal Server Error
// return file path if success / return message if fail
router.post("/upload", Upload.single("file"), (req, res, next) => {
	if (req.file) {
		const filePath = req.file.path.replace(/\\/g, "/");
		logger.info(`파일 업로드 성공: ${filePath}`);
		res.status(201).json({
			filePath: filePath,
			message: "파일 업로드 성공",
		});
	} else {
		logger.error("파일 업로드 실패: 파일이 존재하지 않거나 허용되지 않는 파일 형식");
		next(new Error("파일 업로드 실패: 파일이 존재하지 않거나 허용되지 않는 파일 형식입니다."));
	}
});

// 파일 삭제 API
// http://localhost:3005/api/common/delete
// Status: 200 OK / 400 Bad Request / 500 Internal Server Error
// return message if success / return message if fail
router.delete("/delete", async (req, res, next) => {
	const { filePath } = req.body;
	try {
		if (filePath && filePath.startsWith("public/upload/images/")) {
			await fs.unlink(filePath);
			logger.info(`파일 삭제 성공: ${filePath}`);
			res.status(200).json({
				message: "파일 삭제 성공",
			});
		} else {
			logger.error(`파일 삭제 실패: 유효하지 않는 경로 ${filePath}`);
			throw new Error("파일 삭제 실패: 파일 경로가 존재하지 않습니다.");
		}
	} catch (error) {
		next(error);
	}
});

router.use(errorMiddleware);
module.exports = router;
