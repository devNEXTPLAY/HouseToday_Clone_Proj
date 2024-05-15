var express = require('express')
var router = express.Router()
var db = require('../models/index.js')
var bcrypt = require('bcryptjs')
var AES = require('mysql-aes')
var jwt = require('jsonwebtoken')
var enums = require('../common/enums.js')
var moment = require('moment')
const { Op } = require('sequelize')
const passport = require('passport')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/passportMiddleware.js')
const errorMiddleware = require('../middlewares/errorMiddleware.js')

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: 로그인
 */
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err)
        if (!user) {
            if (info.message === '존재하지 않는 사용자입니다.') {
                return res.status(404).json({
                    message: '존재하지 않는 사용자입니다.',
                })
            } else if (info.message === '비밀번호가 일치하지 않습니다.') {
                return res.status(400).json({
                    message: '비밀번호가 일치하지 않습니다.',
                })
            } else {
                return res.status(400).json({
                    message: '로그인에 실패하였습니다.',
                })
            }
        }
        req.logIn(user, (err) => {
            if (err) return next(err)
            const token = jwt.sign(
                {
                    id: user.user_id,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h',
                },
            )
            return res.status(200).json({
                token: token,
                userId: user.user_id,
                message: '로그인에 성공하였습니다.',
            })
        })
    })(req, res, next)
})

/**
 * @swagger
 * /api/users/kakao:
 *   get:
 *     summary: 카카오 로그인
 */
router.get(
    '/kakao',
    passport.authenticate('kakao', {
        failureRedirect: '/login',
    }),
    (req, res) => {
        req.logIn(req.user, (err) => {
            if (err) return next(err)
            const token = jwt.sign(
                {
                    id: req.user.user_id,
                    email: req.user.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h',
                },
            )
            res.redirect(`http://localhost:5173/?token=${token}`)
        })
    },
)

/**
 * @swagger
 * /api/users/oauth/kakao:
 *   get:
 *     summary: 카카오 로그인 콜백
 */
router.get(
    '/oauth/kakao',
    passport.authenticate('kakao', {
        failureRedirect: '/login',
    }),
    (req, res) => {
        req.logIn(req.user, (err) => {
            if (err) return next(err)
            const token = jwt.sign(
                {
                    id: req.user.user_id,
                    email: req.user.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h',
                },
            )
            res.redirect(`http://localhost:5173/?token=${token}`)
        })
    },
)

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: 회원가입
 */
router.post('/register', isNotLoggedIn, async (req, res, next) => {
    const { email, password, nickname, agree_marketing, agree_promotion, is_email_verified } = req.body
    try {
        const user = await db.Users.findOne({
            where: {
                [Op.or]: [{ email: email }, { nickname: nickname }],
                use_state_code: {
                    [Op.ne]: enums.USE_STATE_CODE.WITHDRAWAL,
                },
            },
        })
        if (user) {
            return res.status(400).json({
                message: '이미 존재하는 사용자입니다.',
            })
        }
        const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        console.log(`회원가입 시도: ${email}, IP: ${ip_address}`)
        const hash = await bcrypt.hash(password, 12)
        await db.Users.create({
            email: email,
            password: hash,
            nickname: nickname,
            agree_marketing: agree_marketing,
            agree_promotion: agree_promotion,
            is_email_verified: is_email_verified,
            profile_img: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            entry_type_code: enums.ENTRY_TYPE_CODE.EMAIL,
            use_state_code: enums.USE_STATE_CODE.NORMAL,
            reg_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        })
        res.status(200).json({
            message: '회원가입에 성공하였습니다.',
        })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/users/withdrawal:
 *   delete:
 *     summary: 회원탈퇴
 */
router.delete('/withdrawal', isLoggedIn, async (req, res, next) => {
    const { password } = req.body
    try {
        const user = await db.Users.findOne({
            where: {
                user_id: req.user.user_id,
            },
        })
        if (!user) {
            return res.status(400).json({
                message: '존재하지 않는 사용자입니다.',
            })
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
            },
        )
        res.status(200).json({
            message: '회원탈퇴에 성공하였습니다.',
        })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/users/modify:
 *   patch:
 *     summary: 회원정보 수정
 */
router.patch('/modify', isLoggedIn, async (req, res, next) => {
    var { nickname, agree_marketing, agree_promotion, phone, address, profile_img, birth_date, intro_msg } = req.body
    var user_id = req.user.user_id
    if (phone) {
        phone = AES.encrypt(phone, process.env.MYSQL_AES_KEY)
    }
    if (address) {
        address = AES.encrypt(address, process.env.MYSQL_AES_KEY)
    }
    try {
        const user = await db.Users.findOne({
            where: {
                user_id: user_id,
            },
        })
        if (!user) {
            return res.status(400).json({
                message: '존재하지 않는 사용자입니다.',
            })
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
                edit_date: moment().format('YYYY-MM-DD HH:mm:ss'),
            },
            {
                where: {
                    user_id: user_id,
                },
            },
        )
        res.status(200).json({
            message: '회원정보 수정에 성공하였습니다.',
        })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/users/password:
 *   post:
 *     summary: 비밀번호 수정
 */
router.post('/password', isLoggedIn, async (req, res, next) => {
    const { password, newPassword } = req.body
    try {
        const user = await db.Users.findOne({
            where: {
                user_id: req.user.user_id,
            },
        })
        if (!user) {
            return res.status(400).json({
                message: '존재하지 않는 사용자입니다.',
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: '비밀번호가 일치하지 않습니다.',
            })
        } else if (password === newPassword) {
            return res.status(400).json({
                message: '기존 비밀번호와 동일합니다.',
            })
        }
        const hash = await bcrypt.hash(newPassword, 12)
        await db.Users.update(
            {
                password: hash,
                edit_date: moment().format('YYYY-MM-DD HH:mm:ss'),
            },
            {
                where: {
                    user_id: req.user.user_id,
                },
            },
        )
        res.status(200).json({
            message: '비밀번호 수정에 성공하였습니다.',
        })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/users/logout:
 *   get:
 *     summary: 로그아웃
 */
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout(function (err) {
        if (err) {
            return res.status(500).json({
                message: '로그아웃 과정에서 문제가 발생하였습니다.',
            })
        }
        console.log('로그아웃 성공')
        res.status(200).json({
            message: '로그아웃에 성공하였습니다.',
        })
    })
})

/**
 * @swagger
 * /api/users/email:
 *   get:
 *     summary: 이메일 중복확인
 */
router.get('/email', async (req, res, next) => {
    const { email } = req.query
    try {
        const user = await db.Users.findOne({
            where: {
                email: email,
                use_state_code: {
                    [Op.ne]: enums.USE_STATE_CODE.WITHDRAWAL,
                },
            },
        })
        if (user) {
            return res.status(400).json({
                message: '이미 존재하는 이메일입니다.',
            })
        }
        res.status(200).json({
            message: '사용 가능한 이메일입니다.',
        })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/users/nickname:
 *   post:
 *     summary: 닉네임 중복확인
 */
router.post('/nickname', async (req, res, next) => {
    const { nickname } = req.body
    try {
        const user = await db.Users.findOne({
            where: {
                nickname: nickname,
                use_state_code: {
                    [Op.ne]: enums.USE_STATE_CODE.WITHDRAWAL,
                },
            },
        })
        if (user) {
            return res.status(409).json({
                message: '이미 존재하는 닉네임입니다.',
            })
        }
        res.status(200).json({
            message: '사용 가능한 닉네임입니다.',
        })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: 사용자 정보 조회
 */
router.get('/profile', isLoggedIn, async (req, res, next) => {
    const user_id = req.user.user_id
    try {
        const user = await db.Users.findOne({
            where: {
                user_id: user_id,
            },
            attributes: {
                exclude: ['password'],
            },
        })
        if (!user) {
            return res.status(400).json({
                message: '존재하지 않는 사용자입니다.',
            })
        }
        if (user.phone) {
            user.phone = AES.decrypt(user.phone, process.env.MYSQL_AES_KEY)
        }
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/users/blogs:
 *   get:
 *     summary: 사용자 작성 게시글 조회
 */
router.get('/blogs', isLoggedIn, async (req, res, next) => {
    const user_id = req.user.user_id
    try {
        const blogs = await db.Blogs.findAll({
            where: {
                user_id: user_id,
            },
            order: [['reg_date', 'DESC']],
        })
        res.status(200).json(blogs)
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/users/likes:
 *   get:
 *     summary: 사용자가 좋아요를 누른 게시글 조회
 */
router.get('/likes', isLoggedIn, async (req, res, next) => {
    const user_id = req.user.user_id
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
            order: [['created_at', 'DESC']],
        })
        res.status(200).json(likes)
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/users/like/{blog_id}:
 *   get:
 *     summary: 게시글 좋아요 여부 조회
 *     parameters:
 *       - in: path
 *         name: blog_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 게시글 ID
 */
router.get('/like/:blog_id', isLoggedIn, async (req, res, next) => {
    const user_id = req.user.user_id
    const blog_id = req.params.blog_id
    try {
        const like = await db.BlogLikes.findOne({
            where: {
                user_id: user_id,
                blog_id: blog_id,
            },
        })
        if (like) {
            res.status(200).json(true)
        } else {
            res.status(200).json(false)
        }
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/users/follow:
 *   post:
 *     summary: 팔로우 처리
 */
router.post('/follow', isLoggedIn, async (req, res, next) => {
    const { followee_id } = req.body
    const follower_id = req.user.user_id
    try {
        const follow = await db.Follows.findOne({
            where: {
                follower_id,
                followee_id,
            },
        })
        if (follow) {
            await follow.destroy()
            res.status(200).json({
                message: '팔로우를 취소하였습니다.',
            })
        } else {
            await db.Follows.create({
                follower_id,
                followee_id,
                created_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            })
            res.status(200).json({
                message: '팔로우를 추가하였습니다.',
            })
        }
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/users/followings:
 *   get:
 *     summary: 팔로잉 목록 조회
 */
// http://localhost:3005/api/users/followings
router.get('/followings', isLoggedIn, async (req, res, next) => {
    const follower_id = req.user.user_id
    try {
        const followings = await db.Follows.findAll({
            where: {
                follower_id,
            },
            include: [
                {
                    model: db.Users,
                    as: 'Followee',
                },
            ],
            order: [['created_at', 'DESC']],
        })
        res.status(200).json(followings)
    } catch (error) {
        next(error)
    }
})

router.use(errorMiddleware)
module.exports = router
