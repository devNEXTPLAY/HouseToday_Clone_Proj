var express = require("express");
var router = express.Router();
const mainBlog = require("../public/js/mainBlog.js");
var db = require("../models/index.js");
var enums = require("../common/enums.js");
var moment = require("moment");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/passportMiddleware.js");
const errorMiddleware = require("../middlewares/errorMiddleware.js");
const getComments = require("../public/js/getComments.js");

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
					attributes: ["nickname"],
					as: "User",
				},
			],
		});
		if (blog && blog.User) {
			const data = {
				blog_id: blog.blog_id,
				title: blog.title,
				preview_img: blog.preview_img,
				nickname: blog.User.nickname,
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

// 블로그 글 수정 API
// http://localhost:3005/api/blog/update
// Status: 200 OK / 400 Bad Request / 500 Internal Server Error
router.post("/update/:bid", isLoggedIn, async (req, res, next) => {
	const blog_id = req.params.bid;
	const { title, contents, preview_img } = req.body;
	const user_id = req.user.user_id;
	const ip_address = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

	try {
		const blog = await db.Blogs.findOne({
			where: {
				blog_id,
				user_id,
			},
		});
		if (!blog) {
			return res.status(400).json({
				message: "존재하지 않는 글이거나 작성자가 아닙니다.",
			});
		}
		await db.Blogs.update(
			{
				blog_type_code: blog.blog_type_code,
				title,
				contents,
				preview_img,
				ip_address,
				blog_status_code: enums.BLOG_STATUS_CODE.APPLIED,
				edit_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
			},
			{
				where: {
					blog_id,
				},
			}
		);
		res.status(200).json({
			message: "블로그 글 수정에 성공하였습니다.",
		});
	} catch (error) {
		next(error);
	}
});

// 단일 블로그 글 조회 API
// 댓글 및 대댓글 포함
// 조회 시 조회수 증가
// http://localhost:3005/api/blog/detail/:bid
// Status: 200 OK / 404 Not Found / 500 Internal Server Error
router.get("/detail/:bid", async (req, res, next) => {
	const blog_id = req.params.bid;

	try {
		const blog = await db.Blogs.findOne({
			where: { blog_id },
			include: [
				{
					model: db.Users,
					attributes: ["nickname"],
					as: "User",
				},
			],
		});

		if (blog) {
			const comments = await getComments(blog_id);
			blog.view_count += 1;

			const data = {
				...blog.toJSON(),
				User: blog.User,
				comments,
			};

			await db.Blogs.update(
				{
					view_count: blog.view_count,
				},
				{
					where: {
						blog_id,
					},
				}
			);

			res.status(200).json(data);
		} else {
			res.status(404).json({ message: "존재하지 않는 글입니다." });
		}
	} catch (error) {
		next(error);
	}
});

router.use(errorMiddleware);
module.exports = router;
