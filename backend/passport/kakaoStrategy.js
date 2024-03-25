var KakaoStrategy = require("passport-kakao").Strategy;
const passport = require("passport");
const db = require("../models/index.js");
const enums = require("../common/enums.js");
const moment = require("moment");

module.exports = (passport) => {
	passport.use(
		new KakaoStrategy(
			{
				clientID: process.env.KAKAO_REST_API_KEY,
                clientSecret: process.env.KAKAO_CLIENT_SECRET,
				callbackURL: process.env.KAKAO_CALLBACK_URL, 
			},
			async (accessToken, refreshToken, profile, done) => {
				console.log(profile);

				try {
					let user = await db.Users.findOne({
						where: { email: profile.id },
					});

					if (!user) {
						user = await db.Users.create({
							email: profile.id,
							is_email_verified: 1,
							password: "kakao",
							nickname: profile.displayName,
							profile_img: profile._json.properties.profile_image,
							agree_marketing: 0,
							agree_promotion: 0,
							entry_type_code: enums.ENTRY_TYPE_CODE.KAKAO,
							reg_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
						});
					}

					return done(null, user);
				} catch (error) {
					console.error(error);
					return done(error);
				}
			}
		)
	);
};
