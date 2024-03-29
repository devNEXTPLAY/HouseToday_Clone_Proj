var express = require("express");
var router = express.Router();
var db = require("../models/index.js");
var enums = require("../common/enums.js");
var moment = require("moment");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/passportMiddleware.js");
const errorMiddleware = require("../middlewares/errorMiddleware.js");
const { Op } = require("sequelize");

// 자체 모듈 함수
const { getComments, getBestComment } = require("../public/js/getComments.js");
const mainBlog = require("../public/js/mainBlog.js");
const getRecommendedBlogs = require("../public/js/getRecommendedBlogs.js");
const updateHashtags = require("../public/js/updateHashtags.js");
const searchBlogs = require("../public/js/searchBlogs.js");

/**
 * @swagger
 * /main:
 *   get:
 *     summary: 메인 블로그 글 조회
 *     description: 홈페이지에 표시되는 메인 블로그 글을 가져옴
 */
router.get("/main", async (req, res, next) => {
	try {
		const mainBlog_id = await mainBlog();
		if (!mainBlog_id) {
			return res.status(404).json({
				message: "메인 블로그 글이 존재하지 않습니다.",
			});
		}
		const blog = await db.Blogs.findOne({
			attributes: ["blog_id", "title", "preview_img", "user_id"],
			where: { blog_id: mainBlog_id },
			include: [
				{
					model: db.Users,
					attributes: ["nickname", "profile_img"],
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
				profile_img: blog.User.profile_img,
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

/**
 * @swagger
 * /api/blog/recommended:
 *   get:
 *     summary: 추천 블로그 글
 *     description: 집들이, 집 사진 추천 글 4개씩.
 */
router.get("/recommended", async (req, res, next) => {
	try {
		const recommended_housewarming = await getRecommendedBlogs(enums.BLOG_TYPE_CODE.HOUSEWARMING);
		const recommended_photo_video = await getRecommendedBlogs(enums.BLOG_TYPE_CODE.PHOTO_VIDEO);
		const housewarming = await db.Blogs.findAll({
			attributes: ["blog_id", "title", "preview_img", "user_id"],
			where: {
				blog_id: recommended_housewarming,
			},
			include: [
				{
					model: db.Users,
					attributes: ["nickname"],
					as: "User",
				},
			],
		});
		const photo_video = await db.Blogs.findAll({
			attributes: ["blog_id", "title", "preview_img", "user_id"],
			where: {
				blog_id: recommended_photo_video,
			},
			include: [
				{
					model: db.Users,
					attributes: ["nickname"],
					as: "User",
				},
			],
		});

		const data = {
			housewarming: housewarming.map((blog) => {
				return {
					blog_id: blog.blog_id,
					title: blog.title,
					preview_img: blog.preview_img,
					nickname: blog.User.nickname,
				};
			}),
			photo_video: photo_video.map((blog) => {
				return {
					blog_id: blog.blog_id,
					title: blog.title,
					preview_img: blog.preview_img,
					nickname: blog.User.nickname,
				};
			}),
		};
		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
});

/**
 * @swagger
 * /api/blog/list/{type}:
 *   get:
 *     summary: 게시판별 블로그 글 목록
 *     description: 타입별(집들이, 노하우, 사진/영상) 블로그 글 조회. 정렬 코드로 최신순, 좋아요순 선택 가능.
 */
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
				"contents",
				"user_id",
				"view_count",
				"like_count",
				"comment_count",
				"reg_date",
			],
			where: {
				blog_type_code: type,
				[Op.or]: [
					{ blog_status_code: enums.BLOG_STATUS_CODE.APPLIED },
					{ blog_status_code: enums.BLOG_STATUS_CODE.APPROVED },
				],
			},
			include: [
				{
					model: db.Users,
					attributes: ["nickname", "profile_img", "intro_msg"],
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
			order,
		});

		const bestComments = [];
		for (let blog of blogs) {
			const bestComment = await getBestComment(blog.blog_id);
			bestComments.push(bestComment);
		}

		const data = blogs.map((blog, index) => {
			console.log(bestComments[index]);
			return {
				blog_id: blog.blog_id,
				title: blog.title,
				preview_img: blog.preview_img,
				contents: blog.contents,
				nickname: blog.User.nickname,
				profile_img: blog.User.profile_img,
				intro_msg: blog.User.intro_msg,
				view_count: blog.view_count,
				like_count: blog.like_count,
				comment_count: blog.comment_count,
				reg_date: blog.reg_date,
				hashtag: blog.Hashtags.map((hashtag) => hashtag.hashtag_name),
				best_comment: bestComments[index],
			};
		});
		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
});

/**
 * @swagger
 * /api/blog/create:
 *   post:
 *     summary: 블로그 글 추가
 */
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
			await updateHashtags(blog.blog_id, hashtags);
		}

		res.status(201).json({
			blog_id: blog.blog_id,
			message: "블로그 글 등록에 성공하였습니다.",
		});
	} catch (error) {
		next(error);
	}
});

/**
 * @swagger
 * /api/blog/update/{bid}:
 *   put:
 *     summary: 블로그 글 수정
 */
router.put("/update/:bid", isLoggedIn, async (req, res, next) => {
	const blog_id = req.params.bid;
	const { title, contents, preview_img, hashtags } = req.body;
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
				title,
				contents,
				preview_img,
				ip_address,
				mod_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
			},
			{
				where: {
					blog_id,
				},
			}
		);

		if (hashtags) {
			await updateHashtags(blog_id, hashtags);
		}

		res.status(200).json({
			message: "블로그 글 수정에 성공하였습니다.",
		});
	} catch (error) {
		next(error);
	}
});

/**
 * @swagger
 * /api/blog/detail/{bid}:
 *   get:
 *     summary: 단일 블로그 글 조회
 */
router.get("/detail/:bid", async (req, res, next) => {
	const blog_id = req.params.bid;

	try {
		const blog = await db.Blogs.findOne({
			where: {
				blog_id,
				[Op.or]: [
					{ blog_status_code: enums.BLOG_STATUS_CODE.APPLIED },
					{ blog_status_code: enums.BLOG_STATUS_CODE.APPROVED },
				],
			},
			include: [
				{
					model: db.Users,
					attributes: ["nickname", "user_id", "profile_img"],
					as: "User",
				},
			],
		});

		if (blog) {
			const comments = await getComments(blog_id);
			const hashtags = await db.BlogHashtags.findAll({
				where: {
					blog_id,
				},
				include: [
					{
						model: db.Hashtags,
						attributes: ["hashtag_name"],
					},
				],
			});
			blog.view_count += 1;

			const data = {
				...blog.toJSON(),
				User: blog.User,
				comments,
				hashtags: hashtags.map((hashtag) => hashtag.Hashtag.hashtag_name),
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

/**
 * @swagger
 * /api/blog/delete/{bid}:
 *   delete:
 *     summary: 블로그 글 삭제
 */
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

/**
 * @swagger
 * /api/blog/like/{bid}:
 *   post:
 *     summary: 블로그 좋아요
 */
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

/**
 * @swagger
 * /api/blog/likes/{bid}:
 *   get:
 *     summary: 좋아요 누른 사용자 조회
 */
router.get("/likes/:bid", async (req, res, next) => {
	const blog_id = req.params.bid;

	try {
		const likes = await db.BlogLikes.findAll({
			where: {
				blog_id,
			},
			include: [
				{
					model: db.Users,
					attributes: ["nickname"],
					as: "User",
				},
			],
		});
		if (likes.length > 0) {
			const data = likes.map((like) => {
				return {
					user_id: like.User.user_id,
					nickname: like.User.nickname,
				};
			});
			res.status(200).json(data);
		} else {
			res.status(404).json({
				message: "좋아요를 누른 사용자가 없습니다.",
			});
		}
	} catch (error) {
		next(error);
	}
});

/**
 * @swagger
 * /api/blog/search:
 *   get:
 *     summary: 블로그 글 검색
 */
router.get("/search", async (req, res, next) => {
	const { keyword } = req.query;
	searchBlogs(keyword).then((results) => {
		res.status(200).json(results);
	}
	).catch((error) => {
		next(error);
	});
});

router.use(errorMiddleware);
module.exports = router;
