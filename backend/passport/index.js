const local = require("./localStrategy");
const db = require("../models/index");

// serializeUser: pass user_id
// deserializeUser: find user by user_id and pass user data
// user data includes [user_id, email, name, nickname, profile_img, phone, birth_date]
module.exports = (passport) => {
	passport.serializeUser((userSessionData, done) => {
		done(null, userSessionData.user_id);
	});

	passport.deserializeUser(async (userId, done) => {
		try {
			const user = await db.Users.findOne({
				where: { user_id: userId },
				attributes: [
					"user_id",
					"email",
					"name",
					"nickname",
					"profile_img",
					"phone",
					"birth_date",
				],
			});
			done(null, user);
		} catch (error) {
			console.error(error);
			done(error, null);
		}
	});

	local(passport);
};
