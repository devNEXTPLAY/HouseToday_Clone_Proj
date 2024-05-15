const local = require('./localStrategy')
const kakao = require('./kakaoStrategy')
const admin = require('./adminStrategy')
const db = require('../models/index')

// serializeUser: pass user_id
// deserializeUser: find user by user_id and pass user data
// user data includes [user_id, email, name, nickname, profile_img, phone, birth_date]
module.exports = (passport) => {
    passport.serializeUser((userSessionData, done) => {
        console.log('serializeUser:', userSessionData)
        const id = userSessionData.admin_id
            ? { type: 'admin', id: userSessionData.admin_id }
            : { type: 'user', id: userSessionData.user_id }
        console.log('serializeUser:', id)
        done(null, id)
    })

    passport.deserializeUser(async (userId, done) => {
        try {
            if (userId.type === 'admin') {
                const admin = await db.Admins.findOne({
                    where: { admin_id: userId.id },
                    attributes: ['admin_id', 'id', 'name', 'email'],
                })
                done(null, admin)
                return
            }
            const user = await db.Users.findOne({
                where: { user_id: userId.id },
                attributes: ['user_id', 'email', 'name', 'nickname', 'profile_img', 'phone', 'birth_date'],
            })
            done(null, user)
        } catch (error) {
            console.error(error)
            done(error, null)
        }
    })

    local(passport)
    kakao(passport)
}
