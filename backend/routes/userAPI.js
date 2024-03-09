var express = require("express");
var router = express.Router();
var db = require("../models/index.js");
var bcrypt = require("bcryptjs");
var AES = require("mysql-aes");
var jwt = require("jsonwebtoken");
var enums = require("../common/enums.js");
var moment = require("moment");
const { isLoggedIn, isNotLoggedIn } = require("./passportMiddleware.js");

// 로그인 API
// http://localhost:3005/api/users/login
// Status: 200 OK / 404 Not Found / 400 Bad Request / 500 Internal Server Error
// return token if success / return message if fail
// token: JWT token { id, email } / 1h
router.post("/login", async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await db.Users.findOne({
			where: {
				email: email,
			},
		});
		if (!user) {
			return res.status(404).json({
				message: "존재하지 않는 사용자입니다.",
			});
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({
				message: "비밀번호가 일치하지 않습니다.",
			});
		}
		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			}
		);
		res.status(200).json({
			token: token,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "서버 에러",
		});
	}
});

// 회원가입 API
// http://localhost:3005/api/users/register
// Status: 201 Created / 400 Bad Request / 500 Internal Server Error
// return message if success / return message if fail
router.post("/register", async (req, res, next) => {
	const { email, password, nickname, agree_marketing, agree_promotion } = req.body;
	try {
		const user = await db.Users.findOne({
			where: {
				email: email,
			},
		});
		if (user) {
			return res.status(400).json({
				message: "이미 존재하는 사용자입니다.",
			});
		}
		const hash = await bcrypt.hash(password, 12);
		await db.Users.create({
			email: email,
			password: hash,
			nickname: nickname,
			agree_marketing: agree_marketing,
			agree_promotion: agree_promotion,
			entry_type_code: enums.ENTRY_TYPE_CODE.EMAIL,
			use_state_code: enums.USE_STATE_CODE.NORMAL,
			reg_date: moment().format("YYYY-MM-DD HH:mm:ss"),
		});
		res.status(201).json({
			message: "회원가입에 성공하였습니다.",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "서버 에러",
		});
	}
});

// 회원탈퇴 API
// http://localhost:3005/api/users/withdrawal
// Status: 200 OK / 400 Bad Request / 500 Internal Server Error
router.delete("/withdrawal", async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await db.Users.findOne({
			where: {
				email: email,
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
		}
		await db.Users.update(
			{
				use_state_code: enums.USE_STATE_CODE.WITHDRAWAL,
			},
			{
				where: {
					email: email,
				},
			}
		);
		res.status(200).json({
			message: "회원탈퇴에 성공하였습니다.",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "서버 에러",
		});
	}
});

// 회원정보 수정 API
// http://localhost:3005/api/users/modify
// Status: 200 OK / 400 Bad Request / 500 Internal Server Error
// update whatever is changed:
// nickname, agree_marketing, agree_promotion, phone, address, profile_img, birth_date
router.post("/modify", isLoggedIn, async (req, res, next) => {
	var {
		email,
		nickname,
		agree_marketing,
		agree_promotion,
		phone,
		address,
		profile_img,
		birth_date,
	} = req.body;
	if (!email) {
		return res.status(400).json({
			message: "이메일을 입력해주세요.",
		});
	}
	if (phone) {
		phone = AES.encrypt(phone, process.env.MYSQL_AES_KEY);
	}
	if (address) {
		address = AES.encrypt(address, process.env.MYSQL_AES_KEY);
	}
	try {
		await db.Users.update(
			{
				nickname: nickname,
				agree_marketing: agree_marketing,
				agree_promotion: agree_promotion,
				phone: phone,
				address: address,
				profile_img: profile_img,
				birth_date: birth_date,
				edit_date: moment().format("YYYY-MM-DD HH:mm:ss"),
			},
			{
				where: {
					email: email,
				},
			}
		);
		res.status(200).json({
			message: "회원정보 수정에 성공하였습니다.",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "서버 에러",
		});
	}
});

// 비밀번호 수정 API
// http://localhost:3005/api/users/password
// Status: 200 OK / 400 Bad Request / 500 Internal Server Error
router.post("/password", isLoggedIn, async (req, res, next) => {
	const { email, password, newPassword } = req.body;
	try {
		const user = await db.Users.findOne({
			where: {
				email: email,
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
					email: email,
				},
			}
		);
		res.status(200).json({
			message: "비밀번호 수정에 성공하였습니다.",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "서버 에러",
		});
	}
});

module.exports = router;
