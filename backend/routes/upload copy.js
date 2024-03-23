const multer = require("multer");
const moment = require("moment");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const winston = require("winston");

// 로깅 설정
const logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	transports: [new winston.transports.File({ filename: "combined.log" })],
});

// multer 설정
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "public/upload/images/");
	},
	filename(req, file, cb) {
		const date = moment().format("YYYYMMDD");
		const uniqueSuffix = uuidv4();
		cb(null, `${date}-${uniqueSuffix}-${file.originalname}`);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new Error("허용되지 않는 파일 형식입니다."), false);
	}
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 30, // 30MB
	},
	fileFilter: fileFilter,
}).single("file");

// 파일 업로드 함수
function uploadFile(req, res, next) {
	upload(req, res, function (error) {
		if (error) {
			logger.error("파일 업로드 실패:", error);
			return next(error);
		}
		if (req.file) {
			const filePath = req.file.path.replace(/\\/g, "/");
			logger.info(`파일 업로드 성공: ${filePath}`);
			res(filePath); // 성공 콜백
		} else {
			const error = new Error("파일이 존재하지 않거나 허용되지 않는 파일 형식입니다.");
			logger.error(error.message);
			next(error); // 실패 콜백
		}
	});
}

// 파일 삭제 함수
async function deleteFile(filePath) {
	try {
		if (filePath && filePath.startsWith("public/upload/images/")) {
			await fs.unlink(filePath);
			logger.info(`파일 삭제 성공: ${filePath}`);
			return { success: true, message: "파일 삭제 성공" };
		} else {
			const error = new Error("파일 삭제 실패: 파일 경로가 존재하지 않습니다.");
			logger.error(error.message);
			throw error;
		}
	} catch (error) {
		logger.error(`파일 삭제 실패: ${error.message}`);
		throw error;
	}
}

module.exports = { uploadFile, deleteFile };
