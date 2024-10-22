var express = require('express')
var router = express.Router()
var db = require('../models/index.js')
var enums = require('../common/enums.js')
var moment = require('moment')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/passportMiddleware.js')
const errorMiddleware = require('../middlewares/errorMiddleware.js')

/**
 * @swagger
 * /api/comment/create:
 *   post:
 *     summary: 댓글 추가
 */
router.post('/create', isLoggedIn, async (req, res, next) => {
    const { blog_id, parent_id, content } = req.body
    const user_id = req.user.user_id
    const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    try {
        const blog = await db.Blogs.findOne({
            attributes: ['blog_id'],
            where: { blog_id },
        })
        if (!blog) {
            return res.status(400).json({
                message: '존재하지 않는 블로그 글입니다.',
            })
        }

        await db.Comments.create({
            blog_id,
            user_id,
            content,
            parent_id,
            ip_address,
            reg_date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        })
        res.status(201).json({
            message: '댓글이 추가되었습니다.',
        })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/comment/create:
 *   post:
 *     summary: 댓글 추가
 */
router.patch('/update', isLoggedIn, async (req, res, next) => {
    const { comment_id, contents } = req.body
    const user_id = req.user.user_id
    const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    try {
        const comment = await db.Comments.findOne({
            attributes: ['comment_id'],
            where: { comment_id, user_id },
        })
        if (!comment) {
            return res.status(400).json({
                message: '존재하지 않는 댓글이거나 권한이 없습니다.',
            })
        }

        comment.content = contents
        comment.edit_date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        comment.ip_address = ip_address
        await comment.save()
        res.status(200).json({
            message: '댓글이 수정되었습니다.',
        })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/comment/delete:
 *   delete:
 *     summary: 댓글 삭제
 */
router.delete('/delete', isLoggedIn, async (req, res, next) => {
    const comment_id = req.body.comment_id
    const user_id = req.user.user_id

    try {
        const comment = await db.Comments.findOne({
            attributes: ['comment_id'],
            where: { comment_id, user_id },
        })
        if (!comment) {
            return res.status(400).json({
                message: '존재하지 않는 댓글이거나 권한이 없습니다.',
            })
        }

        comment.comment_status_code = enums.COMMENT_STATUS_CODE.DELETED
        comment.edit_date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        await comment.save()
        res.status(200).json({
            message: '댓글이 삭제되었습니다.',
        })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/comment/like:
 *   post:
 *     summary: 댓글 좋아요 처리
 */
router.post('/like', isLoggedIn, async (req, res, next) => {
    const { comment_id } = req.body
    const user_id = req.user.user_id

    try {
        const comment = await db.Comments.findOne({
            where: { comment_id },
        })
        if (!comment) {
            return res.status(400).json({
                message: '존재하지 않는 댓글입니다.',
            })
        }
        const like = await db.CommentLikes.findOne({
            where: {
                comment_id,
                user_id,
            },
        })
        if (like) {
            await like.destroy()
            comment.like_count -= 1
            await comment.save()
            res.status(200).json({
                message: '좋아요를 취소했습니다.',
            })
        } else {
            await db.CommentLikes.create({
                user_id,
                comment_id,
                created_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            })
            comment.like_count += 1
            await comment.save()
            res.status(200).json({
                message: '좋아요를 추가했습니다.',
            })
        }
    } catch (error) {
        next(error)
    }
})

router.use(errorMiddleware)
module.exports = router
