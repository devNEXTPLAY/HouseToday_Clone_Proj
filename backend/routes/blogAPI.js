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

// 메인 페이지 대문 블로그 글 반환 API
// http://localhost:3005/api/blog/main
// Status: 200 OK / 404 Not Found / 500 Internal Server Error
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
// 집들이 4개, 집 사진 4개를 추천
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

// 게시판별 블로그 전체 글 반환 API
// 게시판코드 - 파라미터 type: 0: 집들이 1: 노하우 2: 사진/영상
// 정렬 코드 -쿼리스트링 code: 0: 최신순, 1: 좋아요순
// 해시태그, 베스트 댓글, 댓글 작성자 닉네임 프로필 이미지 포함
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
				}
			],
			order,
		});

		const bestComments = [];
		for (let blog of blogs) {
			const bestComment = await getBestComment(blog.blog_id);
			bestComments.push(bestComment);
		};

		const data = blogs.map((blog, index) => {
			console.log(bestComments[index])
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

// 블로그 글 수정 API
// 해시태그 조회 및 추가/삭제
// http://localhost:3005/api/blog/update
// Status: 200 OK / 400 Bad Request / 500 Internal Server Error
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

// 단일 블로그 글 조회 API
// 댓글 및 대댓글, 해시태그 포함
// 조회 시 조회수 증가
// http://localhost:3005/api/blog/detail/:bid
// Status: 200 OK / 404 Not Found / 500 Internal Server Error
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

// 단일 블로그를 좋아요 누른 사용자 조회 API
// http://localhost:3005/api/blog/likes/:bid
// Status: 200 OK / 404 Not Found / 500 Internal Server Error
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
