var express = require('express')
var router = express.Router()
var bycrpt = require('bcryptjs')
var AES = require('mysql-aes')
const passport = require('passport')
var db = require('../models/index.js')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/adminPassportMiddleware')

router.get('/', isLoggedIn, async (req, res) => {
    var LoginUser = req.session.passport.userSessionData
    res.render('index', { LoginUser })
})

router.get('/login', isNotLoggedIn, async (req, res) => {
    res.render('login', { resultMsg: '', id: '', pw: '', layout: 'loginLayout' })
})

router.post('/login', isNotLoggedIn, async (req, res, next) => {
    passport.authenticate('admin_local', (authError, admin, info) => {
        if (authError) {
            console.error(authError)
            return next(authError)
        }
        if (!admin) {
            // print error message
            console.log('admin:', info.message)
            return res.redirect('/login')
        }
        return req.login(admin, (loginError) => {
            if (loginError) {
                console.error(loginError)
                return next(loginError)
            }
            return res.redirect('/')
        })
    })(req, res, next)
})

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        req.session.destroy()
        res.redirect('/login')
    })
})

router.get('/forgot_password', async (req, res) => {
    res.render('login/forgot_password', { resultMsg: '', email: '', layout: 'loginLayout' })
})

router.post('/forgot_password', async (req, res) => {
    try {
        var Email = req.body.email

        var email = await db.Admins.findOne({ where: { email: Email } })

        var resultMsg = ''

        if (email == null) {
            resultMsg = '등록되지 않은 이메일 입니다.'
        } else {
            if (email.email == Email) {
                console.log(`메일찾기 완료 :${Email} 입니다.`)
                resultMsg = '메일찾기 완료'
            }
        }

        if (resultMsg !== '') {
            res.render('login/forgot_password', { resultMsg, email, layout: 'loginLayout' })
        }
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
})

router.get('/register', async (req, res) => {
    res.render('login/register', { resultMsg: '', layout: 'loginLayout' })
})

router.post('/register', async (req, res) => {
    try {
        var { id, email, password, name, telephone } = req.body

        password = await bycrpt.hash(password, 12)
        telephone = AES.encrypt(telephone, process.env.MYSQL_AES_KEY)

        var admin = {
            id: id,
            password: password,
            name: name,
            email: email,
            telephone: telephone,
            reg_date: Date.now(),
        }

        var register = await db.Admins.create(admin)

        var resultMsg = ''

        if (register == !null) {
            resultMsg = '회원가입 실패'
        } else {
            resultMsg = '회원가입 완료. 로그인 후 이용바랍니다'
        }

        res.render('login', { register, admin, resultMsg, layout: 'loginLayout' })
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router
