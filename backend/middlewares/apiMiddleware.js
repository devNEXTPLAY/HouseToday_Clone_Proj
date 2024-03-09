const jwt = require("jsonwebtoken");

// middleware for token authentication
// if token is valid, next() / if not, return 401
// token is sent in the header as "Bearer {token}"
exports.tokenAuthCheck = async (req, res, next) => {
	var token = req.headers.authorization.split("Bearer ")[1];
	if (!token) {
		return res.status(401).json({
			message: "토큰이 없습니다.",
		});
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		console.error(error);
		return res.status(401).json({
			message: "토큰이 만료되었습니다.",
		});
	}
};
