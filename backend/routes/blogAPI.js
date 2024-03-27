var express = require("express");
var router = express.Router();
var db = require("../models/index.js");
var enums = require("../common/enums.js");
var moment = require("moment");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/passportMiddleware.js");
const errorMiddleware = require("../middlewares/errorMiddleware.js");

// 자체 모듈 함수
const getComments = require("../public/js/getComments.js");
const mainBlog = require("../public/js/mainBlog.js");
const getRecommendedBlogs = require("../public/js/getRecommendedBlogs.js");

// 메인 페이지 대문 블로그 글 반환 API
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

// 메인 페이지 추천 블로그 글 반환 API
// http://localhost:3005/api/blog/recommended
// Status: 200 OK / 404 Not Found / 500 Internal Server Error
// recommendedBlogs return 8 blog_ids
router.get("/recommended", async (req, res, next) => {
	try {
		const recommendedBlogs = await getRecommendedBlogs();
		const blogs = await db.Blogs.findAll({
			attributes: ["blog_id", "title", "preview_img", "user_id"],
			where: {
				blog_id: recommendedBlogs,
			},
			include: [
				{
					model: db.Users,
					attributes: ["nickname"],
					as: "User",
				},
			],
		});
		if (blogs.length > 0) {
			const data = blogs.map((blog) => {
				return {
					blog_id: blog.blog_id,
					title: blog.title,
					preview_img: blog.preview_img,
					nickname: blog.User.nickname,
				};
			});
			res.status(200).json(data);
		} else {
			res.status(404).json({
				message: "추천 블로그 글이 존재하지 않습니다.",
			});
		}
	} catch (error) {
		next(error);
	}
});

// 게시판별 블로그 전체 글 반환 API
// 게시판코드 - 파라미터 type: 0: 집들이 1: 노하우 2: 사진/영상
// 정렬 코드 -쿼리스트링 code: 0: 최신순, 1: 좋아요순
// http://localhost:3005/api/blog/list/0?code=1
// Status: 200 OK / 404 Not Found / 500 Internal Server Error
router.get("/list/:type", async (req, res, next) => {
	const { type } = req.params;
	const { code } = req.query;

	try {
		let order;
		if (code === "0") {
			order = [["reg_date", "DESC"]]; // 최신순 정렬
		} else if (code === "1") {
			order = [["like_count", "DESC"]]; // 좋아요순 정렬
		} else {
			return res.status(400).json({
				message: "정렬 코드가 올바르지 않습니다.",
			});
		}

		const blogs = await db.Blogs.findAll({
			attributes: [
				"blog_id",
				"title",
				"preview_img",
				"user_id",
				"view_count",
				"like_count",
				"comment_count",
				"reg_date",
				'blog_status_code'
			],
			where: { blog_type_code: type },
			include: [
				{
					model: db.Users,
					attributes: ["nickname", "profile_img"],
					as: "User",
				},
			],
			order,
		});
		if (blogs.length > 0) {
			const data = blogs.map((blog) => {
				return {
					blog_id: blog.blog_id,
					title: blog.title,
					preview_img: blog.preview_img,
					nickname: blog.User.nickname,
					profile_img: blog.User.profile_img,
					view_count: blog.view_count,
					like_count: blog.like_count,
					comment_count: blog.comment_count,
					reg_date: blog.reg_date,
					blog_status_code: blog.blog_status_code
				};
			});
			res.status(200).json(data);
		} else {
			res.status(404).json({
				message: "게시판별 블로그 글이 존재하지 않습니다.",
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
	const { blog_type_code, title, contents, preview_img, hashtags } = req.body;
	const user_id = req.user.user_id;
	const ip_address = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

	try {
		var blog = await db.Blogs.create({
			user_id,
			blog_type_code,
			title,
			contents,
			preview_img,
			ip_address,
			blog_status_code: enums.BLOG_STATUS_CODE.APPLIED,
			reg_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
		});

		if (hashtags) {
			const hashtagList = hashtags;
			for (let i = 0; i < hashtagList.length; i++) {
				console.log(hashtagList[i]);
				const hashtag = await db.Hashtags.findOne({
					where: {
						hashtag_name: hashtagList[i],
					},
				});
				if (!hashtag) {
					await db.Hashtags.create({
						hashtag_name: hashtagList[i],
						reg_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
					});
				}
				const hashtag_id = await db.Hashtags.findOne({
					attributes: ["hashtag_id"],
					where: {
						hashtag_name: hashtagList[i],
					},
				});
				await db.BlogHashtags.create({
					blog_id: blog.blog_id,
					hashtag_id: hashtag_id.hashtag_id,
				});
			}
		}

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
router.put("/update/:bid", isLoggedIn, async (req, res, next) => {
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
					attributes: ["nickname", 'user_id', 'profile_img'],
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

// 블로그 글 삭제 API
// 블로그 글 상태코드 변경
// http://localhost:3005/api/blog/delete/:bid
// Status: 200 OK / 400 Bad Request / 500 Internal Server Error
router.delete("/delete/:bid", isLoggedIn, async (req, res, next) => {
	const blog_id = req.params.bid;
	const user_id = req.user.user_id;

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
		blog.blog_status_code = enums.BLOG_STATUS_CODE.DELETED;
		await blog.save();
		res.status(200).json({
			message: "블로그 글 삭제에 성공하였습니다.",
		});
	} catch (error) {
		next(error);
	}
});

// 블로그 좋아요 API
// 안눌렀을 경우 좋아요 추가, 눌렀을 경우 좋아요 취소
// http://localhost:3005/api/blog/like/:bid
// Status: 200 OK / 400 Bad Request / 500 Internal Server Error
router.post("/like/:bid", isLoggedIn, async (req, res, next) => {
	const blog_id = req.params.bid;
	const user_id = req.user.user_id;

	try {
		const blog = await db.Blogs.findOne({
			where: { blog_id },
		});
		if (!blog) {
			return res.status(400).json({
				message: "존재하지 않는 글입니다.",
			});
		}
		const like = await db.BlogLikes.findOne({
			where: {
				blog_id,
				user_id,
			},
		});
		if (like) {
			await like.destroy();
			blog.like_count -= 1;
			await blog.save();
			res.status(200).json({
				message: "좋아요 취소를 취소했습니다.",
			});
		} else {
			await db.BlogLikes.create({
				user_id,
				blog_id,
				created_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
			});
			blog.like_count += 1;
			await blog.save();
			res.status(200).json({
				message: "좋아요를 눌렀습니다.",
			});
		}
	} catch (error) {
		next(error);
	}
});

// 블로그 글 검색 API
// 제목, 내용, 해시태그 검색
// http://localhost:3005/api/blog/search
// Status: 200 OK / 404 Not Found / 500 Internal Server Error
router.get("/search", async (req, res, next) => {
	const { keyword } = req.query;

	try {
		const blogs = await db.Blogs.findAll({
			where: {
				[db.Sequelize.Op.or]: [
					{
						title: {
							[db.Sequelize.Op.like]: `%${keyword}%`,
						},
					},
					{
						contents: {
							[db.Sequelize.Op.like]: `%${keyword}%`,
						},
					},
				],
			},
			include: [
				{
					model: db.Users,
					attributes: ["nickname"],
					as: "User",
				},
				{
					model: db.Hashtags,
					attributes: ["hashtag_name"],
					through: {
						attributes: [],
					},
				},
			],
		});

		if (blogs.length > 0) {
			const data = blogs.map((blog) => {
				return {
					blog_id: blog.blog_id,
					title: blog.title,
					preview_img: blog.preview_img,
					nickname: blog.User.nickname,
					hashtag: blog.Hashtags.map((hashtag) => hashtag.hashtag_name),
				};
			});
			res.status(200).json(data);
		}
	} catch (error) {
		next(error);
	}
});

router.use(errorMiddleware);
module.exports = router;
