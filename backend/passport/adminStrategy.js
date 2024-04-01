var bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
var db = require('../models/index')

module.exports = (passport) => {
    passport.use(
        'admin_local',
        new LocalStrategy(
            {
                usernameField: 'id',
                passwordField: 'password',
            },
            async (id, password, done) => {
                try {
                    const admin = await db.Admins.findOne({
                        where: { id: id },
                    })
                    if (!admin) {
                        return done(null, false, {
                            message: '존재하지 않는 관리자입니다.',
                        })
                    } else {
                        const isMatch = await bcrypt.compare(password, admin.password)
                        if (!isMatch) {
                            return done(null, false, {
                                message: '비밀번호가 일치하지 않습니다.',
                            })
                        }
                        const userSessionData = {
                            admin_id: admin.admin_id,
                            id: admin.id,
                            name: admin.name,
                            email: admin.email,
                        }
                        return done(null, userSessionData)
                    }
                } catch (error) {
                    console.error(error)
                    return done(error)
                }
            },
        ),
    )
}
