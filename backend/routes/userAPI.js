var express = require("express");
var router = express.Router();
var db = require("../models/index.js");
var bcrypt = require("bcryptjs");
var AES = require("mysql-aes");
var jwt = require("jsonwebtoken");
var enums = require("../common/enums.js");
var moment = require("moment");
const { Op } = require("sequelize");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/passportMiddleware.js");
const errorMiddleware = require("../middlewares/errorMiddleware.js");

// 로그인 API
// http://localhost:3005/api/users/login
// Status: 200 OK / 404 Not Found / 400 Bad Request / 500 Internal Server Error
// return token if success / return message if fail
// token: JWT token { id, email } / 1h
router.post("/login", isNotLoggedIn, (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) return next(err);
		if (!user) {
			if (info.message === "존재하지 않는 사용자입니다.") {
				return res.status(404).json({
					message: "존재하지 않는 사용자입니다.",
				});
			} else if (info.message === "비밀번호가 일치하지 않습니다.") {
				return res.status(400).json({
					message: "비밀번호가 일치하지 않습니다.",
				});
			} else {
				return res.status(400).json({
					message: "로그인에 실패하였습니다.",
				});
			}
		}
		req.logIn(user, (err) => {
			if (err) return next(err);
			const token = jwt.sign(
				{
					id: user.user_id,
					email: user.email,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: "1h",
				}
			);
			return res.status(200).json({
				token: token,
				userId: user.user_id,
				message: "로그인에 성공하였습니다.",
			});
		});
	})(req, res, next);
});

// 카카오 로그인 API
// http://localhost:3005/api/users/kakao
// Status: 200 OK / 500 Internal Server Error
router.get(
	"/kakao",
	passport.authenticate("kakao", {
		failureRedirect: "/login",
	}),
	(req, res) => {
		req.logIn(req.user, (err) => {
			if (err) return next(err);
			const token = jwt.sign(
				{
					id: req.user.user_id,
					email: req.user.email,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: "1h",
				}
			);
			res.redirect(`http://localhost:5173/?token=${token}`);
		});
	}
);

// 카카오 로그인 콜백 API
// http://localhost:3005/api/users/oauth/kakao
// Status: 200 OK / 500 Internal Server Error
router.get(
	"/oauth/kakao",
	passport.authenticate("kakao", {
		failureRedirect: "/login",
	}),
	(req, res) => {
		req.logIn(req.user, (err) => {
			if (err) return next(err);
			const token = jwt.sign(
				{
					id: req.user.user_id,
					email: req.user.email,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: "1h",
				}
			);
			res.redirect(`http://localhost:5173/?token=${token}`);
		});
	}
);

// 회원가입 API
// http://localhost:3005/api/users/register
// Status: 201 Created / 400 Bad Request / 500 Internal Server Error
// return message if success / return message if fail
router.post("/register", isNotLoggedIn, async (req, res, next) => {
	const { email, password, nickname, agree_marketing, agree_promotion, is_email_verified } = req.body;
	try {
		const user = await db.Users.findOne({
			where: {
				[Op.or]: [{ email: email }, { nickname: nickname }],
				use_state_code: {
					[Op.ne]: enums.USE_STATE_CODE.WITHDRAWAL,
				},
			},
		});
		if (user) {
			return res.status(400).json({
				message: "이미 존재하는 사용자입니다.",
			});
		}
		const ip_address = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
		console.log(`회원가입 시도: ${email}, IP: ${ip_address}`);
		const hash = await bcrypt.hash(password, 12);
		await db.Users.create({
			email: email,
			password: hash,
			nickname: nickname,
			agree_marketing: agree_marketing,
			agree_promotion: agree_promotion,
			is_email_verified: is_email_verified,
			profile_img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
			entry_type_code: enums.ENTRY_TYPE_CODE.EMAIL,
			use_state_code: enums.USE_STATE_CODE.NORMAL,
			reg_date: moment().format("YYYY-MM-DD HH:mm:ss"),
		});
		res.status(200).json({
			message: "회원가입에 성공하였습니다.",
		});
	} catch (error) {
		next(error);
	}
});

// 회원탈퇴 API
// http://localhost:3005/api/users/withdrawal
// Status: 200 OK / 400 Bad Request / 500 Internal Server Error
router.delete("/withdrawal", isLoggedIn, async (req, res, next) => {
	const { password } = req.body;
	try {
		const user = await db.Users.findOne({
			where: {
				user_id: req.user.user_id,
			},
		});
		if (!user) {
			return res.status(400).json({
				message: "존재하지 않는 사용자입니다.",
			});
		}
		// const isMatch = await bcrypt.compare(password, user.password);
		// if (!isMatch) {
		// 	return res.status(400).json({
		// 		message: "비밀번호가 일치하지 않습니다.",
		// 	});
		// }
		await db.Users.update(
			{
				use_state_code: enums.USE_STATE_CODE.WITHDRAWAL,
			},
			{
				where: {
					user_id: req.user.user_id,
				},
			}
		);
		res.status(200).json({
			message: "회원탈퇴에 성공하였습니다.",
		});
	} catch (error) {
		next(error);
	}
});

// 회원정보 수정 API
// http://localhost:3005/api/users/modify
// Status: 200 OK / 400 Bad Request / 500 Internal Server Error
// update whatever is changed:
// nickname, agree_marketing, agree_promotion, phone, address, profile_img, birth_date
router.patch("/modify", isLoggedIn, async (req, res, next) => {
	var { nickname, agree_marketing, agree_promotion, phone, address, profile_img, birth_date, intro_msg } = req.body;
	var user_id = req.user.user_id;
	if (phone) {
		phone = AES.encrypt(phone, process.env.MYSQL_AES_KEY);
	}
	if (address) {
		address = AES.encrypt(address, process.env.MYSQL_AES_KEY);
	}
	try {
		const user = await db.Users.findOne({
			where: {
				user_id: user_id,
			},
		});
		if (!user) {
			return res.status(400).json({
				message: "존재하지 않는 사용자입니다.",
			});
		}
		await db.Users.update(
			{
				nickname: nickname,
				agree_marketing: agree_marketing,
				agree_promotion: agree_promotion,
				phone: phone,
				address: address,
				profile_img: profile_img,
				intro_msg: intro_msg,
				birth_date: birth_date,
				edit_date: moment().format("YYYY-MM-DD HH:mm:ss"),
			},
			{
				where: {
					user_id: user_id,
				},
			}
		);
		res.status(200).json({
			message: "회원정보 수정에 성공하였습니다.",
		});
	} catch (error) {
		next(error);
	}
});

// 비밀번호 수정 API
// http://localhost:3005/api/users/password
// Status: 200 OK / 400 Bad Request / 500 Internal Server Error
router.post("/password", isLoggedIn, async (req, res, next) => {
	const { password, newPassword } = req.body;
	try {
		const user = await db.Users.findOne({
			where: {
				user_id: req.user.user_id,
			},
		});
		if (!user) {
			return res.status(400).json({
				message: "존재하지 않는 사용자입니다.",
			});
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({
				message: "비밀번호가 일치하지 않습니다.",
			});
		} else if (password === newPassword) {
			return res.status(400).json({
				message: "기존 비밀번호와 동일합니다.",
			});
		}
		const hash = await bcrypt.hash(newPassword, 12);
		await db.Users.update(
			{
				password: hash,
				edit_date: moment().format("YYYY-MM-DD HH:mm:ss"),
			},
			{
				where: {
					user_id: req.user.user_id,
				},
			}
		);
		res.status(200).json({
			message: "비밀번호 수정에 성공하였습니다.",
		});
	} catch (error) {
		next(error);
	}
});

// 로그아웃 API
// http://localhost:3005/api/users/logout
// Status: 200 OK / 500 Internal Server Error
router.get("/logout", isLoggedIn, (req, res) => {
	req.logout(function (err) {
		if (err) {
			return res.status(500).json({
				message: "로그아웃 과정에서 문제가 발생하였습니다.",
			});
		}
		console.log("로그아웃 성공");
		res.status(200).json({
			message: "로그아웃에 성공하였습니다.",
		});
	});
});

// 이메일 중복확인 API
// http://localhost:3005/api/users/email
// Status: 200 OK / 400 Bad Request / 500 Internal Server Error
router.get("/email", async (req, res, next) => {
	const { email } = req.query;
	try {
		const user = await db.Users.findOne({
			where: {
				email: email,
				use_state_code: {
					[Op.ne]: enums.USE_STATE_CODE.WITHDRAWAL,
				},
			},
		});
		if (user) {
			return res.status(400).json({
				message: "이미 존재하는 이메일입니다.",
			});
		}
		res.status(200).json({
			message: "사용 가능한 이메일입니다.",
		});
	} catch (error) {
		next(error);
	}
});

// 닉네임 중복확인 API
// http://localhost:3005/api/users/nickname
// Status: 200 OK / 400 Bad Request / 500 Internal Server Error
router.post("/nickname", async (req, res, next) => {
	const { nickname } = req.body;
	try {
		const user = await db.Users.findOne({
			where: {
				nickname: nickname,
				use_state_code: {
					[Op.ne]: enums.USE_STATE_CODE.WITHDRAWAL,
				},
			},
		});
		if (user) {
			return res.status(409).json({
				message: "이미 존재하는 닉네임입니다.",
			});
		}
		res.status(200).json({
			message: "사용 가능한 닉네임입니다.",
		});
	} catch (error) {
		next(error);
	}
});

// 사용자 정보 조회 API
// http://localhost:3005/api/users/profile
// Status: 200 OK / 500 Internal Server Error
router.get("/profile", isLoggedIn, async (req, res, next) => {
	const user_id = req.user.user_id;
	try {
		const user = await db.Users.findOne({
			where: {
				user_id: user_id,
			},
			attributes: {
				exclude: ["password"],
			},
		});
		if (!user) {
			return res.status(400).json({
				message: "존재하지 않는 사용자입니다.",
			});
		}
		if (user.phone) {
			user.phone = AES.decrypt(user.phone, process.env.MYSQL_AES_KEY);
		}
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
});

// 사용자 작성 게시글 조회 API
// http://localhost:3005/api/users/blogs
// Status: 200 OK / 500 Internal Server Error
router.get("/blogs", isLoggedIn, async (req, res, next) => {
	const user_id = req.user.user_id;
	try {
		const blogs = await db.Blogs.findAll({
			where: {
				user_id: user_id,
			},
			order: [["reg_date", "DESC"]],
		});
		res.status(200).json(blogs);
	} catch (error) {
		next(error);
	}
});

// 사용자가 좋아요를 누른 게시글 조회 API
// http://localhost:3005/api/users/likes
// Status: 200 OK / 500 Internal Server Error
router.get("/likes", isLoggedIn, async (req, res, next) => {
	const user_id = req.user.user_id;
	try {
		const likes = await db.BlogLikes.findAll({
			where: {
				user_id: user_id,
			},
			include: [
				{
					model: db.Blogs,
				},
			],
			order: [["created_at", "DESC"]],
		});
		res.status(200).json(likes);
	} catch (error) {
		next(error);
	}
});

router.use(errorMiddleware);
module.exports = router;
