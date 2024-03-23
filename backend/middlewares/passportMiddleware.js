// passport middleware to check if user is authenticated
// if not, direct to login page
exports.isLoggedIn = (req, res, next) => {
  const isAuth = req.isAuthenticated();

  if (isAuth) {
    next();
  } else {
    res.status(401).json({
      message: "로그인이 필요합니다.",
    });
  }
};

// passport middleware to check if user is not authenticated
// if not, direct to main page
exports.isNotLoggedIn = (req, res, next) => {
  const isAuth = req.isAuthenticated();

  if (!isAuth) {
    next();
  } else {
    res.status(401).json({
      message: "이미 로그인이 되어있습니다.",
    });
  }
};
