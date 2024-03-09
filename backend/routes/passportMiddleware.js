// passport middleware to check if user is authenticated
// if not, direct to login page
exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/login");
	}
};

// passport middleware to check if user is not authenticated
// if not, direct to main page
exports.isNotLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/");
	}
};
