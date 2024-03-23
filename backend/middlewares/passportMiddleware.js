// passport middleware to check if user is authenticated
// if not, direct to login page
exports.isLoggedIn = (req, res, next) => {
  const isAuth = req.isAuthenticated();

  if (isAuth) {
    next();
  } else {
    res.redirect("http://localhost:5173/login");
  }
};

// passport middleware to check if user is not authenticated
// if not, direct to main page
exports.isNotLoggedIn = (req, res, next) => {
  const isAuth = req.isAuthenticated();

  if (!isAuth) {
    next();
  } else {
    res.redirect("/");
  }
};
