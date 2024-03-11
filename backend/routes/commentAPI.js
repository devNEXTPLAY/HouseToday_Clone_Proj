var express = require("express");
var router = express.Router();
var db = require("../models/index.js");
var enums = require("../common/enums.js");
var moment = require("moment");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/passportMiddleware.js");
const errorMiddleware = require("../middlewares/errorMiddleware.js");

//  댓글 추가 API
//  http://localhost:3005/api/comment/create
//  Status: 201 Created / 400 Bad Request / 500 Internal Server Error
router.post("/create", isLoggedIn, async (req, res, next) => {
	const { blog_id, parent_id, contents } = req.body;
	const user_id = req.user.user_id;
	const ip_address = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

	try {
		const blog = await db.Blogs.findOne({
			attributes: ["blog_id"],
			where: { blog_id },
		});
		if (!blog) {
			return res.status(400).json({
				message: "존재하지 않는 블로그 글입니다.",
			});
		}

		await db.Comments.create({
			blog_id,
			user_id,
			contents,
			parent_id,
			ip_address,
			reg_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
		});
		res.status(201).json({
			message: "댓글이 추가되었습니다.",
		});
	} catch (error) {
		next(error);
	}
});

//  댓글 수정 API
//  http://localhost:3005/api/comment/update
//  Status: 200 OK / 400 Bad Request / 500 Internal Server Error
router.patch("/update", isLoggedIn, async (req, res, next) => {
	const { comment_id, contents } = req.body;
	const user_id = req.user.user_id;
	const ip_address = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

	try {
		const comment = await db.Comments.findOne({
			attributes: ["comment_id"],
			where: { comment_id, user_id },
		});
		if (!comment) {
			return res.status(400).json({
				message: "존재하지 않는 댓글이거나 권한이 없습니다.",
			});
		}

		await db.Comments.update(
			{ contents, ip_address, edit_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") },
			{
				where: { comment_id, user_id },
			}
		);
		res.status(200).json({
			message: "댓글이 수정되었습니다.",
		});
	} catch (error) {
		next(error);
	}
});

//  댓글 삭제 API
//  http://localhost:3005/api/comment/delete:cid
//  Status: 200 OK / 400 Bad Request / 500 Internal Server Error
router.delete("/delete/:cid", isLoggedIn, async (req, res, next) => {
	const comment_id = req.params.cid;
	const user_id = req.user.user_id;

	try {
		const comment = await db.Comments.findOne({
			attributes: ["comment_id"],
			where: { comment_id, user_id },
		});
		if (!comment) {
			return res.status(400).json({
				message: "존재하지 않는 댓글이거나 권한이 없습니다.",
			});
		}

		comment.comment_status_code = enums.COMMENT_STATUS_CODE.DELETED;
		comment.edit_date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
		await comment.save();
		res.status(200).json({
			message: "댓글이 삭제되었습니다.",
		});
	} catch (error) {
		next(error);
	}
});

// 댓글 좋아요 API
// 안눌렀을 경우 추가, 눌렀을 경우 삭제
// http://localhost:3005/api/comment/like
// Status: 200 OK / 400 Bad Request / 500 Internal Server Error
router.post("/like", isLoggedIn, async (req, res, next) => {
	const { comment_id } = req.body;
	const user_id = req.user.user_id;

	try {
		const comment = await db.Comments.findOne({
			where: { comment_id },
		});
		if (!comment) {
			return res.status(400).json({
				message: "존재하지 않는 댓글입니다.",
			});
		}
		const like = await db.CommentLikes.findOne({
			where: {
				comment_id,
				user_id,
			},
		});
		if (like) {
			await like.destroy();
			comment.like_count -= 1;
			await comment.save();
			res.status(200).json({
				message: "좋아요를 취소했습니다.",
			});
		} else {
			await db.CommentLikes.create({
				user_id,
				comment_id,
				created_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
			});
			comment.like_count += 1;
			await comment.save();
			res.status(200).json({
				message: "좋아요를 추가했습니다.",
			});
		}
	} catch (error) {
		next(error);
	}
});

router.use(errorMiddleware);
module.exports = router;
