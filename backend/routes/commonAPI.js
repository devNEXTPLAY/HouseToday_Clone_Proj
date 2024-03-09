var express = require("express");
var router = express.Router();

var multer = require("multer");
var moment = require("moment");
var fs = require("fs");

var storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "public/upload/images/");
	},
	filename(req, file, cb) {
		const date = moment().format("YYYYMMDD");
		cb(null, `${date}-${file.originalname}`);
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
		res.status(201).json({
			filePath: filePath,
			message: "파일 업로드 성공",
		});
	} else {
		next(
			new Error("파일 업로드 실패: 파일이 없거나 파일 형식/크기가 조건에 부합하지 않습니다.")
		);
	}
});

// 파일 삭제 API
// http://localhost:3005/api/common/delete
// Status: 200 OK / 400 Bad Request / 500 Internal Server Error
// return message if success / return message if fail
router.delete("/delete", (req, res, next) => {
	const { filePath } = req.body;
	if (filePath) {
		fs.unlink(filePath, (error) => {
			if (error) {
				next(new Error("파일 삭제 실패: 파일이 존재하지 않습니다."));
			} else {
				res.status(200).json({
					message: "파일 삭제 성공",
				});
			}
		});
	} else {
		next(new Error("파일 삭제 실패: 파일 경로가 존재하지 않습니다."));
	}
});

// 에러 처리 미들웨어
router.use((error, req, res, next) => {
	console.error(error);
	res.status(400).json({ message: error.message });
});

module.exports = router;
