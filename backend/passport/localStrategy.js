var bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
var db = require('../models/index')
const enums = require('../common/enums.js')
const { Op } = require('sequelize')

// passport-local
// if success, return userSessionData / if fail, return message
// userSessionData: { user_id, email, name, nickname, profile_img, phone, birth_date }
module.exports = (passport) => {
    passport.use(
        'local',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            async (email, password, done) => {
                try {
                    const user = await db.Users.findOne({
                        where: {
                            email: email,
                            use_state_code: {
                                [Op.ne]: enums.USE_STATE_CODE.WITHDRAWAL,
                            },
                        },
                    })
                    if (!user) {
                        return done(null, false, {
                            message: '존재하지 않는 사용자입니다.',
                        })
                    }
                    const isMatch = await bcrypt.compare(password, user.password)
                    if (!isMatch) {
                        return done(null, false, {
                            message: '비밀번호가 일치하지 않습니다.',
                        })
                    }
                    var userSessionData = {
                        user_id: user.user_id,
                        email: user.email,
                        name: user.name,
                        nickname: user.nickname,
                        profile_img: user.profile_img,
                        phone: user.phone,
                        birth_date: user.birth_date,
                    }
                    return done(null, userSessionData)
                } catch (error) {
                    console.error(error)
                    return done(error)
                }
            },
        ),
    )
}
