var express = require("express");
var router = express.Router();
const mainBlog = require("../public/js/mainBlog.js");
var db = require("../models/index.js");
var enums = require("../common/enums.js");
var moment = require("moment");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/passportMiddleware.js");
const errorMiddleware = require("../middlewares/errorMiddleware.js");

// 메인 블로그 글 반환 API
// 미리보기 정보만 반환
// http://localhost:3005/api/blog/main
// Status: 200 OK / 404 Not Found / 500 Internal Server Error
router.get("/main", async (req, res, next) => {
	try {
		const mainBlog_id = await mainBlog();
		const blog = await db.Blogs.findOne({
			attributes: ["blog_id", "title", "preview_img", "user_id"],
			where: { blog_id: mainBlog_id },
			include: [
				{
					model: db.Users,
					attributes: ["name"],
				},
			],
		});
		if (blog && blog.User) {
			const data = {
				blog_id: blog.blog_id,
				title: blog.title,
				preview_img: blog.preview_img,
				user_name: blog.User.name,
			};
			res.status(200).json(data);
		} else {
			res.status(404).json({
				message: "메인 블로그 글이 존재하지 않습니다.",
			});
		}
	} catch (error) {
		next(error);
	}
});

// 블로그 글 추가 API
// http://localhost:3005/api/blog/create
// Status: 201 Created / 400 Bad Request / 500 Internal Server Error
router.post("/create", isLoggedIn, async (req, res, next) => {
	const { blog_type_code, title, contents, preview_img } = req.body;
	const user_id = req.user.user_id;
	const ip_address = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

	try {
		await db.Blogs.create({
			user_id,
			blog_type_code,
			title,
			contents,
			preview_img,
			ip_address,
			blog_status_code: enums.BLOG_STATUS_CODE.APPLIED,
			reg_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
		});
		res.status(201).json({
			message: "블로그 글 등록에 성공하였습니다.",
		});
	} catch (error) {
		next(error);
	}
});

router.use(errorMiddleware);
module.exports = router;
